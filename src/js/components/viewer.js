import store from '../store/store';

export default function Layout () {
  const element = document.querySelector('#viewer');
  const {state, events} = store;


  const render = function () {
    element.innerHTML = `
    <div class="mode-change-btns">
      <button id="editor-view-btn" class="mode-change-btn active">에디터뷰</button>
      <button id="grid-view-btn" class="mode-change-btn">그리드뷰</button>
    </div>
    <div class="slide-viewer">
      <div id="slide-container"></div>
    </div>`;
  };

  const subscribeEvent = function () {
    events.subscribe('updateSlide', renderSlide.bind(this));
    events.subscribe('choosePresentation', renderPresentationSlide.bind(this));
  };

  const renderSlide = function () {
    const $slide = state.getSlideNode();
    const $nextSlide = state.getNextSlideNode();
    if (!$slide) return;
    element.querySelector('#slide-container').insertBefore($slide, $nextSlide);
  };

  const renderPresentationSlide = function () {
    const $slideContainer = element.querySelector('#slide-container');
    $slideContainer.innerHTML = '';

    state.slideIDList.forEach(ID => {
      const $slide = state.getSlideNode(ID);
      $slideContainer.append($slide);
    });
  };

  const addListener = function () {
    element.querySelector('.mode-change-btns').addEventListener('click', ({target}) => toggleViewerMode(target));
    element.querySelector('#slide-container').addEventListener('click', ({target}) => focusOnClickedSlide(target));
    element.querySelector('#slide-container').addEventListener('dragover', e => e.preventDefault());
  };

  const toggleViewerMode = function ({id, classList}) {
    if (classList.length === 2) return;
    element.querySelector('#editor-view-btn').classList.toggle('active');
    element.querySelector('#grid-view-btn').classList.toggle('active');
    document.querySelector('#main').classList.toggle('grid-mode');
  };

  const focusOnClickedSlide = function ({id, classList}) {
    if (!classList.contains('slide')) return;
    return store.dispatch('focusOnNthSlide', {
      stateEvent: 'focusOnSlide',
      slideIndex: state.getSlideIndexByID(id),
    });
  };

  this.init = function () {
    render();
    addListener();
    subscribeEvent();
  };
}

