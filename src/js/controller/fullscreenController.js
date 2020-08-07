import {navigationView, fullscreenView, popupView} from '../view';

class FullscreenController {
  constructor (model) {
    this.model = model;
    this.navigationView = navigationView();
    this.fullscreenView = fullscreenView();
    // render는 나중에

    this.slideIndex = 0;
    this.slideSize = 0;

    this.isActivateMousePointer = false;
    this.popupWindow = null;
    this.timer = null;
    this.$timerView = null;
    this.second = 0;
    this.minute = 0;
    this.hour = 0;
  }

  init () {
    this.renderView();
    this.bindEventHandler();
    this.bindDocumentEvent();
    // this.run();
  }

  renderView () {
    this.navigationView.render();
    this.fullscreenView.render();
  }

  bindEventHandler () {
    ['click', 'keyup', 'mousemove', 'mouseenter', 'mouseleave'].forEach(
      type => this.fullscreenView.bindFullscreenEvent(type, this.eventHandler.bind(this))
    );
    this.navigationView.bindButtonEvent('click', this.eventHandler.bind(this));
  }

  bindDocumentEvent () {
    document.addEventListener('keyup', e => this.eventHandler(e));
    document.addEventListener('fullscreenchange', this.resetFullscreen.bind(this));
  }

  // 얘는 분리하기
  eventHandler (e) {
    const {type, target} = e;
    if (type === 'click') {
      const {id} = target;
      switch (id) {
        case 'current-slide': return this.startFullscreen(true);
        case 'first-slide': return this.startFullscreen(false);
        case 'helper-popup': return this.createPopup();
        case 'before': return this.showBeforeSlide();
        case 'next': return this.showNextSlide();
        case 'pointer': return this.toggleMousePointer();
        case 'start-timer': return this.startTimer();
        case 'stop-timer': return this.stopTimer();
        case 'reset-timer': return this.resetTimer();
        default:
      }
    }
    if (!document.fullscreen) return;
    switch (type) {
      case 'mousemove': return this.renderMousePointer(e);
      case 'mouseenter': return this.activeMousePointer();
      case 'mouseleave': return this.deactiveMousePointer();
      case 'keyup':
        if (e.target.id === 'pt-number') return this.showNthSlide(e.target.value);
        return this.arrowKeyHandler(e);
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
    this.fullscreenView.$fullscreen.classList.toggle('mouse-pointer-active');
    this.fullscreenView.toggleMousePointer();
  }

  renderMousePointer (e) {
    if (!this.isActivateMousePointer) return;
    const {clientX, clientY} = e;
    this.fullscreenView.renderMousePointer(clientX, clientY);
  }

  deactiveMousePointer () {
    if (!this.isActivateMousePointer) return;
    this.fullscreenView.$fullscreen.classList.remove('mouse-pointer-active');
  }

  activeMousePointer () {
    if (!this.isActivateMousePointer) return;
    this.fullscreenView.$fullscreen.classList.add('mouse-pointer-active');
  }

  resetFullscreen () {
    if (document.fullscreen) return;
    if (this.popupWindow) this.popupWindow.close();
    this.slideIndex = 0;
    this.slideSize = 0;
    this.fullscreenView.reset();
  }

  resetPopup () {
    this.popupWindow = null;
    this.timer = null;
    this.$timerView = null;
    this.resetTimer();
    // this.$popupButton.classList.remove('active');
  }

  updatePresentationToolbar () {
    this.fullscreenView.updateSlideNumber({value: this.slideIndex + 1});
    this.moveSlide();
    this.updatePopup();
  }

  updatePopup () {
    if (!this.popupWindow) return;
    const {slideDOM, note} = this.model.getSlideByIndex(this.slideIndex);
    // TODO : 중복 코드 제거 및 분리!!!
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
    // this.$popupButton.classList.add('active');
    this.popupWindow = window.open('popup.html', '_blank', 'width=500, height=300, left=100, top=50');
    this.popupWindow.addEventListener('DOMContentLoaded', this.renderPopup.bind(this));
  }

  renderPopup () {
    const {slideDOM, note} = this.model.getSlideByIndex(this.slideIndex);
    const {body} = this.popupWindow.document;
    body.innerHTML = popupView().render({
      timer: '00:00:00',
      slideNumber: this.slideSize,
      slideSize: this.model.slideSize,
      note,
    });
    body.querySelector('#viewer').append(slideDOM.cloneNode(true));
    this.$timerView = body.querySelector('#time-view');
    this.popupWindow.addEventListener('click', e => this.eventHandler(e));
    this.popupWindow.addEventListener('unload', this.resetPopup.bind(this));
  }

  startFullscreen (isStatCurrentSlide) {
    const {slideSize, currentSlideIndex} = this.model;
    if (!slideSize) return alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');

    this.model.getSlideIDList().forEach(id => {
      const {slideDOM} = this.model.getSlide(id);
      this.fullscreenView.renderSlide(slideDOM.cloneNode(true));
    });

    const startSlideIndex = isStatCurrentSlide ? currentSlideIndex : 0;
    this.slideSize = slideSize;
    this.slideIndex = startSlideIndex;

    this.fullscreenView.updateSlideContentsStyle('width', `${100 * this.slideSize}vw`);
    this.fullscreenView.updateSlideNumber({max: this.slideSize});

    this.updatePresentationToolbar();

    // 이렇게 두개가 한번에 요청이 안됨
    // this.createPopup();
    this.fullscreenView.$fullscreen.requestFullscreen();
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
    this.fullscreenView.updateSlideContentsStyle('marginLeft', `${-100 * this.slideIndex}vw`);
  }

  getTimeText (time) {
    return time < 10 ? `0${time}` : time;
  }

  updateTimer () {
    this.$timerView.innerHTML = `${this.getTimeText(this.hour)}:${this.getTimeText(this.minute)}:${this.getTimeText(this.second)}`;
  }

  startTimer () {
    const T = 60;
    this.timer = setInterval(() => {
      this.second++;
      let isOver = parseInt(this.second / T);
      if (isOver > 0) this.minute += isOver;
      this.second = parseInt(this.second % T);

      isOver = parseInt(this.minute / T);
      if (isOver > 0) this.hour += isOver;
      this.minute = parseInt(this.minute % T);
      this.hour = parseInt(this.hour % T);
      this.updateTimer();
    }, 1000);
  }

  stopTimer () {
    if (!this.timer) return;
    clearInterval(this.timer);
  }

  resetTimer () {
    if (!this.timer) return;
    clearInterval(this.timer);
    this.second = 0;
    this.minute = 0;
    this.hour = 0;
    this.updateTimer();
  }
}

export default FullscreenController;
