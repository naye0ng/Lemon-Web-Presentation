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
    this.currentSlideIndex = -1;

    this.init();
  }

  init () {
    // TODO : 슬라이드 예시 추가
    this.createNextSlide();
  }

  getCurrentSlide () {
    return this.slides[this.slideID[this.currentSlideIndex]];
  }

  updateView () {
    if (this.currentSlideIndex < 0) {
      this.view.editor.$textarea.value = '';
      this.view.toolbar.$inputNth.value = 0;
      // TODO : 슬라이드 추가하는 버튼 깜빡깜빡 효과!!
      return alert('슬라이드가 존재하지 않습니다.\n슬라이드를 생성해주세요!');
    }
    if (this.view.toolbar.$inputNth.value !== this.currentSlideIndex + 1) {
      this.view.toolbar.$inputNth.value = this.currentSlideIndex + 1;
    }
    this.view.editor.$textarea.value = this.getCurrentSlide().textareaValue;
  }

  createNextSlide () {
    const ID = `${Math.random()}`;
    const DOMTree = convertStringToDOM();
    const slide = markupParser(DOMTree);

    DOMTree.addEventListener('click', () => {
      this.focusOnNthSlide(this.slideID.indexOf(ID));
    });

    this.currentSlideIndex += 1;
    this.slideSize += 1;

    this.slides[ID] = {
      textareaValue: '',
      note: '',
      DOMTree,
      slide, //  TODO : 버튼으로 슬라이드 속성 변경
    };

    this.slideID.splice(this.currentSlideIndex, 0, ID);

    this.view.viewer.renderNthChild(DOMTree, this.view.viewer.$slideContainer, this.currentSlideIndex);
    this.updateView();
  }

  updateSlide (newTextareaValue) {
    if (this.currentSlideIndex < 0) {
      return this.updateView();
    }

    const {slide, DOMTree} = this.getCurrentSlide();
    const newSlide = markupParser(convertStringToDOM(newTextareaValue));
    const patch = updateVDOM(slide, newSlide);

    // TODO : 현재 커서 위치로 바꾸는 작업 필요(중간을 수정하는 경우에도 맨 아래를 보게됨)
    DOMTree.scrollTop = DOMTree.scrollHeight;
    this.getCurrentSlide().slide = newSlide;
    this.getCurrentSlide().textareaValue = newTextareaValue;
    patch(DOMTree);
  }

  deleteSlide () {
    if (this.currentSlideIndex < 0) return;

    const {DOMTree} = this.getCurrentSlide();
    DOMTree.remove();
    this.slides[this.slideID[this.currentSlideIndex]] = null;

    this.slideID.splice(this.currentSlideIndex, 1);
    this.currentSlideIndex -= 1;
    this.slideSize -= 1;

    this.updateView();
  }

  focusOnBeforeSlide () {
    if (this.currentSlideIndex <= 0) return;
    this.currentSlideIndex -= 1;
    this.updateView();
  }

  focusOnNextSlide () {
    if (this.currentSlideIndex >= this.slideSize - 1) return;
    this.currentSlideIndex += 1;
    this.updateView();
  }

  focusOnNthSlide (n) {
    if (n < 0 || n >= this.slideSize) return;
    this.currentSlideIndex = n;
    this.updateView();
  }

  // TODO : 드래그 이벤트로 changeSlideOrder 추가
}


export default SlideEditorController;

