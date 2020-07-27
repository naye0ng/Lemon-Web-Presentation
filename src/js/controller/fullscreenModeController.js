import FullscreenView from '../view/fullscreenModeView';

class FullscreenModeController {
  constructor () {
    this.view = new FullscreenView(this);

    this.slideIndex = 0;
    this.slideCount = 0;

    this.init();
  }

  init () {
    document.addEventListener('keydown', ({key}) => {
      if (!document.fullscreen) return;
      this.arrowKeyController(key);
    });
  }

  arrowKeyController (key) {
    if (key === 'ArrowLeft' && this.slideIndex > 0) {
      this.slideIndex -= 1;
      this.view.$fullscreenContents.style.marginLeft = `${-100 * this.slideIndex}vw`;
    } else if (key === 'ArrowRight' && this.slideIndex < this.slideCount - 1) {
      this.slideIndex += 1;
      this.view.$fullscreenContents.style.marginLeft = `${-100 * this.slideIndex}vw`;
    }
  }

  requestFullscreenMode (slides, startIndex = 0) {
    this.view.$fullscreenContents.innerHTML = '';

    this.slideCount = slides.length;
    slides.forEach(({DOMTree}) => {
      this.view.$fullscreenContents.append(DOMTree.cloneNode(true));
    });

    this.slideIndex = startIndex;
    this.view.$fullscreenContents.style.width = `${100 * this.slideCount}vw`;
    this.view.$fullscreenContents.style.marginLeft = `${-100 * this.slideIndex}vw`;

    this.view.$fullscreen.requestFullscreen();
  }
}

export default FullscreenModeController;
