const editorView = () => {
  const $editor = document.querySelector('#text-editor');
  let $note = null;
  let $slide = null;

  const render = () => {
    $editor.innerHTML = `
    <textarea name="slide" id="slide-text" placeholder="슬라이드를 입력하세요!" onkeydown="if(event.keyCode===9){var v=this.value,s=this.selectionStart,e=this.selectionEnd;this.value=v.substring(0, s)+'\t'+v.substring(e);this.selectionStart=this.selectionEnd=s+1;return false;}"></textarea>
    <textarea name="note" id="slide-note" placeholder="발표자 노트를 추가하려면 클릭하세요."></textarea>`;

    $note = $editor.querySelector('#slide-text');
    $slide = $editor.querySelector('#slide-note');
  };

  const updateNote = value => {
    $note.value = value || '';
  };

  const updateSlide = value => {
    $slide.value = value || '';
  };

  return {
    $editor,
    render,
    updateNote,
    updateSlide,
  };
};

export default editorView;
