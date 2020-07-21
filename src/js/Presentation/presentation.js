import markupParser from './Parser/markupParser';
import compareNodes from './Parser/compareNodes';

class Presentation {
  constructor () {
    this.editor = document.querySelector('#markup-editor');
    this.viewer = document.querySelector('#slide-viewer');

    [this.vDOM] = this.viewer.children;
    this.slide = markupParser(this.vDOM);

    this.init();
  }

  init () {
    this.editor.addEventListener('keyup', () => {
      this.convertStringToDOM();
    });
  }
  // TODO : 이름 바꾸기, 변화를 넘겨주는 함수?
  convertStringToDOM () {
    const xml = new DOMParser().parseFromString(`<div class='slide-container'>${this.editor.value}</div >`, 'text/html');
    const newSlide = markupParser(xml.body.childNodes[0]);
    console.log(newSlide);
    compareNodes(this.slide, newSlide)(this.vDOM);
    this.slide = newSlide;
  }
}

export default Presentation;

