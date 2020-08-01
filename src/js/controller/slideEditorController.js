import SlideEditorView from '../view/slideEditorView';
import convertStringToDOM from '../module/converter/convertStringToDOM';
import markupParser from '../module/parser/markupParser';
// import updateDOM from '../module/DOM/updateDOM';
import {createCustomElement, createSVGElement} from '../Utils/DOMConstructor';

class SlideEditorController {
  constructor () {
    this.view = new SlideEditorView(this);

    this.slides = {};
    this.slideSize = 0;

    this.slideIDList = [];
    this.selectedSlideIndex = -1;

    this.init();
  }

  init () {
    // TODO : 첫 화면 구성
    this.createSlide();
  }

  getSelectedSlide () {
    return this.slides[this.slideIDList[this.selectedSlideIndex]];
  }

  getSlideIDIndex (ID) {
    return this.slideIDList.indexOf(ID);
  }

  slideDeactivate () {
    this.getSelectedSlide().slideTree.classList.remove('active');
  }

  slideActivate () {
    // TODO: 현재 위치로 포커싱
    this.getSelectedSlide().slideTree.classList.add('active');
  }

  swapSlideID (targetID, swapID) {
    this.slideDeactivate();
    const targetIndex = this.getSlideIDIndex(targetID);
    const swapIndex = this.getSlideIDIndex(swapID);
    [this.slideIDList[targetIndex], this.slideIDList[swapIndex]] =
      [this.slideIDList[swapIndex], this.slideIDList[targetIndex]];
    this.selectedSlideIndex = swapIndex;
    this.updateView();
  }

  dragHandler ({target, clientX, clientY}) {
    const parentEl = target.parentNode;
    target.classList.add('drag-active');

    let swapItem = document.elementFromPoint(clientX, clientY);
    if (!swapItem) return;
    if (swapItem !== target && swapItem.classList[0] === 'slide') {
      this.swapSlideID(target.id, swapItem.id);
      swapItem = swapItem !== target.nextSibling ? swapItem : swapItem.nextSibling;
      parentEl.insertBefore(target, swapItem);
    }
  }

  dragendHandler (target) {
    target.classList.remove('drag-active');
  }

  createDraggableSlide (id, childEl) {
    const foreign = createSVGElement('http://www.w3.org/2000/svg', 'foreignObject', {
      width: '1280',
      height: '720',
    }, childEl);

    const svg = createSVGElement('http://www.w3.org/2000/svg', 'svg', {
      viewBox: '0 0 1280 720',
      width: '100%',
    }, foreign);

    const draggableSlide = createCustomElement('div', {
      id,
      class: 'slide',
      draggable: true,
    }, svg);


    draggableSlide.addEventListener('drag', e => this.dragHandler(e));
    draggableSlide.addEventListener('dragend', ({target}) => this.dragendHandler(target));

    return draggableSlide;
  }

  updateViewContents (rawData, PTNote) {
    this.view.editor.$rawData.value = rawData || '';
    this.view.editor.$PTNote.value = PTNote || '';

    this.view.toolbar.$inputNth.value = this.slideSize ? this.selectedSlideIndex + 1 : 0;
    this.view.toolbar.$inputNth.min = this.slideSize ? 1 : 0;
    this.view.toolbar.$inputNth.max = this.slideSize;
  }

  updateView () {
    if (!this.slideSize) {
      this.updateViewContents();
      // TODO : 슬라이드 추가하는 버튼 깜빡깜빡 효과!!
      return alert('슬라이드가 존재하지 않습니다.\n슬라이드를 생성해주세요!');
    }

    this.slideActivate();
    const {rawData, PTNote} = this.getSelectedSlide();
    this.updateViewContents(rawData, PTNote, this.selectedSlideIndex + 1);
  }

  updatePTNote (newNote) {
    this.getSelectedSlide().PTNote = newNote;
  }

  updateSlide (newValue) {
    if (!this.slideSize) return this.updateView();
    const newDOMTree = convertStringToDOM(newValue);
    const newSlide = markupParser(newDOMTree);


    const targetSlide = this.getSelectedSlide();
    targetSlide.slide = newSlide;
    targetSlide.rawData = newValue;
    targetSlide.DOMTree = newDOMTree;
    targetSlide.slideTree.firstChild.firstChild.firstChild.replaceWith(newDOMTree);

    /* 그동안 즐거웠어... 안녕!
    const newSlide = markupParser(convertStringToDOM(newValue));
    const patch = updateDOM(slide, newSlide);
    const targetSlide = this.getSelectedSlide();
    targetSlide.slide = newSlide;
    targetSlide.rawData = newValue;
    patch(DOMTree);
    */

    // TODO : 현재 커서 위치로 바꾸는 작업 필요(중간을 수정하는 경우에도 맨 아래를 보게됨)
    // DOMTree.scrollTop = DOMTree.scrollHeight;
  }

  createSlide () {
    const ID = `${Math.random()}`;
    const DOMTree = convertStringToDOM();
    const slide = markupParser(DOMTree);
    const slideTree = this.createDraggableSlide(ID, DOMTree);
    // 여기도 이제 안녕!!
    slideTree.addEventListener('click', () => this.focusOnNthSlide(this.slideIDList.indexOf(ID)));

    this.slides[ID] = {
      rawData: '',
      PTNote: '',
      slide, //  TODO : 버튼으로 슬라이드 속성 변경
      slideTree,
      DOMTree,
    };


    if (this.slideSize) {
      this.slideDeactivate();
    }

    this.selectedSlideIndex += 1;
    this.slideSize += 1;

    this.slideIDList.splice(this.selectedSlideIndex, 0, ID);
    this.view.viewer.renderNthChild(slideTree, this.view.viewer.$slideContainer, this.selectedSlideIndex);
    this.updateView();
  }

  deleteSlide () {
    if (!this.slideSize) return;

    let targetSlide = this.getSelectedSlide();
    targetSlide.slideTree.remove();
    targetSlide = null;
    this.slideIDList.splice(this.selectedSlideIndex, 1);

    this.slideSize -= 1;

    if (!this.selectedSlideIndex && this.slideSize > 0) {
      this.selectedSlideIndex = 0;
    } else {
      this.selectedSlideIndex -= 1;
    }

    this.updateView();
  }

  focusOnBeforeSlide () {
    if (this.selectedSlideIndex <= 0) return;
    this.slideDeactivate();
    this.selectedSlideIndex -= 1;
    this.updateView();
  }

  focusOnNextSlide () {
    if (this.selectedSlideIndex >= this.slideSize - 1) return;
    this.slideDeactivate();
    this.selectedSlideIndex += 1;
    this.updateView();
  }

  focusOnNthSlide (n) {
    if (n < 0 || n >= this.slideSize) return;
    this.slideDeactivate();
    this.selectedSlideIndex = n;
    this.updateView();
  }
}


export default SlideEditorController;
