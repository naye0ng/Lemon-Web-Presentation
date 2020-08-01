
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
    this.$fullscreenBtn = createCustomElement('button', {id: 'start-fullscreen-0', class: 'fullscreen-btn'}, '슬라이드 쇼');
    this.$fullscreenNthSlideBtn = createCustomElement('button', {id: 'start-fullscreen-nth', class: 'fullscreen-btn'}, '현재 슬라이드부터 쇼');
    this.$navContents.append(this.$fullscreenBtn, this.$fullscreenNthSlideBtn);
    this.$navigation.append(this.$lemon, this.$navContents);
    this.init();
  }

  init () {
    this.initListeners();
    this.render(this.$navigation);
  }

  initListeners () {
    this.$navigation.addEventListener('click', ({target}) => this.requestFullscreen(target));
  }

  requestFullscreen ({id}) {
    if (!id) return;
    return this.controller.startFullscreen(id === 'start-fullscreen-nth');
  }
}

export default NavigationView;
