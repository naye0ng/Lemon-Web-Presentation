const editorView = () => {
  const $editor = document.querySelector('.editor');

  let $textarea = null;
  let $noteTextarea = null;


  const render = function () {
    $editor.innerHTML = `
      <textarea id="raw-data" class="text-editor" placeholder="슬라이드를 작성하세요!"></textarea>
      <textarea id="pt-note" class="text-editor" placeholder="발표자 노트를 추가하려면 클릭하세요."></textarea>
      `;
  };

  const bindEditorEvent = (type, handler) => {
    $editor.addEventListener(type, ({target}) => handler(target));
  };

  const getNoteTextarea = () => {
    if ($noteTextarea) return;
    $noteTextarea = document.querySelector('#pt-note');
  };

  const getTextarea = () => {
    if ($textarea) return;
    $textarea = document.querySelector('#raw-data');
  };

  const updateNoteTextarea = value => {
    getNoteTextarea();
    $noteTextarea.value = value;
  };
  const updateTextarea = value => {
    getTextarea();
    $textarea.value = value;
  };


  return {
    render,
    bindEditorEvent,
    updateNoteTextarea,
    updateTextarea,
  };
};


export default editorView;
