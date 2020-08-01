import View from './view';
import {createCustomElement} from '../Utils/DOMConstructor';
import Viewer from './editor/viewer';
import Editor from './editor/editor';
import Toolbar from './editor/toolbar';

class EditorView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    this.viewer = new Viewer();
    this.toolbar = new Toolbar();
    this.editor = new Editor();

    this.$editorWrapper = createCustomElement('div', {class: 'slide-editor'});
    this.$editorWrapper.append(this.toolbar.$view, this.editor.$view);

    this.$slideEditor = createCustomElement('div', {class: 'viewer-and-editor'});
    this.$slideEditor.append(this.viewer.$view, this.$editorWrapper);
  }

  bind () {
    this.initListeners();
    this.render(this.$slideEditor);
  }

  initListeners () {
    this.toolbar.$view.addEventListener('click', ({target}) => this.bindCRUDButtonEvent(target));
    this.toolbar.$view.addEventListener('keyup', ({target}) => this.bindToolbarKeyboardEvent(target));
    this.viewer.$viewModeChangeBtn.addEventListener('click', ({target}) => this.toggleViewerMode(target));
    this.editor.$view.addEventListener('keyup', ({target}) => this.passOnUserInput(target));
  }

  bindCRUDButtonEvent ({id}) {
    if (!id) return;
    if (id === 'delete') return this.controller.deleteSlide();
    if (id === 'create') return this.controller.createSlide();
    if (id === 'before') return this.controller.focusOnBeforeSlide();
    if (id === 'next') return this.controller.focusOnNextSlide();
  }

  bindToolbarKeyboardEvent ({id, value}) {
    if (!id) return;
    if (!id === 'slide-number') this.controller.focusOnNthSlide(value - 1);
  }

  toggleViewerMode ({id, classList}) {
    if (!id || classList.length) return;

    this.viewer.toggleViewerButton();
    this.$slideEditor.classList.toggle('grid-mode');
  }

  passOnUserInput ({id, value}) {
    if (!id) return;
    if (id === 'raw-data') return this.controller.updateSlide(value);
    if (id === 'pt-note') return this.controller.updateNote(value);
  }
}

export default EditorView;
