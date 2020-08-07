import View from './view';
import {createCustomElement} from '../Utils/DOMConstructor';

class FullscreenView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    this.$fullscreen = createCustomElement('div', {id: 'fullscreen'});
    this.$fullscreenMenu = createCustomElement('div', {id: 'fullscreen-menu'});
    this.$fullscreenMenu.innerHTML = '<div class="fullscreen-toolber"><div class="slide-toolber"><button id="before"></button><div class="input-slide-number"><input id="pt-number" type="number" max="1" min="1" value="1"></div><button id="next"></button></div><button id="pointer">포인터</button><button id="helper">발표자 노트</button></div>';

    this.$fullscreenContents = createCustomElement('div', {id: 'fullscreen-contents'});
    this.$mousePointer = createCustomElement('div', {id: 'mouse-pointer'});
    this.$fullscreen.append(this.$fullscreenMenu, this.$fullscreenContents, this.$mousePointer);
  }

  init () {
    this.initListeners();
    this.render(this.$fullscreen);
  }

  initListeners () {
    this.$fullscreen.addEventListener('keyup', e => {
      e.stopPropagation();
      this.controller.eventHandler(e);
    });
    this.$fullscreen.addEventListener('mousemove', e => this.controller.eventHandler(e));
    this.$fullscreen.addEventListener('mouseenter', e => this.controller.eventHandler(e));
    this.$fullscreen.addEventListener('mouseleave', e => this.controller.eventHandler(e));
    this.$fullscreen.addEventListener('click', e => this.controller.eventHandler(e));
  }
}

export default FullscreenView;
