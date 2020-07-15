import markupParser from './Parser/markupParser';
import convertObjToElem from './Parser/convertObjToElem';

class Presentation {
  constructor () {
    this.state = {};
    this.domElem = '';
    this.input = document.querySelector('#markup-editor');
    this.output = document.querySelector('#slide-viewer');

    this.init();
  }

  init () {
    this.setState(this.state, 'slides', this.input);
    this.input.addEventListener('keyup', () => {
      this.setDomElem();
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

  setDomElem () {
    this.domElem = convertObjToElem(this.getState());
  }
  getDomElemFunc () {
    return () => this.domElem;
  }

  createDOMObject (el) {
    const xml = new DOMParser().parseFromString(`<div class='slide-container'>${el.value}</div >`, 'text/html');
    return markupParser(xml.body.childNodes[0]);
  }

  mount (node) {
    this.output.replaceChild(node, this.output.childNodes[0]);
  }

  render () {
    this.mount(this.domElem);
  }
}

export default Presentation;

