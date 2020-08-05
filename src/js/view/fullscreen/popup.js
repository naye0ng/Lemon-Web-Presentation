
import View from '../view';
import {createCustomElement} from '../../Utils/DOMConstructor';

class Popup extends View {
  constructor (controller) {
    super();
    this.controller = controller;
    this.$popup = createCustomElement('div', {class: 'navigation'});
    this.$popup.innerHTML = '<div class="lemon-logo"></div><div><button id="before">이전</button><button id="next">다음</button></div>';
    this.init();
  }

  init () {
    this.initListeners();
  }

  initListeners () {
    this.$popup.addEventListener('click', ({target}) => this.controller.eventHandler(target));
  }
}

export default Popup;
