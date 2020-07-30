import View from '../view';

class Toolbar extends View {
  constructor () {
    super();

    this.$view = this.createElement('div', {class: 'toolbar'});

    this.$slideTitle = this.createElement('div', {class: 'pt-title-wrap'});
    this.$inputTitle = this.createElement('input', {id: 'pt-title', type: 'text', placeholder: '제목 없는 프레젠테이션'});
    this.$slideTitle.append(this.$inputTitle);

    this.$focusButton = this.createElement('div', {class: 'focus-btn'});
    this.$focusOnBeforeButton = this.createElement('button', {id: 'before'});
    this.$focusOnNextButton = this.createElement('button', {id: 'next'});

    this.$focusOnNthSlide = this.createElement('div', {class: 'slide-number-wrap'});
    this.$inputNth = this.createElement('input', {id: 'slide-number', type: 'number'});
    this.$focusOnNthSlide.append(this.$inputNth);
    this.$focusButton.append(this.$focusOnBeforeButton, this.$focusOnNthSlide, this.$focusOnNextButton);

    this.$slideCRUDButton = this.createElement('div', {class: 'crud-btn'});
    this.$createButton = this.createElement('button', {id: 'create'}, '새 슬라이드');
    this.$copyButton = this.createElement('button', {id: 'copy'}, '복사');
    this.$deleteButton = this.createElement('button', {id: 'delete'}, '삭제');
    this.$saveButton = this.createElement('button', {id: 'save'}, '저장');
    this.$slideCRUDButton.append(
      this.$createButton,
      this.$copyButton,
      this.$deleteButton,
      this.$saveButton
    );

    this.$slideController = this.createElement('div', {class: 'slide-controller'});
    this.$slideController.append(this.$focusButton, this.$slideCRUDButton);

    this.$view.append(this.$slideTitle, this.$slideController);
  }
}

export default Toolbar;
