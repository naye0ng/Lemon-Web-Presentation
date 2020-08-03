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
    // if (!this.model.isStorageEmpty()) {
    //   const response = confirm('최근 작성한 프레젠테이션을 불러올까요?');
    //   if (response) return this.bindStorageSlide();
    // }
    return this.createSlide();
  }

  slideDeactivate () {
    const {slideDOM} = this.model.getSlide();
    slideDOM.classList.remove('active');
  }

  slideActivate () {
    const {slideDOM} = this.model.getSlide();
    slideDOM.classList.add('active');
  }

  resetPreview () {
    const {$slideContainer} = this.view.viewer;
    $slideContainer.innerHTML = '';
    this.updateView();
  }

  resetView () {
    this.model.reset();
    this.resetPreview();
    this.updateTitleView();
  }

  updateView () {
    if (this.model.slideSize) this.slideActivate();
    this.updateEditorView();
    this.updateSelectView();
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
      // return alert('슬라이드가 존재하지 않습니다.\n슬라이드를 생성해주세요!');
      return;
    }
    const {note, originalData} = this.model.getSlide();
    $PTNote.value = note;
    $rawData.value = originalData;
    $inputNth.value = currentSlideIndex + 1;
    $inputNth.min = 1;
  }

  updateSelectView () {
    const presentations = this.model.getStorageData('presentationList');
    const {$selectSavedFile} = this.view.titlebar;
    let selectOptions = '<option value="">저장된 프레젠테이션 목록</option>';
    presentations.forEach(title => {
      selectOptions += `<option value="${title}">${title}</option>`;
    });
    $selectSavedFile.innerHTML = selectOptions;
  }

  updateTitleView () {
    const {$inputTitle} = this.view.titlebar;
    $inputTitle.value = this.model.getTitle();
  }

  bindStorageSlide (value) {
    this.model.getPresentation(value);
    this.renderStorageSlide();
  }

  renderStorageSlide () {
    const slideIDList = this.model.getSlideIDList();
    const {viewer} = this.view;
    slideIDList.forEach(id => {
      const {slideDOM} = this.model.getSlide(id);
      viewer.$slideContainer.append(slideDOM);
      this.setDraggerbleSlide(slideDOM);
    });
    this.updateTitleView();
    this.updateView();
  }

  renderSlide () {
    const {slideDOM} = this.model.getSlide();
    const {viewer} = this.view;
    viewer.renderNthChild(slideDOM, viewer.$slideContainer, this.model.currentSlideIndex);
    this.setDraggerbleSlide(slideDOM);
    this.updateView();
  }

  createSlide () {
    if (this.model.slideSize) this.slideDeactivate();
    this.model.createSlide();
    this.renderSlide();
    // TODO: 현재 슬라이드 위치에 스크롤 포커싱!
  }

  deleteSlide () {
    if (!this.model.slideSize) return;
    this.model.deleteSlide();
    this.updateView();
  }

  updateSlide (newData) {
    if (!this.model.slideSize) return this.updateView();
    this.model.updateSlide(newData);
  }

  copySlide () {
    if (!this.model.slideSize) return this.updateView();
    this.slideDeactivate();
    this.model.copySlide();
    this.renderSlide();
  }

  updateNote (value) {
    this.model.updateNote(value);
  }

  updateTitle (value) {
    this.model.updateTitle(value);
  }

  resetPresentation () {
    this.resetView();
    this.createSlide();
  }

  createPresentation () {
    const response = confirm('프레젠테이션을 새로 생성하면 현재 작업이 저장되지 않습니다.\n작업중인 슬라이드를 저장하겠습니까?');
    if (!response) return this.resetPresentation();
    this.savePresentation(true);
  }

  savePresentation (reset) {
    if (!this.model.slideSize) return this.updateView();
    if (!this.model.savePresentation()) return alert('제목을 입력해주세요.');
    alert('프레젠테이션이 저장되었습니다.');
    if (reset) return this.resetPresentation();
    this.updateView();
  }

  deletePresentation () {
    const response = confirm('저장된 기록이 모두 삭제됩니다. 정말 삭제하시겠습니까?');
    if (!response) return;
    localStorage.clear();
    this.resetView();
  }

  selectPresentation ({value}) {
    if (!value || value === this.model.getTitle()) return;
    this.model.reset();
    this.resetPreview();
    this.updateTitleView();
    this.bindStorageSlide(value);
  }


  focusOnBeforeSlide () {
    if (this.model.currentSlideIndex <= 0) return;
    this.slideDeactivate();
    this.model.currentSlideIndex -= 1;
    this.updateView();
  }
  focusOnNextSlide () {
    if (this.model.currentSlideIndex >= this.model.slideSize - 1) return;
    this.slideDeactivate();
    this.model.currentSlideIndex += 1;
    this.updateView();
  }
  focusOnNthSlide (n) {
    if (n < 0 || n >= this.model.slideSize) return;
    this.slideDeactivate();
    this.model.currentSlideIndex = n;
    this.updateView();
  }

  setDraggerbleSlide (DOM) {
    // TODO: 이벤트 위임
    DOM.addEventListener('drag', e => this.dragHandler(e));
    DOM.addEventListener('dragend', ({target}) => this.dragendHandler(target));
    DOM.addEventListener('click', ({target}) => {
      this.focusOnNthSlide(this.model.getSlideOrder(target.id));
    });
  }

  dragHandler ({target, clientX, clientY}) {
    target.classList.add('drag-active');
    const parent = target.parentNode;

    const swap = document.elementFromPoint(clientX, clientY);
    if (!swap) return;
    if (swap !== target && swap.classList[0] === 'slide') {
      const targetIndex = this.model.getSlideOrder(target.id);
      const swapIndex = this.model.getSlideOrder(swap.id);

      if (targetIndex < swapIndex) {
        parent.insertBefore(target, swap.nextSibling);
      } else {
        parent.insertBefore(target, swap);
      }

      this.slideDeactivate();
      this.model.swapIndex(targetIndex, swapIndex);
      this.updateView();
    }
  }

  dragendHandler (target) {
    target.classList.remove('drag-active');
  }
}


export default EditorController;
