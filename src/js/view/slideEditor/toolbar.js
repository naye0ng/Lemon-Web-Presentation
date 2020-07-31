import View from '../view';
import {createCustomElement} from '../../Utils/DOMConstructor';

class Toolbar extends View {
  constructor () {
    super();

    this.$view = createCustomElement('div', {class: 'toolbar'});

    this.$slideTitle = createCustomElement('div', {class: 'pt-title-wrap'});
    this.$inputTitle = createCustomElement('input', {id: 'pt-title', type: 'text', placeholder: '제목 없는 프레젠테이션'});
    this.$slideTitle.append(this.$inputTitle);

    this.$focusButton = createCustomElement('div', {class: 'focus-btn'});
    this.$focusOnBeforeButton = createCustomElement('button', {id: 'before'});
    this.$focusOnNextButton = createCustomElement('button', {id: 'next'});

    this.$focusOnNthSlide = createCustomElement('div', {class: 'slide-number-wrap'});
    this.$inputNth = createCustomElement('input', {id: 'slide-number', type: 'number'});
    this.$focusOnNthSlide.append(this.$inputNth);
    this.$focusButton.append(this.$focusOnBeforeButton, this.$focusOnNthSlide, this.$focusOnNextButton);

    this.$slideCRUDButton = createCustomElement('div', {class: 'crud-btn'});
    this.$createButton = createCustomElement('button', {id: 'create'}, '새 슬라이드');
    this.$copyButton = createCustomElement('button', {id: 'copy'}, '복사');
    this.$deleteButton = createCustomElement('button', {id: 'delete'}, '삭제');
    this.$saveButton = createCustomElement('button', {id: 'save'}, '저장');
    this.$slideCRUDButton.append(
      this.$createButton,
      this.$copyButton,
      this.$deleteButton,
      this.$saveButton
    );

    this.$slideController = createCustomElement('div', {class: 'slide-controller'});
    this.$slideController.append(this.$focusButton, this.$slideCRUDButton);

    this.$view.append(this.$slideTitle, this.$slideController);
  }
}

export default Toolbar;
