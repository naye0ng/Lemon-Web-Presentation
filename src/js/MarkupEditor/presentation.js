import markupParser from './markupParser';

class Presentation {
  constructor () {
    this.state = {};
    this.input = document.querySelector('textarea#markup-editor');
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
    const xml = new DOMParser().parseFromString(`<div class='slide-container'>${el.value}</div>`, 'text/xml');
    return markupParser(xml.children[0]);
  }

  render () {
    // TODO : 여기에서 화면에 보이는데 차이점을 찾아서 virtual DOM 만들고 뿌리기
    this.output.innerHTML = this.getState();

    // console.log(this.getState());
  }
}

export default Presentation;
