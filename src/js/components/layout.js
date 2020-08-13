import Component from '../lib/component';
import store from '../store/store';

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
  }

  addListener () {
    const $modal = this.element.querySelector('#modal');
    $modal.addEventListener('click', () => this.closeModal($modal));
  }

  closeModal ($modal) {
    $modal.classList.remove('active');
  }
}
