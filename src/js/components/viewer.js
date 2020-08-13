import Component from '../lib/component';
import store from '../store/store';

export default class Layout extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#viewer'),
    });
  }

  render () {
    this.element.innerHTML = `
    <div class="mode-change-btns">
      <button id="editor-view-btn" class="mode-change-btn active">에디터뷰</button>
      <button id="grid-view-btn" class="mode-change-btn">그리드뷰</button>
    </div>
    <div class="slide-viewer">
      <div id="slide-container"></div>
    </div>`;
  }
}

