import SlideEditorView from '../view/slideEditorView';
import convertStringToDOM from '../module/converter/convertStringToDOM';
import markupParser from '../module/parser/markupParser';
import updateVDOM from '../module/DOM/updateDOM';

class SlideEditorController {
  constructor () {
    this.view = new SlideEditorView(this);

    this.slides = {};
    this.slideID = [];
    this.slideSize = 0;

    this.editingSlideIndex = -1;

    this.init();
  }

  init () {
    this.reateNextSlide();
  }

  // createNextSlide
  reateNextSlide () {
    const ID = `${Math.random()}`;
    const DOMTree = convertStringToDOM();
    const slide = markupParser(DOMTree);

    DOMTree.addEventListener('click', () => {
      this.focusOnNthSlide(this.slideID.indexOf(ID));
    });

    this.editingSlideIndex += 1;
    this.slideSize += 1;

    this.slides[ID] = {
      textareaValue: '',
      note: '',
      DOMTree,
      slide, //  TODO : 버튼으로 슬라이드 속성변화 시키는 건 여기에 추가!
    };

    this.slideID.splice(this.editingSlideIndex, 0, ID);

    this.view.viewer.renderNthChild(DOMTree, this.view.viewer.$slideContainer, this.editingSlideIndex);
    this.updateTextareaValue();
  }

  updateTextareaValue () {
    if (this.editingSlideIndex < 0) {
      this.view.editor.$textarea.value = '';
      this.view.toolbar.$inputNth.value = 0;
      // TODO : 슬라이드 추가하는 버튼 깜빡깜빡 효과!!
      return;
    }
    if (this.view.toolbar.$inputNth.value !== this.editingSlideIndex + 1) {
      this.view.toolbar.$inputNth.value = this.editingSlideIndex + 1;
    }
    this.view.editor.$textarea.value = this.slides[this.slideID[this.editingSlideIndex]].textareaValue;
  }

  updateSlide (newTextareaValue) {
    if (this.editingSlideIndex < 0) {
      this.updateTextareaValue();
      return alert('슬라이드가 존재하지 않습니다.\n슬라이드를 생성해주세요!');
    }

    const {slide, DOMTree} = this.slides[this.slideID[this.editingSlideIndex]];
    const newSlide = markupParser(convertStringToDOM(newTextareaValue));
    const patch = updateVDOM(slide, newSlide);

    // TODO : 현재 커서 위치로 바꾸는 작업 필요(중간을 수정하는 경우에도 맨 아래를 보게됨)
    DOMTree.scrollTop = DOMTree.scrollHeight;
    this.slides[this.slideID[this.editingSlideIndex]].slide = newSlide;
    this.slides[this.slideID[this.editingSlideIndex]].textareaValue = newTextareaValue;
    patch(DOMTree);
  }

  deleteSlide () {
    if (this.editingSlideIndex < 0) return;

    const {DOMTree} = this.slides[this.slideID[this.editingSlideIndex]];
    DOMTree.remove();
    this.slides[this.slideID[this.editingSlideIndex]] = null;

    this.slideID.splice(this.editingSlideIndex, 1);
    this.editingSlideIndex -= 1;
    this.slideSize -= 1;

    this.updateTextareaValue();
  }

  focusOnBeforeSlide () {
    if (this.editingSlideIndex <= 0) return;
    this.editingSlideIndex -= 1;
    this.updateTextareaValue();
  }

  focusOnNextSlide () {
    if (this.editingSlideIndex >= this.slideSize - 1) return;
    this.editingSlideIndex += 1;
    this.updateTextareaValue();
  }

  focusOnNthSlide (n) {
    if (n < 0 || n >= this.slideSize) return;
    this.editingSlideIndex = n;
    this.updateTextareaValue();
  }

  // TODO : 드래그 이벤트로 changeSlideOrder 추가
}


export default SlideEditorController;

