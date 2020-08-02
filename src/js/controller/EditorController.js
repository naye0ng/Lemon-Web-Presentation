import EditorView from '../view/editorView';

class EditorController {
  constructor (model) {
    this.model = model;
    this.view = new EditorView(this);
  }

  init () {
    this.view.bind();
    this.run();
  }

  run () {
    if (this.model.isSavedStorage()) {
      const response = confirm('최근 작성한 프레젠테이션을 불러올까요?');
      if (response) return this.callSavedData();
    }
    return this.createSlide();
  }

  callSavedData () {
    this.model.getStorageData();
    this.bindSavedView();
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

  bindSavedView () {
    const slideIDList = this.model.getSlideIDList();
    const {viewer} = this.view;
    slideIDList.forEach(id => {
      const {slideDOM} = this.model.getSlideByID(id);
      viewer.$slideContainer.append(slideDOM);
      this.addListeners(slideDOM);
    });
    this.updateView();
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

  copySlide () {
    if (!this.model.slideSize) return this.updateView();
    this.deactivate();
    this.model.copy();
    this.bindView();
  }

  saveSlide () {
    if (!this.model.slideSize) return this.updateView();
    this.model.save();
  }
  updateNote (value) {
    this.model.updateNote(value);
  }

  updateTitle (value) {
    this.model.updateTitle(value);
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
      const targetIndex = this.model.getSlideIndex(target.id);
      const swapIndex = this.model.getSlideIndex(swap.id);

      if (targetIndex < swapIndex) {
        parent.insertBefore(target, swap.nextSibling);
      } else {
        parent.insertBefore(target, swap);
      }

      this.deactivate();
      this.model.swapIndex(targetIndex, swapIndex);
      this.updateView();
    }
  }

  dragendHandler (target) {
    target.classList.remove('drag-active');
  }
}


export default EditorController;
