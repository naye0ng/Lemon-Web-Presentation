import Component from '../../lib/component';
import store from '../../store/store';

export default class Archive extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#modal'),
    });
  }

  render () {
    this.element.innerHTML = `
      <div id="archive-modal" class=" modal">
        <div class="archive-header">
          <div class="title">Archive</div>
          <div class="subtitle">파일을 클릭하여 저징된 프레젠테이션을 불러올 수 있습니다.</div>
        </div>
        <div class="archive-list"></div>
      </div>`;

    this.addListener();
  }

  renderArchiveItem (title) {
    const item = `
      <div class="archive-item" title="${title}">
        <div class="archive-title" title="${title}">${title}</div>
        <button id="delete-item" title="${title}">삭제</button>
      </div>`;

    this.element.querySelector('.archive-list').insertAdjacentHTML('beforeend', item);
  }

  addListener () {
    this.element.querySelector('.archive-list').addEventListener('click', ({target}) => {
      const title = target.getAttribute('title');
      if (title && target.id !== 'delete-item') return store.dispatch('renderPresentation', {title});
      return store.dispatch('deletePresentation', {title});
    });
  }
}
