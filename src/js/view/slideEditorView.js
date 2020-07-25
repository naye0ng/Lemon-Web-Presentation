import View from './view';
import Viewer from './slideEditor/viewer';
import Editor from './slideEditor/editor';
import Toolbar from './slideEditor/toolbar';

class SlideEditorView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    // TODO : 바로 view를 사용할 수 있도록 할 것!
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
      if (event.target.id === 'delete') return this.controller.deleteSlide();
      if (event.target.id === 'create') return this.controller.createSlide();
      if (event.target.id === 'before') return this.controller.focusOnBeforeSlide();
      if (event.target.id === 'next') return this.controller.focusOnNextSlide();
    });
  }
}

export default SlideEditorView;
