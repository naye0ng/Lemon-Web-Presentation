
import View from './view';
import {createCustomElement} from '../Utils/DOMConstructor';

class NavigationView extends View {
  constructor (controller) {
    super();
    this.controller = controller;
    this.$navigation = createCustomElement('div', {class: 'navigation'});
    this.$navigation.innerHTML = '<div class="lemon-logo"></div><div><button id="first-slide" class="fullscreen-btn">슬라이드 쇼</button><button id="current-slide" class="fullscreen-btn">현재 슬라이드부터 쇼</button><button id="helper-popup" class="fullscreen-btn">발표자 노트</button></div>';
  }

  init () {
    this.initListeners();
    this.render(this.$navigation);
  }

  initListeners () {
    this.$navigation.addEventListener('click', e => this.controller.eventHandler(e));
  }
}

export default NavigationView;
