import Component from '../lib/component';
import store from '../store/store';

export default class Toolbar extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#toolbar'),
    });
  }

  render () {
    this.element.innerHTML = `
    <div class="slide-controller">
      <div class="focus-btns">
          <button id="before" class="before-btn"></button>
          <input type="number" id="slide-number" value="1" min="1" max="1">
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
}
