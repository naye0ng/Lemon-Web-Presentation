import store from '../../store/store';
import {getStorageItem} from '../../utils/storage';

export default function ArchiveModal () {
  const element = document.querySelector('#modal');
  const {state, events} = store;

  const render = function () {
    element.innerHTML = `
      <div id="archive-modal" class=" modal">
        <div class="archive-header">
          <div class="title">Archive</div>
          <div class="subtitle">파일을 클릭하여 저징된 프레젠테이션을 불러올 수 있습니다.</div>
        </div>
        <div class="archive-list"></div>
      </div>`;
  };

  const addListener = function () {
    element.querySelector('.archive-list').addEventListener('click', ({target}) => clickHandler(target));
  };

  const clickHandler = function (target) {
    const title = target.getAttribute('title');
    if (target.id === 'delete-item') return store.dispatch('deletePresentation', {stateEvent: 'updatePresentationList', title});
    if (title && title !== state.title) return store.dispatch('renderPresentation', {stateEvent: 'choosePresentation', title});
  };

  const subscribeEvent = function () {
    events.subscribe('updatePresentationList', updatePresentationList.bind(this));
  };

  const updatePresentationList = function () {
    element.querySelector('.archive-list').innerHTML = '';
    const presentationList = getStorageItem('presentationList') || [];
    presentationList.forEach(title => renderArchiveItem(title));
  };

  const renderArchiveItem = function (title) {
    const item = `
      <div class="archive-item" title="${title}">
        <div class="archive-title" title="${title}">${title}</div>
        <button id="delete-item" title="${title}">삭제</button>
      </div>`;

    element.querySelector('.archive-list').insertAdjacentHTML('beforeend', item);
  };

  this.init = function () {
    render();
    addListener();
    subscribeEvent();
    updatePresentationList();
  };
}
