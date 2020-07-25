import SlideEditorView from '../view/slideEditorView';
import convertStringToDOM from '../module/converter/convertStringToDOM';
import markupParser from '../module/parser/markupParser';
import updateVDOM from '../module/vDOM/updateVDOM';

class SlideEditorController {
  constructor () {
    this.view = new SlideEditorView(this);

    this.slides = [];
    this.slidesID = [];
    this.slideSize = 0;

    this.editingSlideIndex = -1;
    this.createSlide();
  }

  createSlide () {
    const ID = `${Math.random()}`;
    const DOMTree = convertStringToDOM();
    const slide = markupParser(DOMTree);

    DOMTree.addEventListener('click', () => {
      this.focusOnNthSlide(this.slidesID.indexOf(ID));
    });

    this.editingSlideIndex += 1;
    this.slideSize += 1;

    this.slides.splice(this.editingSlideIndex, 0, {
      textareaValue: '',
      note: '',
      DOMTree,
      slide, //  TODO : 버튼으로 슬라이드 속성변화 시키는 건 여기?
    });

    this.slidesID.splice(this.editingSlideIndex, 0, ID);
    this.view.viewer.render(DOMTree, this.view.viewer.$slideContainer, this.editingSlideIndex);
    this.changeTextareaValue();
  }

  updateSlide (newTextareaValue) {
    if (this.editingSlideIndex < 0) {
      this.changeTextareaValue();
      return alert('슬라이드가 존재하지 않습니다.\n슬라이드를 생성해주세요!');
    }

    const {slide, DOMTree} = this.slides[this.editingSlideIndex];
    const newSlide = markupParser(convertStringToDOM(newTextareaValue));
    const patch = updateVDOM(slide, newSlide);

    this.slides[this.editingSlideIndex].slide = newSlide;
    this.slides[this.editingSlideIndex].textareaValue = newTextareaValue;
    patch(DOMTree);
  }

  deleteSlide () {
    if (this.editingSlideIndex < 0) return;
    const [{DOMTree}] = this.slides.splice(this.editingSlideIndex, 1);
    this.slidesID.splice(this.editingSlideIndex, 1);
    this.editingSlideIndex -= 1;
    DOMTree.remove();
    this.changeTextareaValue();
  }

  focusOnBeforeSlide () {
    if (this.editingSlideIndex <= 0) return;
    this.editingSlideIndex -= 1;
    this.changeTextareaValue();
  }

  focusOnNextSlide () {
    if (this.editingSlideIndex >= this.slideSize - 1) return;
    this.editingSlideIndex += 1;
    this.changeTextareaValue();
  }

  focusOnNthSlide (n) {
    if (n < 0 || n >= this.slideSize) return;
    this.editingSlideIndex = n;
    this.changeTextareaValue();
  }

  changeTextareaValue () {
    if (this.editingSlideIndex < 0) {
      this.view.editor.$textarea.value = '';
      // TODO : 슬라이드 추가하는 버튼 깜빡깜빡 효과!!
      return;
    }
    this.view.editor.$textarea.value = this.slides[this.editingSlideIndex].textareaValue;
  }

  // TODO : 드래그 이벤트로 changeSlideOrder 추가
}


export default SlideEditorController;

