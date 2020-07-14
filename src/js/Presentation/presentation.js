import markupParser from './Parser/markupParser';
import createElement from './Parser/createElement';

class Presentation {
  constructor () {
    this.state = {};
    this.input = document.querySelector('#markup-editor');
    this.output = document.querySelector('#slide-viewer');

    this.init();
  }

  init () {
    this.setState(this.state, 'slides', this.input);
    this.input.addEventListener('keyup', () => {
      this.render();
    });
  }

  setState (obj, key, el) {
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      get: () => this.createDOMObject(el),
    });
  }

  getState () {
    return this.state.slides;
  }

  createDOMObject (el) {
    const xml = new DOMParser().parseFromString(`<div class='slide-container'>${el.value}</div >`, 'text/html');
    return markupParser(xml.body.childNodes[0]);
  }

  mount (node) {
    this.output.replaceChild(node, this.output.childNodes[0]);
  }

  render () {
    this.mount(createElement(this.getState()));
  }
}

export default Presentation;

