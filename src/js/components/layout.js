import store from '../store/store';
import {Header, Viewer, Toolbar, Editor, Fullscreen} from './';
import {FullscreenModal} from './modal';

export default function Layout () {
  const element = document.querySelector('#app');
  const {state, events} = store;

  const render = function () {
    element.innerHTML = `
      <div id="header"></div>
      <div id="main">
        <div id="viewer"></div>
        <div id="editor">
          <div id="toolbar"></div>
          <div id="text-editor"></div>
        </div>
      </div>
      <div id="fullscreen-btn"></div>
      <div id="fullscreen"></div>
      <div id="modal" class="dark"></div>`;
  };

  const renderChild = function () {
    const header = new Header();
    const viewer = new Viewer();
    const toolbar = new Toolbar();
    const editor = new Editor();
    const fullscreen = new Fullscreen();

    header.init();
    viewer.init();
    toolbar.init();
    editor.init();
    fullscreen.init();
  };

  const addListener = function () {
    element.querySelector('#modal').addEventListener('click', () => {
      store.dispatch('eventPublish', {stateEvent: 'closeModal'});
    });
    element.querySelector('#fullscreen-btn').addEventListener('click', openFullscreenModal.bind(this));
  };

  const subscribeEvent = function () {
    events.subscribe('openModal', openModal.bind(this));
    events.subscribe('closeModal', closeModal.bind(this));
  };

  const openModal = function () {
    document.querySelector('#modal').classList.add('active');
  };

  const closeModal = function () {
    document.querySelector('#modal').classList.remove('active');
  };

  const openFullscreenModal = function () {
    const {slideSize} = state;
    if (!slideSize) return alert('슬라이드가 존재하지 않습니다.\n슬라이드를 만들어주세요!');
    const fullscreenModal = new FullscreenModal();
    fullscreenModal.init(slideSize);
    store.dispatch('eventPublish', {stateEvent: 'openModal'});
  };

  this.init = function () {
    render();
    addListener();
    subscribeEvent();
    renderChild();
  };
}
