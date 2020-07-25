import View from '../view';

class Toolbar extends View {
  constructor () {
    super();

    this.$view = this.createElement('div', 'class', 'toolbar');
    this.$deleteButton = this.createElement('button', 'class', 'delete', 'D');
    this.$saveButton = this.createElement('button', 'class', 'save', 'S');
    this.$moveBeforeButton = this.createElement('button', 'class', 'before', '<');
    this.$moveNextButton = this.createElement('button', 'class', 'next', '>');

    this.$view.append(this.$deleteButton, this.$saveButton, this.$moveBeforeButton, this.$moveNextButton);
  }
}

export default Toolbar;
