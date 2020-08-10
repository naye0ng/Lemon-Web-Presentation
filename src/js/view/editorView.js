import {createElement} from '../Utils/DOMConstructor';

const editorView = () => {
  const $editorContainer = document.querySelector('.slide-editor');
  const $toolbar = createElement('div', {class: 'toolbar'});
  const $editor = createElement('div', {class: 'editor'});

  const $textarea = createElement('textarea', {id: 'raw-data', class: 'text-editor', placeholder: '슬라이드를 작성하세요!'});
  const $noteTextarea = createElement('textarea', {id: 'pt-note', class: 'text-editor', placeholder: '발표자 노트를 추가하려면 클릭하세요.'});

  let $slideNumber = null;

  const render = function () {
    $editorContainer.append($toolbar, $editor);

    $toolbar.innerHTML = `
      <div class="slide-controller">
        <div class="focus-btn">
          <button id="before"></button><div class="slide-number-wrap">
            <input id="slide-number" type="number" max="1" min="1">
          </div><button id="next"></button>
        </div>
        <div class="crud-btn">
          <button id="slide-create">새 슬라이드</button><button id="slide-copy">복사</button><button id="slide-delete">삭제</button>
        </div>
      </div>`;

    $editor.append($textarea, $noteTextarea);
  };

  const bindToolbarEvent = (type, handler) => {
    $toolbar.addEventListener(type, ({target}) => handler(target));
  };

  const bindEditorEvent = (type, handler) => {
    $editor.addEventListener(type, ({target}) => handler(target));
  };

  // 이 아래부터는 util로 뺄 수 있을 듯!
  const updateNoteTextarea = value => {
    $noteTextarea.value = value;
  };
  const updateTextarea = value => {
    $textarea.value = value;
  };

  const updateSlideNumber = ({value, min, max}) => {
    if (!$slideNumber) $slideNumber = document.querySelector('#slide-number');
    if (value) $slideNumber.value = value;
    if (min) $slideNumber.min = min;
    if (max) $slideNumber.max = max;
  };

  return {
    render,
    bindToolbarEvent,
    bindEditorEvent,
    updateNoteTextarea,
    updateTextarea,
    updateSlideNumber,
  };
};


export default editorView;
