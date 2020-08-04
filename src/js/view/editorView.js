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

  init () {
    this.initListeners();
    this.render(this.titlebar.$view);
    this.render(this.$slideEditor);
  }

  initListeners () {
    this.viewer.$viewModeChangeButton.addEventListener('click', ({target}) => this.toggleViewerMode(target));
    this.titlebar.$view.addEventListener('change', ({target}) => this.controller.eventHandler(target));
    this.titlebar.$view.addEventListener('click', ({target}) => this.controller.eventHandler(target));
    this.toolbar.$view.addEventListener('keyup', ({target}) => this.controller.eventHandler(target));
    this.toolbar.$view.addEventListener('click', ({target}) => this.controller.eventHandler(target));
    this.editor.$view.addEventListener('keyup', ({target}) => this.controller.eventHandler(target));
  }

  toggleViewerMode ({id, classList}) {
    if (!id || classList.length) return;

    this.viewer.toggleViewerButton();
    this.$slideEditor.classList.toggle('grid-mode');
  }
}

export default EditorView;
