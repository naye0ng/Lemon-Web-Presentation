import NavigationView from '../view/navigationView';
import FullscreenView from '../view/fullscreenView';
import Popup from '../view/fullscreen/popup';

class FullscreenController {
  constructor (model) {
    this.model = model;

    // TODO: 이 부분 묶기
    this.view = new FullscreenView(this);
    this.popupView = new Popup(this);
    this.navigationView = new NavigationView(this);

    this.slideIndex = 0;
    this.slideSize = 0;

    this.isActivateMousePointer = false;
    this.presentationHelperPopup = null;
  }

  initNavigationView () {
    this.navigationView.init();
  }

  init () {
    this.view.init();
    this.$slideNumber = document.querySelector('#pt-number');
    this.$pointerButton = document.querySelector('#pointer');
    this.addDocumentListener();
  }

  addDocumentListener () {
    document.addEventListener('keyup', e => this.controller.eventHandler(e));
    document.addEventListener('fullscreenchange', this.resetFullscreen.bind(this));
  }

  eventHandler (e) {
    const {type, target} = e;
    if (type === 'click') {
      const {id, value} = target;
      switch (id) {
        case 'current-slide': return this.startFullscreen(true);
        case 'first-slide': return this.startFullscreen(false);
        case 'pt-helper': return this.openPresentationHelperPopup();
        case 'before': return this.showBeforeSlide();
        case 'next': return this.showNextSlide();
        case 'pt-number': return this.showNthSlide(value);
        case 'pointer': return this.toggleMousePointer();
        case 'helper': return this.openPresentationHelper();
        default:
      }
    }

    if (!document.fullscreen) return;
    switch (type) {
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

  resetFullscreen () {
    if (document.fullscreen) return;
    if (this.presentationHelperPopup) {
      this.presentationHelperPopup.close();
      this.presentationHelperPopup = null;
    }
    this.view.$fullscreenContents.innerHTML = '';
  }

  toggleMousePointer () {
    this.isActivateMousePointer = !this.isActivateMousePointer;
    this.view.$fullscreen.classList.toggle('mouse-pointer-active');
    this.$pointerButton.classList.toggle('active');
  }

  renderMousePointer (e) {
    if (!this.isActivateMousePointer) return;
    const {clientX, clientY} = e;
    this.view.$mousePointer.style.left = `${clientX}px`;
    this.view.$mousePointer.style.top = `${clientY}px`;
  }

  deactiveMousePointer () {
    if (!this.isActivateMousePointer) return;
    this.view.$fullscreen.classList.remove('mouse-pointer-active');
  }

  activeMousePointer () {
    if (!this.isActivateMousePointer) return;
    this.view.$fullscreen.classList.add('mouse-pointer-active');
  }

  updatePresentationToolbar () {
    this.$slideNumber.value = this.slideIndex + 1;
    this.moveSlide();
  }

  openPresentationHelperPopup () {
    if (this.presentationHelperPopup) return;
    this.presentationHelperPopup = window.open('', '_blank', 'width=400, height=300, left=100, top=50');
    this.presentationHelperPopup.document.title = '발표자 도구 모음 창';
    this.presentationHelperPopup.document.body.append(this.popupView.$popup);
  }

  startFullscreen (isStatCurrentSlide) {
    const {slideSize, currentSlideIndex} = this.model;
    if (!slideSize) return alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');

    this.model.getSlideIDList().forEach(id => {
      const {slideDOM} = this.model.getSlide(id);
      this.view.$fullscreenContents.append(slideDOM.cloneNode(true));
    });

    const startSlideIndex = isStatCurrentSlide ? currentSlideIndex : 0;
    this.slideSize = slideSize;
    this.slideIndex = startSlideIndex;

    this.view.$fullscreenContents.style.width = `${100 * this.slideSize}vw`;
    this.$slideNumber.max = this.slideSize;

    this.updatePresentationToolbar();

    // 이렇게 두개가 한번에 요청이 안됨
    // this.openPresentationHelperPopup();
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
    this.view.$fullscreenContents.style.marginLeft = `${-100 * this.slideIndex}vw`;
  }
}

export default FullscreenController;
