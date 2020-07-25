import View from '../view';

class Toolbar extends View {
  constructor () {
    super();

    this.$view = this.createElement('div', 'class', 'toolbar');
    this.$deleteButton = this.createElement('button', 'id', 'delete', 'D');
    this.$createButton = this.createElement('button', 'id', 'create', 'A');
    this.$saveButton = this.createElement('button', 'id', 'save', 'S');
    this.$moveBeforeButton = this.createElement('button', 'id', 'before', '<');
    this.$moveNextButton = this.createElement('button', 'id', 'next', '>');

    this.$view.append(
      this.$deleteButton,
      this.$createButton,
      this.$saveButton,
      this.$moveBeforeButton,
      this.$moveNextButton);
  }
}

export default Toolbar;
