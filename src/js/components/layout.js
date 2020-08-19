import Component from '../lib/component';
import store from '../store/store';
import {Header, Viewer, Toolbar, Editor, Fullscreen} from './';
import {FullscreenModal} from './modal';

export default class Layout extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#app'),
    });
  }

  render () {
    this.element.innerHTML = `
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

    this.addListener();
    this.renderChild();
  }

  renderChild () {
    const header = new Header();
    const viewer = new Viewer();
    const toolbar = new Toolbar();
    const editor = new Editor();
    const fullscreen = new Fullscreen();

    header.render();
    viewer.render();
    toolbar.render();
    editor.render();
    fullscreen.render();
  }

  addListener () {
    this.element.querySelector('#fullscreen-btn').addEventListener('click', this.openFullscreenModal.bind(this));
    this.element.querySelector('#modal').addEventListener('click', ({target}) => this.closeModal(target));
  }

  closeModal (target) {
    if (target.id !== 'modal') return;
    return target.classList.remove('active');
  }

  openModal () {
    document.querySelector('#modal').classList.add('active');
  }

  openFullscreenModal () {
    if (!store.state.slideSize) return alert('슬라이드가 존재하지 않습니다.\n슬라이드를 만들어주세요!');
    const fullscreenModal = new FullscreenModal();
    fullscreenModal.render(store.state.slideSize);
    this.openModal();
  }
}
