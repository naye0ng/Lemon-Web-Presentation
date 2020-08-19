import Component from '../lib/component';
import store from '../store/store';
import {ArchiveModal, UsageModal} from './modal';

export default class Header extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#header'),
    });

    this.storage = localStorage;
  }

  render () {
    this.element.innerHTML = `
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

    this.addListener();
    this.subscribeEvent();
  }

  addListener () {
    this.element.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', ({target}) => this.clickHandler(target));
    });

    this.element.querySelector('input').addEventListener('input', ({target}) => store.dispatch('updateTitle', target.value));
  }

  clickHandler ({id}) {
    switch (id) {
      case 'save-btn': return store.dispatch('savePresentation');
      case 'reset-btn': return store.dispatch('createPresentation');
      case 'archive-btn': return this.openArchiveModal();
      case 'usage-btn': return this.openUsageModal();
      default:
    }
  }

  subscribeEvent () {
    store.events.subscribe('choosePresentation', this.updateTitle.bind(this));
  }

  updateTitle () {
    this.element.querySelector('#title-input').value = store.state.title;
  }

  openModal () {
    document.querySelector('#modal').classList.add('active');
  }

  openArchiveModal () {
    const archiveModal = new ArchiveModal();
    archiveModal.render();
    this.openModal();
  }

  openUsageModal () {
    const usageModal = new UsageModal();
    usageModal.render();
    this.openModal();
  }
}
