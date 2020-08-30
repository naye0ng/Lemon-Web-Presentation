import store from '../store/store';

export default function Popup () {
  const {state, events} = store;

  let popupWindow = null;
  let $viewer = null;
  let $note = null;
  let $total = null;


  let $timerView = null;
  let timer = null;
  let copyH = 0;
  let copyM = 0;
  let copyS = 0;
  let second = 0;
  let minute = 0;
  let hour = 0;

  const createPopupWindow = function () {
    if (popupWindow) return popupWindow.close();
    popupWindow = window.open('popup.html', '_blank', 'width=600, height=300, left=100, top=50');
    popupWindow.addEventListener('DOMContentLoaded', render.bind(this));
  };

  const render = function () {
    const {body} = popupWindow.document;
    body.innerHTML = `<div class="presentaion-helper">
      <div class="timer-and-viewer">
        <div id="timer">
          <div id="time-view">00:00:00</div>
          <div class="buttons">
            <button id="start-timer">시작</button>
            <button id="stop-timer">정지</button>
            <button id="reset-timer">초기화</button>
          </div>
        </div>
        <div id="viewer">
        </div>
      </div>
      <div class="controller-and-note">
        <div id="slide-controller">
          <div id="total"></div>
          <div class="buttons">
            <button id="before">이전</button>
            <button id="next">다음</button>
          </div>
        </div>
        <div id="presentation-note"></div>
      </div>
      </div>`;

    $viewer = body.querySelector('#viewer');
    $note = body.querySelector('#presentation-note');
    $total = body.querySelector('#total');
    $timerView = body.querySelector('#time-view');

    renderSlides();
  };

  const renderSlides = function () {
    const {ptIndex, slideSize} = state;
    const {note, $slide} = state.getPtSlide();

    $viewer.innerHTML = '';
    $viewer.append($slide);
    $note.innerHTML = note;
    $total.innerHTML = `슬라이드 ${ptIndex + 1} / ${slideSize}`;
  };

  const addListener = function () {
    popupWindow.addEventListener('click', ({target}) => clickHandler(target));
    popupWindow.addEventListener('unload', destoryPopup.bind(this));
  };

  const clickHandler = function ({id}) {
    if (!document.fullscreen) return popupWindow.alert('슬라이드 쇼를 시작해주세요!');
    switch (id) {
      case 'before': return updateSlideIndex(state.ptIndex - 1);
      case 'next': return updateSlideIndex(state.ptIndex + 1);
      case 'start-timer': return startTimer();
      case 'stop-timer': return stopTimer();
      case 'reset-timer': return resetTimer();
      default:
    }
  };

  const subscribeEvent = function () {
    events.subscribe('closeFullscreen', closePopupWindow.bind(this));
    events.subscribe('changePTSlideIndex', renderSlides.bind(this));
  };

  const closePopupWindow = function () {
    if (!popupWindow) return;
    popupWindow.close();
  };

  const updateSlideIndex = function (index) {
    store.dispatch('updatePTIndex', {index, stateEvent: 'changePTSlideIndex'});
  };

  const destoryPopup = function () {
    destroyTimer();
  };

  const getTimeText = time => (time < 10 ? `0${time}` : time);

  const updateTimer = function () {
    $timerView.innerHTML = `${getTimeText(hour + copyH)}:${getTimeText(minute + copyM)}:${getTimeText(second + copyS)}`;
  };

  const startTimer = function () {
    if (timer) return;
    const start = new Date();
    timer = setInterval(() => {
      const current = new Date();
      const count = current - start;

      second = Math.floor((count / 1000)) % 60;
      minute = Math.floor((count / 60000)) % 60;
      hour = Math.floor((count / 3600000)) % 24;

      updateTimer();
    }, 100);
  };

  const stopTimer = () => {
    if (!timer) return;
    copyH += hour;
    copyM += minute;
    copyS += second;
    destroyTimer(timer);
  };

  const destroyTimer = () => {
    clearInterval(timer);
    second = 0;
    minute = 0;
    hour = 0;
    timer = null;
  };

  const resetTimer = () => {
    copyH = 0;
    copyM = 0;
    copyS = 0;
    destroyTimer();
    updateTimer();
  };

  this.init = function () {
    createPopupWindow();
    addListener();
    subscribeEvent();
  };

  this.destory = function () {
    closePopupWindow();
  };
}
