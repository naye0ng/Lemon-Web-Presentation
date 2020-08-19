import Component from '../lib/component';
import store from '../store/store';
import {rgbToHex} from '../utils/color';

export default class Toolbar extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#toolbar'),
    });

    this.subscribeEvent();
  }

  render () {
    this.element.innerHTML = `
    <div class="slide-controller">
      <div class="focus-btns">
          <button id="before" class="before-btn"></button>
          <input type="number" id="slide-number" min="0" max="0">
          <button id="next" class="next-btn"></button>
      </div>
      <div class="crud-btns">
          <button id="create">슬라이드 추가</button>
          <button id="copy">복사</button>
          <button id="delete">삭제</button>
      </div>
    </div>
    <div class="editor-controller">
      <div class="attribute-controller"></div>
    </div>`;

    this.addListener();
  }

  renderSlideAttribute (backgroundColor, color) {
    this.element.querySelector('.attribute-controller').innerHTML =
      `<div class="bg-color-btn">
        <label>배경 색</label>
        <input type="color" id="background-color" name="background-color" value="${backgroundColor || '#ffffff'}" />
      </div>
      <div class="font-color-btn">
        <label>글자 색</label>
        <input type="color" id="color" name="color" value="${color || '#333333'}" />
      </div>
      <div class="align-btns">
        <label>정렬</label>
        <button id="left" class="active" name="text-align" value="left"></button>
        <button id="middle" name="text-align" value="center"></button>
        <button id="right" name="text-align" value="right"></button>
      </div>`;
  }

  addListener () {
    this.element.addEventListener('click', ({target}) => this.clickHandler(target));
    this.element.addEventListener('input', ({target}) => this.inputHandler(target));
  }

  clickHandler ({id, value}) {
    switch (id) {
      case 'before': return store.dispatch('focusOnBeforeSlide', {stateEvent: 'focusOnSlide'});
      case 'next': return store.dispatch('focusOnNextSlide', {stateEvent: 'focusOnSlide'});
      case 'create': return store.dispatch('createSlide', {stateEvent: 'updateSlide'});
      case 'copy': return store.dispatch('createSlide', {stateEvent: 'updateSlide', isCopy: true});
      case 'delete': return store.dispatch('deleteSlide', {stateEvent: 'focusOnSlide'});
      case 'left':
      case 'middle':
      case 'right':
        return store.dispatch('updateSlideAttribute', {name: 'textAlign', value});
      default:
    }
  }

  inputHandler ({id, value}) {
    switch (id) {
      case 'slide-number':
        return store.dispatch('focusOnNthSlide', {
          stateEvent: 'focusOnSlide',
          slideIndex: value - 1,
        });
      case 'color':
        return store.dispatch('updateSlideAttribute', {
          name: 'color',
          value,
        });
      case 'background-color':
        return store.dispatch('updateSlideAttribute', {
          name: 'backgroundColor',
          value,
        });
      default:
    }
  }

  subscribeEvent () {
    store.events.subscribe('updateSlide', this.updateToolbar.bind(this));
    store.events.subscribe('focusOnSlide', this.updateToolbar.bind(this));
    store.events.subscribe('choosePresentation', this.updateToolbar.bind(this));
  }

  updateToolbar () {
    const {currentSlideIndex, slideSize} = store.state;
    const $slideNumberInput = this.element.querySelector('#slide-number');
    $slideNumberInput.value = currentSlideIndex + 1;
    $slideNumberInput.min = slideSize ? 1 : 0;
    $slideNumberInput.max = slideSize;

    const $slide = store.state.getSlideNode();
    if (!$slide) return;
    const {backgroundColor, color} = $slide.style;
    this.renderSlideAttribute(rgbToHex(backgroundColor), rgbToHex(color));
  }
}
