
import View from './view';
import {createCustomElement} from '../Utils/DOMConstructor';

class NavigationView extends View {
  constructor (controller) {
    super();
    // 마크업
    this.controller = controller;
    this.$navigation = createCustomElement('div', {class: 'navigation'});
    this.$lemon = createCustomElement('div', {class: 'lemon-logo'});
    this.$navContents = createCustomElement('div');
    this.$fullscreenBtn = createCustomElement('button', {class: 'fullscreen-btn'}, '슬라이드 쇼');
    this.$fullscreenNthSlideBtn = createCustomElement('button', {class: 'fullscreen-btn'}, '현재 슬라이드부터 쇼');
    this.$navContents.append(this.$fullscreenBtn, this.$fullscreenNthSlideBtn);
    this.$navigation.append(this.$lemon, this.$navContents);
  }

  bind () {
    this.initListeners();
    this.render(this.$navigation);
  }

  initListeners () {
    this.$fullscreenBtn.addEventListener('click', () => this.controller.startFullscreen(false));
    this.$fullscreenNthSlideBtn.addEventListener('click', () => this.controller.startFullscreen(true));
  }
}

export default NavigationView;
