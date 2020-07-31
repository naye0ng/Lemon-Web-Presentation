import View from './view';
import {createCustomElement} from '../Utils/DOMConstructor';

class FullscreenModeView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    this.$fullscreen = createCustomElement('div', {id: 'fullscreen'});
    this.$fullscreenMenu = createCustomElement('div', {id: 'fullscreen-menu'});
    this.$fullscreenContents = createCustomElement('div', {id: 'fullscreen-contents'});
    this.$fullscreen.append(this.$fullscreenMenu, this.$fullscreenContents);
    this.init();
  }

  init () {
    this.render(this.$fullscreen);
  }
}

export default FullscreenModeView;
