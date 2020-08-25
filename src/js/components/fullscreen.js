import store from '../store/store';

export default function Fullscreen () {
  const element = document.querySelector('#fullscreen');
  const {state, events} = store;

  const render = function () {
    element.innerHTML = `
      <div id="fullscreen-menu">
        <div class="fullscreenn-controller">
          <button id="before2" class="before-btn"></button>
          <input id="slide-number2" type="number" max="1" min="1" value="1">
          <button id="next2" class="next-btn"></button>
        </div>
        <button id="pointer">포인터</button>
      </div>
      <div id="fullscreen-contents"></div>
      <div id="mouse-pointer"></div>`;
  };

  const addListener = function () {
    document.addEventListener('keyup', ({key}) => keyupHandler(key));
    document.addEventListener('fullscreenchange', fullscreenHandler.bind(this));
    element.querySelector('#slide-number2').addEventListener('keyup', ({target}) => {
      updateSlideIndex(target.value - 1);
    });
  };

  const keyupHandler = function (key) {
    switch (key) {
      case 'ArrowLeft': return updateSlideIndex(state.ptIndex - 1);
      case 'ArrowRight': return updateSlideIndex(state.ptIndex + 1);
      default:
    }
  };

  const fullscreenHandler = function () {
    if (document.fullscreen) return;
    store.dispatch('eventPublish', {stateEvent: 'closeFullscreen'});
  };

  const subscribeEvent = function () {
    events.subscribe('startFullscreen', startFullscreen.bind(this));
    events.subscribe('changePTSlideIndex', showNthSlide.bind(this));
  };

  const startFullscreen = function () {
    renderSlides();
    element.requestFullscreen();
    store.dispatch('eventPublish', {stateEvent: 'closeModal'});
  };

  const renderSlides = function () {
    const $slideContainer = element.querySelector('#fullscreen-contents');
    $slideContainer.innerHTML = '';

    const {slideIDList, ptIndex, slideSize} = state;
    slideIDList.forEach(ID => {
      const $slide = state.getSlideNode(ID);
      $slideContainer.append($slide.cloneNode(true));
    });

    $slideContainer.style.width = `${100 * slideSize}vw`;
    showNthSlide();
    updateSlideNumber(ptIndex + 1, slideSize);
  };

  const updateSlideIndex = function (index) {
    store.dispatch('updatePTIndex', {index, stateEvent: 'changePTSlideIndex'});
  };

  const showNthSlide = function () {
    const $slideContainer = element.querySelector('#fullscreen-contents');
    $slideContainer.style.marginLeft = `${-100 * state.ptIndex}vw`;
  };

  const updateSlideNumber = function (value, max) {
    const $slideNumber = element.querySelector('#slide-number2');
    $slideNumber.value = value;
    $slideNumber.max = max;
  };

  this.init = function () {
    render();
    addListener();
    subscribeEvent();
  };
}
