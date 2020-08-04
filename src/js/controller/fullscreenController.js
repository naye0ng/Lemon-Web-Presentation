import NavigationView from '../view/navigationView';
import FullscreenView from '../view/fullscreenView';

class FullscreenController {
  constructor (model) {
    this.model = model;
    this.view = new FullscreenView(this);
    this.navigationView = new NavigationView(this);

    this.slideIndex = 0;
    this.slideSize = 0;

    this.isActivateMousePointer = false;
  }

  init () {
    this.view.init();
    this.$fullscreenContents = this.view.$fullscreen.querySelector('#fullscreen-contents');
    this.$slideNumber = this.view.$fullscreen.querySelector('#show-slide-number');
    this.$mousePointer = this.view.$fullscreen.querySelector('#mouse-pointer');
    this.$pointerButton = this.view.$fullscreen.querySelector('#pointer');
  }

  initNavigationView () {
    this.navigationView.init();
  }

  eventHandler ({id, value}) {
    switch (id) {
      case 'current-slide': return this.startFullscreen(true);
      case 'first-slide': return this.startFullscreen(false);
      case 'before': return this.showBeforeSlide();
      case 'next': return this.showNextSlide();
      case 'show-slide-number': return this.showNthSlide(value);
      case 'pointer': return this.toggleMousePointer();
      default:
    }
  }

  documentEventHandler (e) {
    if (!document.fullscreen) return;
    switch (e.type) {
      case 'mousemove': return this.renderMousePointer(e);
      case 'mouseenter': return this.activeMousePointer();
      case 'mouseleave': return this.deactiveMousePointer();
      case 'keyup': return this.arrowKeyHandler(e);
      default:
    }
  }

  arrowKeyHandler ({key}) {
    switch (key) {
      case 'ArrowLeft': return this.showBeforeSlide();
      case 'ArrowRight': return this.showNextSlide();
      default:
    }
  }

  toggleMousePointer () {
    this.isActivateMousePointer = !this.isActivateMousePointer;
    this.view.$fullscreen.classList.toggle('mouse-pointer-active');
    this.$pointerButton.classList.toggle('active');
  }

  renderMousePointer (e) {
    if (!this.isActivateMousePointer) return;
    const {clientX, clientY} = e;
    this.$mousePointer.style.left = `${clientX}px`;
    this.$mousePointer.style.top = `${clientY}px`;
  }

  deactiveMousePointer () {
    if (!this.isActivateMousePointer) return;
    this.view.$fullscreen.classList.remove('mouse-pointer-active');
  }

  activeMousePointer (e) {
    if (!this.isActivateMousePointer) return;
    this.view.$fullscreen.classList.add('mouse-pointer-active');
  }

  updatePresentationToolbar () {
    this.$slideNumber.value = this.slideIndex + 1;
    this.moveSlide();
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
    this.$slideNumber.max = this.slideSize;
    this.updatePresentationToolbar();
    this.view.$fullscreen.requestFullscreen();
  }

  showBeforeSlide () {
    if (this.slideIndex <= 0) return;
    this.slideIndex -= 1;
    this.updatePresentationToolbar();
  }

  showNextSlide () {
    if (this.slideIndex >= this.slideSize - 1) return;
    this.slideIndex += 1;
    this.updatePresentationToolbar();
  }

  showNthSlide (n) {
    if (n === this.slideIndex) return;
    if (n < 1 || n > this.slideSize) return;
    this.slideIndex = n - 1;
    this.updatePresentationToolbar();
  }

  moveSlide () {
    this.$fullscreenContents.style.marginLeft = `${-100 * this.slideIndex}vw`;
  }
}

export default FullscreenController;
