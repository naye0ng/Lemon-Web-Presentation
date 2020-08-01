import SlideEditorView from '../view/slideEditorView';

class EditorController {
  constructor (model) {
    this.model = model;
    this.view = new SlideEditorView(this);
  }

  init () {
    this.createSlide();
  }

  deactivate () {
    const {slideDOM} = this.model.getSlide();
    slideDOM.classList.remove('active');
  }

  activate () {
    const {slideDOM} = this.model.getSlide();
    slideDOM.classList.add('active');
  }

  updateEditorView () {
    const {$PTNote, $rawData} = this.view.editor;
    const {$inputNth} = this.view.toolbar;
    const {slideSize, currentSlideIndex} = this.model;

    $inputNth.max = slideSize;

    if (!slideSize) {
      $PTNote.value = '';
      $rawData.value = '';
      $inputNth.value = 0;
      $inputNth.min = 0;
      return alert('슬라이드가 존재하지 않습니다.\n슬라이드를 생성해주세요!');
    }
    const {note, originalData} = this.model.getSlide();
    $PTNote.value = note;
    $rawData.value = originalData;
    $inputNth.value = currentSlideIndex + 1;
    $inputNth.min = 1;
  }

  updateView () {
    if (this.model.slideSize) this.activate();
    this.updateEditorView();
  }

  bindView () {
    const {slideDOM} = this.model.getSlide();
    const {viewer} = this.view;
    viewer.renderNthChild(slideDOM, viewer.$slideContainer, this.model.currentSlideIndex);
    this.addListeners(slideDOM);
    this.updateView();
  }


  createSlide () {
    if (this.model.slideSize) this.deactivate();
    this.model.create();
    this.bindView();
  }

  deleteSlide () {
    if (!this.model.slideSize) return;
    this.model.remove();
    this.updateView();
  }

  updateSlide (newData) {
    if (!this.model.slideSize) return this.updateView();
    this.model.update(newData);
  }

  updateNote (newData) {
    this.model.updateNote(newData);
  }

  focusOnBeforeSlide () {
    if (this.model.currentSlideIndex <= 0) return;
    this.deactivate();
    this.model.currentSlideIndex -= 1;
    this.updateView();
  }
  focusOnNextSlide () {
    if (this.model.currentSlideIndex >= this.model.slideSize - 1) return;
    this.deactivate();
    this.model.currentSlideIndex += 1;
    this.updateView();
  }
  focusOnNthSlide (n) {
    if (n < 0 || n >= this.model.slideSize) return;
    this.deactivate();
    this.model.currentSlideIndex = n;
    this.updateView();
  }

  addListeners (DOM) {
    DOM.addEventListener('drag', e => this.dragHandler(e));
    DOM.addEventListener('dragend', ({target}) => this.dragendHandler(target));
    DOM.addEventListener('click', ({target}) => {
      this.focusOnNthSlide(this.model.getSlideIndex(target.id));
    });
  }

  dragHandler ({target, clientX, clientY}) {
    target.classList.add('drag-active');
    const parent = target.parentNode;

    const swap = document.elementFromPoint(clientX, clientY);
    if (!swap) return;
    if (swap !== target && swap.classList[0] === 'slide') {
      this.swapSlideID(target.id, swap.id);
      parent.insertBefore(target, swap);
    }
  }

  dragendHandler (target) {
    target.classList.remove('drag-active');
  }

  swapSlideID (targetID, swapID) {
    this.deactivate();
    this.model.swapIndexOfID(targetID, swapID);
    this.updateView();
  }
}


export default EditorController;
