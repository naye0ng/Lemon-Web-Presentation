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
      this.arrowKeyHandler(key);
    });
  }

  arrowKeyHandler (key) {
    if (!document.fullscreen) return;
    if (key === 'ArrowLeft' && this.slideIndex > 0) {
      this.slideIndex -= 1;
      this.moveSlide();
    } else if (key === 'ArrowRight' && this.slideIndex < this.slideCount - 1) {
      this.slideIndex += 1;
      this.moveSlide();
    }
  }

  requestFullscreenMode (slides, slideIDList, startIndex = 0) {
    this.view.$fullscreenContents.innerHTML = '';
    this.slideCount = slides.length;
    slideIDList.forEach(id => {
      this.view.$fullscreenContents.append(slides[id].slideTree.cloneNode(true));
    });

    this.slideIndex = startIndex;
    this.view.$fullscreenContents.style.width = `${100 * this.slideCount}vw`;
    this.moveSlide();

    this.view.$fullscreen.requestFullscreen();
  }

  moveSlide () {
    this.view.$fullscreenContents.style.marginLeft = `${-100 * this.slideIndex}vw`;
  }
}

export default FullscreenModeController;
