import Component from '../lib/component';
import store from '../store/store';

export default class Editor extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#text-editor'),
    });
  }

  render () {
    this.element.innerHTML = `
      <textarea name="slide" spellcheck="false" id="slide-text" placeholder="슬라이드를 입력하세요!" onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}"></textarea>
      <textarea name="note" spellcheck="false" id="slide-note" placeholder="발표자 노트를 추가하려면 클릭하세요."></textarea>`;
    this.addListener();
    this.subscribeEvent();
  }

  subscribeEvent () {
    store.events.subscribe('createSlide', this.updateTextarea.bind(this));
    store.events.subscribe('focusOnSlide', this.updateTextarea.bind(this));
  }

  addListener () {
    this.element.addEventListener('input', ({target}) => this.inputHandler(target));
  }

  inputHandler (target) {
    if (!store.state.slideSize) {
      target.value = '';
      return alert('슬라이드를 생성해주세요!');
    }
    const {id, value} = target;
    switch (id) {
      case 'slide-text': return store.dispatch('updateSlide', {value});
      case 'slide-note': return store.dispatch('updateNote', {value});
      default:
    }
  }

  updateTextarea () {
    const {note, originalData} = this.store.state.getSlide();
    this.element.querySelector('#slide-text').value = originalData;
    this.element.querySelector('#slide-note').value = note;
  }
}
