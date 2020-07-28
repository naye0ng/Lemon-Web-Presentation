import View from './view';
import Viewer from './slideEditor/viewer';
import Editor from './slideEditor/editor';
import Toolbar from './slideEditor/toolbar';

class SlideEditorView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    this.viewer = new Viewer();
    this.toolbar = new Toolbar();
    this.editor = new Editor();

    this.$editorWrapper = this.createElement('div', {class: 'slide-editor'});
    this.$editorWrapper.append(this.toolbar.$view, this.editor.$view);

    this.$slideEditor = this.createElement('div', {class: 'viewer-and-editor'});
    this.$slideEditor.append(this.viewer.$view, this.$editorWrapper);

    this.init();
  }

  init () {
    this.initListeners();
    this.render(this.$slideEditor);
  }

  initListeners () {
    this.editor.$view.addEventListener('keyup', event => {
      this.controller.updateSlide(event.target.value);
    });
    this.toolbar.$view.addEventListener('click', event => {
      if (!event.target.id) return;
      if (event.target.id === 'delete') return this.controller.deleteSlide();
      if (event.target.id === 'create') return this.controller.createNextSlide();
      if (event.target.id === 'before') return this.controller.focusOnBeforeSlide();
      if (event.target.id === 'next') return this.controller.focusOnNextSlide();
    });
    this.toolbar.$view.addEventListener('keyup', event => {
      if (!event.target.value) return;
      this.controller.focusOnNthSlide(event.target.value - 1);
    });
  }
}

export default SlideEditorView;
