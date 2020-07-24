import markupParser from './Parser/markupParser';
import updateVDOM from './vDOM/updateVDOM';

class Presentation {
  constructor () {
    this.editor = document.querySelector('#markup-editor');
    this.viewer = document.querySelector('#slide-viewer');

    [this.vDOM] = this.viewer.children;
    this.slide = markupParser(this.vDOM);
    // TODO : presentation script
    this.init();
  }

  init () {
    this.editor.addEventListener('keyup', () => {
      this.renderVDOM();
    });
  }

  convertStringToDOM () {
    return new DOMParser().parseFromString(`<div class='slide-container'>${this.editor.value}</div>`, 'text/html');
  }

  renderVDOM () {
    const [newSlideDOM] = this.convertStringToDOM().body.childNodes;
    const newSlide = markupParser(newSlideDOM);

    updateVDOM(this.slide, newSlide)(this.vDOM);
    this.slide = newSlide;
  }
}

export default Presentation;

