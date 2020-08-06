import {createElement} from '../Utils/DOMConstructor';

const editorView = () => {
  const $editorContainer = document.querySelector('.slide-editor');
  const $toolbar = createElement('div', {class: 'toolbar'});
  const $editor = createElement('div', {class: 'editor'});

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

    $editor.innerHTML = `
      <textarea id="raw-data" class="text-editor"></textarea>
      <textarea id="pt-note" class="text-editor" placeholder="발표자 노트를 추가하려면 클릭하세요."></textarea>`;
  };

  const bindToolbarEvent = (type, handler) => {
    $toolbar.addEventListener(type, ({target}) => handler(target));
  };

  const bindEditorEvent = (type, handler) => {
    $editor.addEventListener(type, ({target}) => handler(target));
  };


  return {
    render,
    bindToolbarEvent,
    bindEditorEvent,
  };
};


export default editorView;
