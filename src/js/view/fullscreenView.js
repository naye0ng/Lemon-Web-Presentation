import View from './view';
import {createCustomElement} from '../Utils/DOMConstructor';

class FullscreenView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    this.$fullscreen = createCustomElement('div', {id: 'fullscreen'});
    this.$fullscreen.innerHTML = '<div id="fullscreen-menu" class="active"><div class="fullscreen-toolber"><div class="slide-toolber"><button id="before"></button><div class="input-slide-number"><input id="show-slide-number" type="number" max="1" min="1" value="1"></div><button id="next"></button></div><button id="pointer">포인터</button><button id="helper">발표자 노트</button></div></div><div id="fullscreen-contents"></div>';
  }

  init () {
    this.initListeners();
    this.render(this.$fullscreen);
  }

  initListeners () {
    document.addEventListener('keydown', ({key}) => this.controller.arrowKeyHandler(key));
    this.$fullscreen.addEventListener('click', ({target}) => this.controller.eventHandler(target));
  }
}

export default FullscreenView;
