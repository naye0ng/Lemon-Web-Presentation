import SlideEditorView from '../view/slideEditorView';
import convertStringToDOM from '../module/converter/convertStringToDOM';
import markupParser from '../module/parser/markupParser';
import updateVDOM from '../module/vDOM/updateVDOM';

class SlideEditorController {
  constructor () {
    this.view = new SlideEditorView(this);
    this.editingSlideIndex = -1;

    this.slides = [];
    this.slideSize = 0;

    this.createSlide();
  }

  createSlide () {
    const textareaValue = '';
    const DOMTree = convertStringToDOM(textareaValue);
    const slide = markupParser(DOMTree);
    const note = '';

    this.slides.push({
      textareaValue,
      DOMTree,
      slide, // 슬라이드 속성변화는 여기!
      note,
    });

    this.editingSlideIndex = this.slideSize;
    this.slideSize += 1;

    this.view.$textarea.value = textareaValue;
    this.view.render(DOMTree, this.view.$viewer);
  }

  updateSlide (newTextareaValue) {
    const {slide, DOMTree} = this.slides[this.editingSlideIndex];
    const newSlide = markupParser(convertStringToDOM(newTextareaValue));
    const patch = updateVDOM(slide, newSlide);

    this.slides[this.editingSlideIndex].slide = newSlide;
    patch(DOMTree);
  }
}


export default SlideEditorController;

