import Component from '../lib/component';
import store from '../store/store';

export default class Editor extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#fullscreen'),
    });
  }

  render () {
    this.element.innerHTML = `
      <div id="fullscreen-menu">
        <div class="fullscreenn-controller">
          <button id="before2" class="before-btn"></button>
          <input id="slide-number2" type="number" max="1" min="1" value="1">
          <button id="next2" class="next-btn"></button>
        </div>
        <button id="pointer">포인터</button>
      </div>
      <div id="fullscreen-contents"></div>
      <div id="mouse-pointer"></div>`;
  }
}
