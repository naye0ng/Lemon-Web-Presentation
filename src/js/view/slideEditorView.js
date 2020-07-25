import View from './view';

class SlideEditorView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    this.$slideEditor = this.createElement('div', 'class', 'slide-editor');
    this.$viewer = this.createElement('section', 'class', 'viewer');
    this.$editor = this.createElement('section', 'class', 'editor');
    this.$textarea = this.createElement('textarea');
    this.$editor.append(this.$textarea);
    this.$slideEditor.append(this.$viewer, this.$editor);

    this.init();
  }

  init () {
    this.initListeners();
    this.render(this.$slideEditor);
  }

  initListeners () {
    this.$textarea.addEventListener('keyup', event => {
      this.controller.updateSlide(event.target.value);
    });
  }
}

export default SlideEditorView;
