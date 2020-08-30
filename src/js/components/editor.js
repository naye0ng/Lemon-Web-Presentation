import store from '../store/store';

export default function Editor () {
  const element = document.querySelector('#text-editor');
  const {state, events} = store;

  const render = function () {
    element.innerHTML = `
      <textarea name="slide" spellcheck="false" id="slide-text" placeholder="슬라이드를 입력하세요!"></textarea>
      <textarea name="note" spellcheck="false" id="slide-note" placeholder="발표자 노트를 추가하려면 클릭하세요."></textarea>`;
  };

  const subscribeEvent = function () {
    events.subscribe('updateSlide', updateTextarea.bind(this));
    events.subscribe('focusOnSlide', updateTextarea.bind(this));
    events.subscribe('choosePresentation', updateTextarea.bind(this));
  };

  const addListener = function () {
    element.addEventListener('input', ({target}) => inputHandler(target));
    element.addEventListener('keydown', e => keydownHandler(e));
  };

  const keydownHandler = function (e) {
    const {keyCode, target} = e;
    if (keyCode !== 9) return;
    e.preventDefault();
    const {value, selectionStart, selectionEnd} = target;
    target.value = `${value.substring(0, selectionStart)}\t${value.substring(selectionEnd)}`;
    target.selectionStart = selectionStart + 1;
    target.selectionEnd = selectionStart + 1;
  };

  const inputHandler = function (target) {
    if (!state.slideSize) {
      target.value = '';
      return alert('슬라이드를 생성해주세요!');
    }
    const {id, value} = target;
    switch (id) {
      case 'slide-text': return store.dispatch('updateSlide', {value});
      case 'slide-note': return store.dispatch('updateNote', {value});
      default:
    }
  };

  const updateTextarea = function () {
    const {note, originalData} = state.getSlide();
    element.querySelector('#slide-text').value = originalData;
    element.querySelector('#slide-note').value = note;
  };

  this.init = function () {
    render();
    addListener();
    subscribeEvent();
  };
}
