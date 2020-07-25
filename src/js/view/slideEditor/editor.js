import View from '../view';

class Editor extends View {
  constructor () {
    super();

    this.$view = this.createElement('section', 'class', 'editor');
    this.$textarea = this.createElement('textarea', 'class', 'markup');
    this.$view.append(this.$textarea);
  }
}

export default Editor;
