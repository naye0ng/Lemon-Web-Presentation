import View from './view';

class SlideEditorView extends View {
  constructor () {
    super();

    this.$slideEditor = this.createElement('div', 'class', 'slide-editor');
    this.$viewer = this.createElement('section', 'class', 'viewer');
    this.$editor = this.createElement('section', 'class', 'editor');
    this.$textarea = this.createElement('textarea');

    this.$editor.append(this.$textarea);
    this.$slideEditor.append(this.$viewer, this.$editor);
    this.$app.append(this.$slideEditor);
  }
}

export default SlideEditorView;
