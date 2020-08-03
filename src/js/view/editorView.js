import View from './view';
import {createCustomElement} from '../Utils/DOMConstructor';
import Titlebar from './editor/titlebar';
import Viewer from './editor/viewer';
import Editor from './editor/editor';
import Toolbar from './editor/toolbar';

class EditorView extends View {
  constructor (controller) {
    super();
    this.controller = controller;
    this.titlebar = new Titlebar();
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
    this.render(this.titlebar.$view);
    this.render(this.$slideEditor);
  }

  initListeners () {
    this.titlebar.$view.addEventListener('click', ({target}) => this.bindPresentationEvent(target));
    this.titlebar.$view.addEventListener('keyup', ({target}) => this.bindTitleEvent(target));
    this.titlebar.$selectSavedFile.addEventListener('change', ({target}) => this.controller.selectPresentation(target));

    this.toolbar.$view.addEventListener('click', ({target}) => this.bindCRUDButtonEvent(target));
    this.toolbar.$view.addEventListener('keyup', ({target}) => this.bindToolbarKeyboardEvent(target));

    this.viewer.$viewModeChangeBtn.addEventListener('click', ({target}) => this.toggleViewerMode(target));

    this.editor.$view.addEventListener('keyup', ({target}) => this.bindEditorKeyboardEvent(target));
  }
  bindPresentationEvent ({id}) {
    if (id === 'save') return this.controller.savePresentation();
    if (id === 'new') return this.controller.createPresentation();
    if (id === 'delete') return this.controller.deletePresentation();
  }

  bindTitleEvent ({value}) {
    return this.controller.updateTitle(value);
  }

  bindCRUDButtonEvent ({id}) {
    if (id === 'slide-delete') return this.controller.deleteSlide();
    if (id === 'slide-create') return this.controller.createSlide();
    if (id === 'slide-copy') return this.controller.copySlide();
    if (id === 'before') return this.controller.focusOnBeforeSlide();
    if (id === 'next') return this.controller.focusOnNextSlide();
  }

  bindToolbarKeyboardEvent ({id, value}) {
    if (id === 'slide-number') this.controller.focusOnNthSlide(value - 1);
  }

  toggleViewerMode ({id, classList}) {
    if (!id || classList.length) return;

    this.viewer.toggleViewerButton();
    this.$slideEditor.classList.toggle('grid-mode');
  }

  bindEditorKeyboardEvent ({id, value}) {
    if (id === 'raw-data') return this.controller.updateSlide(value);
    if (id === 'pt-note') return this.controller.updateNote(value);
  }
}

export default EditorView;
