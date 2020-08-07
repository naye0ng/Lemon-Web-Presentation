import NavigationView from '../view/navigationView';
import FullscreenView from '../view/fullscreenView';
import Popup from '../view/popup/popup';

class FullscreenController {
  constructor (model) {
    this.model = model;

    // TODO: 이 부분 묶기
    this.view = new FullscreenView(this);
    this.navigationView = new NavigationView(this);

    this.slideIndex = 0;
    this.slideSize = 0;

    this.isActivateMousePointer = false;
    this.popupWindow = null;
    this.timer = null;
    this.$timerView = null;
  }

  initNavigationView () {
    this.navigationView.init();
  }

  init () {
    this.view.init();
    this.$slideNumber = document.querySelector('#pt-number');
    this.$pointerButton = document.querySelector('#pointer');
    this.$popupButton = this.navigationView.$navigation.querySelector('#helper-popup');
    this.addDocumentListener();
  }

  addDocumentListener () {
    document.addEventListener('keyup', e => this.eventHandler(e));
    document.addEventListener('fullscreenchange', this.resetFullscreen.bind(this));
  }

  eventHandler (e) {
    const {type, target} = e;
    if (type === 'click') {
      const {id, value} = target;
      switch (id) {
        case 'current-slide': return this.startFullscreen(true);
        case 'first-slide': return this.startFullscreen(false);
        case 'helper-popup': return this.createPopup();
        case 'before': return this.showBeforeSlide();
        case 'next': return this.showNextSlide();
        case 'pt-number': return this.showNthSlide(value);
        case 'pointer': return this.toggleMousePointer();
        case 'helper': return this.openPresentationHelper();
        case 'start-time': return;
        case 'stop-time': return;
        case 'reset-time': return;
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

  startTimer () {
    if (!this.$timerView) return;
    // TODO : 시작 버튼 활성화
    const T = 60;
    let sec = 0;
    let min = 0;
    let time = 0;

    this.timer = setInterval(() => {
      let isOver = parseInt(sec / T);
      if (isOver > 0) min += isOver;
      sec = parseInt(sec % T);

      isOver = parseInt(min / T);
      if (isOver > 0) time += isOver;
      min = parseInt(min % T);
      time = parseInt(time % T);

      this.$timerView.innerHTML = `${sec}:${min}:${time}`;
      sec++;
    }, 1000);
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

  resetFullscreen () {
    if (document.fullscreen) return;
    if (this.popupWindow) this.popupWindow.close();
    this.slideIndex = 0;
    this.slideSize = 0;
    this.view.$fullscreenContents.innerHTML = '';
  }

  resetPopup () {
    this.popupWindow = null;
    this.timer = null;
    this.$timerView = null;
    this.$popupButton.classList.remove('active');
  }

  updatePresentationToolbar () {
    this.$slideNumber.value = this.slideIndex + 1;
    this.moveSlide();
    this.updatePopup();
  }

  updatePopup () {
    if (!this.popupWindow) return;
    const {slideDOM, note} = this.model.getSlideByIndex(this.slideIndex);

    const popupDocumnet = this.popupWindow.document;
    const $currentSlide = popupDocumnet.querySelector('#total');
    const $presenTationNote = popupDocumnet.querySelector('#presentation-note');
    const $slideViewer = popupDocumnet.querySelector('#viewer');

    $currentSlide.innerHTML = `슬라이드 ${this.slideIndex + 1} / ${this.slideSize || this.model.slideSize}`;
    $presenTationNote.innerHTML = note;
    $slideViewer.innerHTML = '';
    $slideViewer.append(slideDOM.cloneNode(true));
  }

  createPopup () {
    if (this.popupWindow) return this.popupWindow.close();
    this.$popupButton.classList.add('active');
    this.popupWindow = window.open('', '_blank', 'width=500, height=300, left=100, top=50');
    this.popupWindow.document.title = '발표자 도구 모음 창';
    this.popupWindow.addEventListener('unload', this.resetPopup.bind(this));

    // [Q] 한번 생성해두고 clone하는 것과 매번 new로 생성해주는 것의 차이가 있음?
    const popupView = new Popup(this);
    this.popupWindow.document.body.append(popupView.style, popupView.$popup);
    this.$timerView = this.popupWindow.document.querySelector('#time-view');
    this.updatePopup();
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
    // this.createPopup();
    this.view.$fullscreen.requestFullscreen();
    this.updatePopup();
  }

  showBeforeSlide () {
    if (!document.fullscreen) return this.popupWindow.alert('프레젠테이션을 시작해주세요!');
    if (this.slideIndex <= 0) return;
    this.slideIndex -= 1;
    this.updatePresentationToolbar();
  }

  showNextSlide () {
    if (!document.fullscreen) return this.popupWindow.alert('프레젠테이션을 시작해주세요!');
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
