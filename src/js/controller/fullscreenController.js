import NavigationView from '../view/navigationView';
import FullscreenView from '../view/fullscreenView';

class FullscreenController {
  constructor (model) {
    this.model = model;
    this.view = new FullscreenView(this);
    this.navigationView = new NavigationView(this);

    this.slideIndex = 0;
    this.slideSize = 0;
  }

  init () {
    this.view.init();
    this.$fullscreenContents = this.view.$fullscreen.querySelector('#fullscreen-contents');
  }

  initNavigationView () {
    this.navigationView.init();
  }

  eventHandler ({id}) {
    switch (id) {
      case 'current-slide': return this.startFullscreen(false);
      case 'first-slide': return this.startFullscreen(true);
      case 'before': return this.showBeforeSlide();
      case 'next': return this.showNextSlide();
      default:
    }
  }

  arrowKeyHandler (key) {
    if (!document.fullscreen) return;
    switch (key) {
      case 'ArrowLeft': return this.showBeforeSlide();
      case 'ArrowRight': return this.showNextSlide();
      default:
    }
  }

  startFullscreen (isStatCurrentSlide) {
    const {slideSize, currentSlideIndex} = this.model;
    if (!slideSize) return alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');
    const startSlideIndex = isStatCurrentSlide ? currentSlideIndex : 0;

    this.$fullscreenContents.innerHTML = '';
    this.slideSize = slideSize;

    this.model.getSlideIDList().forEach(id => {
      const {slideDOM} = this.model.getSlide(id);
      this.$fullscreenContents.append(slideDOM.cloneNode(true));
    });

    this.slideIndex = startSlideIndex;
    this.$fullscreenContents.style.width = `${100 * this.slideSize}vw`;
    this.moveSlide();

    this.view.$fullscreen.requestFullscreen();
  }

  showBeforeSlide () {
    if (this.slideIndex <= 0) return;
    this.slideIndex -= 1;
    this.moveSlide();
  }

  showNextSlide () {
    if (this.slideIndex >= this.slideSize - 1) return;
    this.slideIndex += 1;
    this.moveSlide();
  }

  moveSlide () {
    this.$fullscreenContents.style.marginLeft = `${-100 * this.slideIndex}vw`;
  }
}

export default FullscreenController;
