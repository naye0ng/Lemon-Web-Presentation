import markupParser from './Parser/markupParser';
import convertObjToDOM from './Parser/convertObjToElem';

class Presentation {
  constructor () {
    this.slides = {};
    this.vDOM = null;
    this.editor = document.querySelector('#markup-editor');
    this.viewer = document.querySelector('#slide-viewer');

    this.init();
  }

  init () {
    this.editor.addEventListener('keyup', () => {
      this.convertStringToDOM();
    });
  }

  convertStringToDOM () {
    // TODO : 변화 감지하는 함수 추가
    const xml = new DOMParser().parseFromString(`<div class='slide-container'>${this.editor.value}</div >`, 'text/html');
    this.slides = markupParser(xml.body.childNodes[0]);
    this.vDOM = convertObjToDOM(this.slides);
    this.render();
  }

  render () {
    // TODO : render(부모노드, 자식노드)로 변화된 부분만 랜더링!
    this.viewer.innerHTML = '';
    this.viewer.appendChild(this.vDOM);
  }
}

export default Presentation;

