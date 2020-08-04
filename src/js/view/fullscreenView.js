import View from './view';
import {createCustomElement} from '../Utils/DOMConstructor';

class FullscreenView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    this.$fullscreen = createCustomElement('div', {id: 'fullscreen'});
    this.$fullscreen.innerHTML = '<div id="fullscreen-menu" class="active"><div class="fullscreen-toolber"><div class="slide-toolber"><button id="before"></button><div class="input-slide-number"><input id="show-slide-number" type="number" max="1" min="1" value="1"></div><button id="next"></button></div><button id="pointer">포인터</button><button id="helper">발표자 노트</button></div></div><div id="fullscreen-contents"></div><div id="mouse-pointer"></div>';
  }

  init () {
    this.initListeners();
    this.render(this.$fullscreen);
  }

  initListeners () {
    document.addEventListener('keyup', e => this.controller.documentEventHandler(e));
    document.addEventListener('mousemove', e => this.controller.documentEventHandler(e));
    document.addEventListener('mouseenter', e => this.controller.documentEventHandler(e));
    document.addEventListener('mouseleave', e => this.controller.documentEventHandler(e));
    this.$fullscreen.addEventListener('click', ({target}) => this.controller.eventHandler(target));
    this.$fullscreen.addEventListener('keyup', e => {
      e.stopPropagation();
      this.controller.eventHandler(e.target);
    });
  }
}

export default FullscreenView;
