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

    this.$slideEditor = this.createElement('div', 'class', 'slide-editor');
    this.$slideEditor.append(this.viewer.$view, this.toolbar.$view, this.editor.$view);

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
      console.log(event.target);
    });
  }
}

export default SlideEditorView;
