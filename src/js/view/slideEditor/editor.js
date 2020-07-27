import View from '../view';

class Editor extends View {
  constructor () {
    super();

    this.$view = this.createElement('div', {class: 'editor'});
    this.$textarea = this.createElement('textarea');
    this.$view.append(this.$textarea);
  }
}

export default Editor;
