import View from '../view';

class Viewer extends View {
  constructor () {
    super();

    this.$view = this.createElement('section', 'class', 'viewer');
    this.$slideContainer = this.createElement('div', 'class', 'slide-container');
    this.$view.append(this.$slideContainer);
  }

  render (childElement, parentElement, n) {
    parentElement.insertBefore(childElement, parentElement.childNodes[n]);
  }
}

export default Viewer;
