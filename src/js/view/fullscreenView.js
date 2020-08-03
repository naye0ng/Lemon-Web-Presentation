import View from './view';
import {createCustomElement} from '../Utils/DOMConstructor';

class FullscreenView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    this.$fullscreen = createCustomElement('div', {id: 'fullscreen'});
    this.$fullscreenMenu = createCustomElement('div', {id: 'fullscreen-menu'});
    this.$fullscreenContents = createCustomElement('div', {id: 'fullscreen-contents'});
    this.$fullscreen.append(this.$fullscreenMenu, this.$fullscreenContents);
  }

  bind () {
    this.initListeners();
    this.render(this.$fullscreen);
  }
  initListeners () {
    document.addEventListener('keydown', ({key}) => this.controller.arrowKeyHandler(key));
  }
}

export default FullscreenView;
