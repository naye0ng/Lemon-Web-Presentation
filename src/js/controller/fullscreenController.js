import FullscreenView from '../view/fullscreenView';

class FullscreenController {
  constructor (model) {
    this.model = model;
    this.view = new FullscreenView(this);

    this.slideIndex = 0;
    this.slideSize = 0;
  }

  init () {
    this.view.bind();
  }

  arrowKeyHandler (key) {
    if (!document.fullscreen) return;
    if (key === 'ArrowLeft' && this.slideIndex > 0) {
      this.slideIndex -= 1;
      this.moveSlide();
    } else if (key === 'ArrowRight' && this.slideIndex < this.slideSize - 1) {
      this.slideIndex += 1;
      this.moveSlide();
    }
  }

  startFullscreen (isStatCurrentSlide) {
    const {slideSize, currentSlideIndex} = this.model;
    if (!slideSize) return alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');
    const startSlideIndex = isStatCurrentSlide ? currentSlideIndex : 0;

    this.view.$fullscreenContents.innerHTML = '';
    this.slideSize = slideSize;

    this.model.getSlideIDList().forEach(id => {
      const {slideDOM} = this.model.getSlideByID(id);
      this.view.$fullscreenContents.append(slideDOM.cloneNode(true));
    });

    this.slideIndex = startSlideIndex;
    this.view.$fullscreenContents.style.width = `${100 * this.slideSize}vw`;
    this.moveSlide();

    this.view.$fullscreen.requestFullscreen();
  }

  moveSlide () {
    this.view.$fullscreenContents.style.marginLeft = `${-100 * this.slideIndex}vw`;
  }
}

export default FullscreenController;
