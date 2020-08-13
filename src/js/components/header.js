import Component from '../lib/component';
import store from '../store/store';
import Archive from './modal/archive';
import Usage from './modal/usage';

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
  }

  addListener () {
    this.element.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', ({target}) => {
        switch (target.id) {
          case 'save-btn': return this.savePresentation();
          case 'archive-btn': return this.openPresentationList();
          case 'reset-btn': return this.createPresentation();
          case 'usage-btn': return this.openUsageModal();
          default:
        }
      });
    });

    this.element.querySelector('input').addEventListener('input', ({target}) => store.dispatch('updateTitle', target.value));
  }

  // modal
  openModal () {
    const $modal = document.querySelector('#modal');
    $modal.classList.add('active');
  }

  openPresentationList () {
    const archive = new Archive();
    archive.render();
    this.openModal();
  }

  openUsageModal () {
    const usage = new Usage();
    usage.render();
    this.openModal();
  }

  // storage
  getStorageData (key) {
    return JSON.parse(this.storage[key] || null);
  }

  setStorageData (key, value) {
    this.storage[key] = JSON.stringify(value);
  }

  savePresentation () {
    const {title} = store.state;
    if (!title) return alert('제목을 입력하세요!');

    const presentationList = this.getStorageData('lemon_presentationList') || [];
    const order = presentationList.indexOf(`lemon_${title}`);

    if (order === -1) presentationList.push(`lemon_${title}`);

    const {slideIDList, slideKey, slides} = store.state;
    const presentation = {
      slideIDList,
      slideKey,
      slides: {},
    };

    slideIDList.forEach(id => {
      const {note, originalData, parsedSlide, slideDOM} = slides[id];
      presentation.slides[id] = {
        note,
        originalData,
        parsedSlide,
        slideDOM: slideDOM.outerHTML,
      };
    });

    this.setStorageData('lemon_presentationList', presentationList);
    this.setStorageData(`lemon_${title}`, presentation);
  }

  createPresentation () {
    // const response = confirm('새로운 프레젠테이션을 생성하시겠습니까?\n(현재 작업이 저장되지 않습니다.)');
    // if (!response) return;
    // resetPresentation();
    // 1.view 리셋하기, 2슬라이드 새로 생성
  }
}
