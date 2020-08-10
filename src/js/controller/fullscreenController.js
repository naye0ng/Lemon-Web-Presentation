import {fullscreenView, modalView, popupView} from '../view';

const fullscreenController = model => {
  const fullscreen = fullscreenView();

  let PTIndex = 0;
  let PTSize = 0;

  // let modal = null;
  let isActivateMousePointer = false;
  let popupWindow = null;
  let timer = null;
  let $timerView = null;
  let second = 0;
  let minute = 0;
  let hour = 0;

  const init = () => {
    renderView();
    bindEventHandler();
    bindDocumentEvent();
  };

  const renderView = () => {
    fullscreen.render();
  };

  const bindEventHandler = () => {
    ['keyup', 'mousemove', 'mouseenter', 'mouseleave'].forEach(
      type => fullscreen.$fullscreen.addEventListener(type, e => fullscreenEventHandler(e))
    );
    fullscreen.$fullscreen.addEventListener('click', ({target}) => fullscreenClickEventHandler(target));
    document.querySelector('#fullscreen-btn').addEventListener('click', openFullscreenModal.bind(this));
  };

  const bindDocumentEvent = () => {
    document.addEventListener('keyup', e => fullscreenEventHandler(e));
    document.addEventListener('fullscreenchange', resetFullscreen.bind(this));
    // TODO : 모달 부분은 editorController와 공통적임!! >> 나중에 분리할 것!
    document.querySelector('#modal').addEventListener('click', ({target}) => closeModal(target));
  };

  const popupEventHandler = ({id}) => {
    if (!document.fullscreen) return popupWindow.alert('프레젠테이션을 시작해주세요!');
    switch (id) {
      case 'before': return showBeforeSlide();
      case 'next': return showNextSlide();
      case 'start-timer': return startTimer();
      case 'stop-timer': return stopTimer();
      case 'reset-timer': return resetTimer();
      default:
    }
  };

  const modalEventHandler = ({id}) => {
    switch (id) {
      case 'show': return startFullscreen();
      case 'popup': return createPopup();
      case 'cancel': return closeModal({id: 'modal'});
      default:
    }
  };

  const fullscreenClickEventHandler = ({id}) => {
    switch (id) {
      case 'before2': return showBeforeSlide();
      case 'next2': return showNextSlide();
      case 'pointer': return toggleMousePointer();
      default:
    }
  };

  const fullscreenEventHandler = e => {
    if (!document.fullscreen) return;
    const {type, target} = e;
    switch (type) {
      case 'mousemove': return renderMousePointer(e);
      case 'mouseenter': return activeMousePointer();
      case 'mouseleave': return deactiveMousePointer();
      case 'keyup':
        if (target.id === 'slide-number2') return showNthSlide(target.value);
        return arrowKeyHandler(e);
      default:
    }
  };

  const arrowKeyHandler = ({key}) => {
    switch (key) {
      case 'ArrowLeft': return showBeforeSlide();
      case 'ArrowRight': return showNextSlide();
      default:
    }
  };

  const toggleMousePointer = () => {
    isActivateMousePointer = !isActivateMousePointer;
    fullscreen.$fullscreen.classList.toggle('mouse-pointer-active');
  };

  const renderMousePointer = e => {
    if (!isActivateMousePointer) return;
    const {clientX, clientY} = e;
    fullscreen.renderMousePointer(clientX, clientY);
  };

  const deactiveMousePointer = () => {
    if (!isActivateMousePointer) return;
    fullscreen.$fullscreen.classList.remove('mouse-pointer-active');
  };

  const activeMousePointer = () => {
    if (!isActivateMousePointer) return;
    fullscreen.$fullscreen.classList.add('mouse-pointer-active');
  };

  // fullscreen
  const resetFullscreen = () => {
    if (document.fullscreen) return;
    if (popupWindow) popupWindow.close();
    PTIndex = 0;
    PTSize = 0;
    fullscreen.reset();
  };

  const updateFullscreenView = () => {
    fullscreen.updateSlideNumber({value: PTIndex + 1});
    updatePopupView();
    moveSlide();
  };

  const showNthSlide = n => {
    if (n === PTIndex) return;
    if (n < 1 || n > PTSize) return;
    PTIndex = n - 1;
    updateFullscreenView();
  };

  const showBeforeSlide = () => {
    if (PTIndex <= 0) return;
    PTIndex -= 1;

    updateFullscreenView();
  };

  const showNextSlide = () => {
    if (PTIndex >= PTSize - 1) return;
    PTIndex += 1;
    updateFullscreenView();
  };

  const moveSlide = () => {
    fullscreen.updateSlideContentsStyle('marginLeft', `${-100 * PTIndex}vw`);
  };


  const startFullscreen = () => {
    model.getSlideIDList().forEach(id => {
      const {slideDOM} = model.getSlide(id);
      fullscreen.renderSlide(slideDOM.cloneNode(true));
    });

    const animation = document.querySelector('#animation').value;
    const $fullscreenContents = fullscreen.$fullscreen.querySelector('#fullscreen-contents');
    if (animation) $fullscreenContents.classList.add(animation);
    $fullscreenContents.style.width = `${100 * PTSize}vw`;
    fullscreen.updateSlideNumber({max: PTSize});

    updateFullscreenView();
    fullscreen.$fullscreen.requestFullscreen();
    closeModal();
  };

  // popup
  const updatePopupView = () => {
    if (!popupWindow) return;
    const {slideDOM, note} = model.getSlideByIndex(PTIndex);
    popupWindow.document.querySelector('#total').innerHTML = `슬라이드 ${PTIndex + 1} / ${PTSize || model.slideSize}`;
    popupWindow.document.querySelector('#presentation-note').innerHTML = note;
    const $slideViewer = popupWindow.document.querySelector('#viewer');
    $slideViewer.innerHTML = '';
    $slideViewer.append(slideDOM.cloneNode(true));
  };

  const closePopup = () => {
    popupWindow = null;
    timer = null;
    $timerView = null;
    resetTimer();
    document.querySelector('#popup').classList.remove('active');
  };

  const bindPopupEventHandler = () => {
    popupWindow.addEventListener('click', ({target}) => popupEventHandler(target));
    popupWindow.addEventListener('unload', closePopup.bind(this));
  };

  const renderPopup = () => {
    const {slideDOM, note} = model.getSlideByIndex(PTIndex);
    const {body} = popupWindow.document;
    body.innerHTML = popupView().render({
      timer: '00:00:00',
      slideNumber: PTIndex + 1,
      slideSize: model.slideSize,
      note,
    });
    body.querySelector('#viewer').append(slideDOM.cloneNode(true));
    $timerView = body.querySelector('#time-view');
    bindPopupEventHandler();
  };

  const createPopup = () => {
    if (popupWindow) return popupWindow.close();
    popupWindow = window.open('popup.html', '_blank', 'width=500, height=300, left=100, top=50');
    popupWindow.addEventListener('DOMContentLoaded', renderPopup.bind(this));
    document.querySelector('#popup').classList.add('active');
  };

  // modal
  const closeModal = ({id}) => {
    if (id !== 'modal') return;
    const $modal = document.querySelector('#modal');
    $modal.classList.remove('active');
    $modal.classList.remove('dark');
  };

  const updateFullscreenModal = n => {
    PTIndex = n - 1;
    const {slideDOM} = model.getSlideByIndex(PTIndex);
    const $slidePreview = document.querySelector('.pt-slide-viewer');
    $slidePreview.innerHTML = '';
    $slidePreview.append(slideDOM.cloneNode(true));
    updatePopupView();
  };

  const openFullscreenModal = () => {
    const {slideSize} = model;
    if (!slideSize) return alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');
    PTSize = slideSize;

    modalView().renderFullscreenModal(PTSize);

    const $modal = document.querySelector('#modal');
    $modal.classList.add('active');
    $modal.classList.add('dark');

    bindModalEventHandler();
    updateFullscreenModal(1);
  };

  const bindModalEventHandler = () => {
    const $modal = document.querySelector('#modal');
    $modal.querySelector('#slide-number3').addEventListener('keyup', ({target}) => updateFullscreenModal(target.value));
    $modal.querySelector('.modal').addEventListener('click', e => {
      e.stopPropagation();
      modalEventHandler(e.target);
    });
  };

  const getTimeText = time => (time < 10 ? `0${time}` : time);

  const updateTimer = () => {
    $timerView.innerHTML = `${getTimeText(hour)}:${getTimeText(minute)}:${getTimeText(second)}`;
  };
  const startTimer = () => {
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
    clearInterval(timer);
  };

  const resetTimer = () => {
    if (!timer) return;
    clearInterval(timer);
    second = 0;
    minute = 0;
    hour = 0;
    updateTimer();
  };

  return {
    init,
  };
};

export default fullscreenController;
