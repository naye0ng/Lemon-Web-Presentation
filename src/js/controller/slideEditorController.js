import SlideEditorView from '../view/slideEditorView';
import convertStringToDOM from '../module/converter/convertStringToDOM';
import markupParser from '../module/parser/markupParser';
import updateVDOM from '../module/DOM/updateDOM';

class SlideEditorController {
  constructor () {
    this.view = new SlideEditorView(this);

    this.slides = {};

    this.slideIDList = [];
    this.slideSize = 0;
    this.currentSlideIndex = -1;

    this.init();
  }

  init () {
    // TODO : 슬라이드 예
    this.createNextSlide();
  }

  getCurrentSlide () {
    return this.slides[this.slideIDList[this.currentSlideIndex]];
  }

  getSVGContainer (contents) {
    const SVGContainer = document.createElement('div');
    SVGContainer.setAttribute('class', 'slide');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 1280 720');
    svg.setAttribute('width', '100%');

    const foreign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject');
    foreign.setAttribute('width', '1280');
    foreign.setAttribute('height', '720');

    foreign.appendChild(contents);
    svg.append(foreign);
    SVGContainer.append(svg);

    return SVGContainer;
  }

  updateView () {
    if (!this.slideSize) {
      this.view.editor.$rawData.value = '';
      this.view.toolbar.$inputNth.value = 0;
      this.view.editor.$PTNote.value = '';
      // TODO : 슬라이드 추가하는 버튼 깜빡깜빡 효과!!
      return alert('슬라이드가 존재하지 않습니다.\n슬라이드를 생성해주세요!');
    }
    // 현재 슬라이드에 active 삽입
    const currentSlide = this.getCurrentSlide();
    this.slideActivate();
    this.view.editor.$PTNote.value = currentSlide.PTNote;
    this.view.toolbar.$inputNth.value = this.currentSlideIndex + 1;
    this.view.editor.$rawData.value = currentSlide.rawData;
  }

  createNextSlide () {
    const ID = `${Math.random()}`;
    const DOMTree = convertStringToDOM();
    const slideTree = this.getSVGContainer(DOMTree);
    const slide = markupParser(DOMTree);

    DOMTree.addEventListener('click', () => {
      this.focusOnNthSlide(this.slideIDList.indexOf(ID));
    });

    this.slides[ID] = {
      rawData: '',
      PTNote: '',
      slideTree,
      DOMTree,
      slide, //  TODO : 버튼으로 슬라이드 속성 변경
    };


    if (this.slideSize) {
      this.slideDeactivate();
    }

    this.currentSlideIndex += 1;
    this.slideSize += 1;

    this.slideIDList.splice(this.currentSlideIndex, 0, ID);
    this.view.viewer.renderNthChild(slideTree, this.view.viewer.$slideContainer, this.currentSlideIndex);
    this.updateView();
  }

  updatePTNote (newNote) {
    this.getCurrentSlide().PTNote = newNote;
  }

  updateSlide (newValue) {
    if (!this.slideSize) return this.updateView();

    const {slide, DOMTree} = this.getCurrentSlide();
    const newSlide = markupParser(convertStringToDOM(newValue));
    const patch = updateVDOM(slide, newSlide);

    // TODO : 현재 커서 위치로 바꾸는 작업 필요(중간을 수정하는 경우에도 맨 아래를 보게됨)
    DOMTree.scrollTop = DOMTree.scrollHeight;

    const currentSlide = this.getCurrentSlide();
    currentSlide.slide = newSlide;
    currentSlide.rawData = newValue;
    patch(DOMTree);
  }

  deleteSlide () {
    if (!this.slideSize) return;

    const {slideTree} = this.getCurrentSlide();
    slideTree.remove();
    this.slides[this.slideIDList[this.currentSlideIndex]] = null;
    this.slideIDList.splice(this.currentSlideIndex, 1);

    this.slideSize -= 1;

    if (!this.currentSlideIndex && this.slideSize > 0) {
      this.currentSlideIndex = 0;
    } else {
      this.currentSlideIndex -= 1;
    }

    this.updateView();
  }

  focusOnBeforeSlide () {
    if (this.currentSlideIndex <= 0) return;
    this.slideDeactivate();
    this.currentSlideIndex -= 1;
    this.updateView();
  }

  focusOnNextSlide () {
    if (this.currentSlideIndex >= this.slideSize - 1) return;
    this.slideDeactivate();
    this.currentSlideIndex += 1;
    this.updateView();
  }

  focusOnNthSlide (n) {
    if (n < 0 || n >= this.slideSize) return;
    this.slideDeactivate();
    this.currentSlideIndex = n;
    this.updateView();
  }

  slideDeactivate () {
    this.getCurrentSlide().slideTree.classList.remove('active');
  }

  slideActivate () {
    // + 현재 위치로 포커싱
    this.getCurrentSlide().slideTree.classList.add('active');
  }
  // TODO : 드래그 이벤트로 changeSlideOrder 추가
}


export default SlideEditorController;
