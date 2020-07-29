import View from '../view';

class Toolbar extends View {
  constructor () {
    super();

    this.$view = this.createElement('div', {class: 'toolbar'});

    this.$focusButton = this.createElement('div', {class: 'focus-btn'});
    this.$focusOnBeforeButton = this.createElement('button', {id: 'before'});
    this.$focusOnNextButton = this.createElement('button', {id: 'next'});

    this.$focusOnNthSlide = this.createElement('div', {id: 'nth'});
    this.$inputNth = this.createElement('input', {type: 'number'});
    this.$focusOnNthSlide.append(this.$inputNth);
    this.$focusButton.append(this.$focusOnBeforeButton, this.$focusOnNthSlide, this.$focusOnNextButton);

    // TODO : 전체 페이지 개수 보이기
    this.$slideCRUDButton = this.createElement('div', {class: 'crud-btn'});
    this.$deleteButton = this.createElement('button', {id: 'delete'});
    this.$createButton = this.createElement('button', {id: 'create'});
    this.$saveButton = this.createElement('button', {id: 'save'});
    this.$slideCRUDButton.append(
      this.$deleteButton,
      this.$createButton,
      this.$saveButton
    );

    this.$view.append(this.$focusButton, this.$slideCRUDButton);
  }
}

export default Toolbar;
