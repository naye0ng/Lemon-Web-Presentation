
import View from '../view';
import {createCustomElement} from '../../Utils/DOMConstructor';
import {POPUP_STYLE, POPUP_HTML} from './contents';

class Popup extends View {
  constructor (controller) {
    super();
    this.controller = controller;
    this.$popup = createCustomElement('div', {class: 'navigation'});
    this.$popup.innerHTML = '<div class="lemon-logo"></div><div><button id="before">이전</button><button id="next">다음</button></div>';
    this.$popup.innerHTML = POPUP_HTML;
    this.style = createCustomElement('style');
    this.style.innerHTML = POPUP_STYLE;

    this.init();
  }

  init () {
    this.initListeners();
  }

  initListeners () {
    this.$popup.addEventListener('click', e => this.controller.eventHandler(e));
  }
}

export default Popup;
