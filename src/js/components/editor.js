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
  }
}
