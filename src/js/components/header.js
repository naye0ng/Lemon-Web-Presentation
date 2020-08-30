import store from '../store/store';
import {ArchiveModal, UsageModal} from './modal';

export default function Header () {
  const element = document.querySelector('#header');
  const {state, events} = store;

  const render = function () {
    element.innerHTML = `
      <div class="header-infomation">
      <div class="header-logo"></div>
      <input id="title-input" type="text" placeholder="제목을 입력하세요." />
      </div>
      <div class="header-menu">
          <button id="save-btn" class="header-btn">저장</button>
          <button id="archive-btn" class="header-btn">파일</button>
          <button id="reset-btn" class="header-btn">새 프레젠테이션</button>
          <button id="usage-btn" class="header-btn">사용법</button>
      </div>`;
  };

  const addListener = function () {
    element.querySelector('.header-menu').addEventListener('click', ({target}) => clickHandler(target));
    element.querySelector('#title-input').addEventListener('input', ({target}) => store.dispatch('updateTitle', target.value));
  };

  const subscribeEvent = function () {
    events.subscribe('choosePresentation', updateTitle.bind(this));
  };

  const clickHandler = function ({id}) {
    switch (id) {
      case 'save-btn': return store.dispatch('savePresentation');
      case 'reset-btn': return store.dispatch('createPresentation', {stateEvent: 'choosePresentation'});
      case 'archive-btn': return openArchiveModal();
      case 'usage-btn': return openUsageModal();
      default:
    }
  };

  const updateTitle = function () {
    element.querySelector('#title-input').value = state.title;
  };

  const openArchiveModal = function () {
    const archiveModal = new ArchiveModal();
    archiveModal.init();
    openModal();
  };

  const openUsageModal = function () {
    const usageModal = new UsageModal();
    usageModal.init();
    openModal();
  };

  const openModal = function () {
    store.dispatch('eventPublish', {stateEvent: 'openModal'});
  };

  this.init = function () {
    render();
    addListener();
    subscribeEvent();
  };
}
