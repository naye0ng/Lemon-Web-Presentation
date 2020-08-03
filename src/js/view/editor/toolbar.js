import View from '../view';
import {createCustomElement} from '../../Utils/DOMConstructor';

class Toolbar extends View {
  constructor () {
    super();

    this.$view = createCustomElement('div', {class: 'toolbar'});

    this.$focusButton = createCustomElement('div', {class: 'focus-btn'});
    this.$focusOnBeforeButton = createCustomElement('button', {id: 'before'});
    this.$focusOnNextButton = createCustomElement('button', {id: 'next'});

    this.$focusOnNthSlide = createCustomElement('div', {class: 'slide-number-wrap'});
    this.$inputNth = createCustomElement('input', {id: 'slide-number', type: 'number'});
    this.$focusOnNthSlide.append(this.$inputNth);
    this.$focusButton.append(this.$focusOnBeforeButton, this.$focusOnNthSlide, this.$focusOnNextButton);

    this.$slideCRUDButton = createCustomElement('div', {class: 'crud-btn'});
    this.$createButton = createCustomElement('button', {id: 'slide-create'}, '새 슬라이드');
    this.$copyButton = createCustomElement('button', {id: 'slide-copy'}, '복사');
    this.$deleteButton = createCustomElement('button', {id: 'slide-delete'}, '삭제');

    this.$slideCRUDButton.append(
      this.$createButton,
      this.$copyButton,
      this.$deleteButton
    );

    this.$slideController = createCustomElement('div', {class: 'slide-controller'});
    this.$slideController.append(this.$focusButton, this.$slideCRUDButton);

    // 에디터
    this.$editorTool = createCustomElement('div', {class: 'editor-tool'});
    this.$editorTool.innerHTML =
      '<div class="tag-helper">' +
      '<button id="slide-tag" class="tag-btn active">SLIDE</button>' +
      '<button id="title-tag" class="tag-btn">TITLE</button>' +
      '<button id="text-tag" class="tag-btn">TEXT</button>' +
      '<button id="list-tag" class="tag-btn">LIST</button>' +
      '<button id="image-tag" class="tag-btn">IMAGE</button>' +
      '</div>' +
      '<div class="attrs-editor">' +
      '<section>' +
      '<div id="bg-color"><p>배경색</p><input name="background-color" type="color"/></div>' +
      '<div id="width"><p>넓이(%)</p><input name="size" type="number" min="1" max="100" value="50"/></div>' +
      '<div id="height"><p>높이(%)</p><input name="size" type="number" min="1" max="100" placeholder="auto"/></div>' +
      '</section>' +
      '<section>' +
      '<div id="font-color"><p>글자색</p><input name="color" type="color"/></div>' +
      '<div id="text-size"><p>글자크기</p><input name="size" type="number" min="1" max="6" value="6"/></div>' +
      '<button name="italic"><i>Itaic</i></button>' +
      '<button name="bold"><b>Bold</b></button>' +
      '<button id="text-align" name="left">L</button>' +
      '<button id="text-align" name="center">M</button>' +
      '<button id="text-align" name="right">R</button>' +
      '</section>' +
      '</div>';

    this.$view.append(this.$slideController, this.$editorTool);
  }
}

export default Toolbar;
