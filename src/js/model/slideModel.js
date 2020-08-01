import convertStringToDOM from '../module/converter/convertStringToDOM';
import markupParser from '../module/parser/markupParser';
import {createSlideDOM} from '../Utils/DOMConstructor';

function SlideModel () {
  const slides = {};
  const slideIDList = [];
  let slideKey = 0;
  this.slideSize = 0;
  this.currentSlideIndex = -1;

  this.getSlideIDList = function () {
    return slideIDList;
  };

  this.getSlideIndex = function (ID) {
    return slideIDList.indexOf(ID);
  };

  this.getSlideByID = function (ID) {
    return slides[ID];
  };

  this.getSlide = function () {
    return slides[slideIDList[this.currentSlideIndex]];
  };

  this.setSlide = function (originalData, slideContentsDOM, parsedSlide) {
    const slide = this.getSlide();
    slide.parsedSlide = parsedSlide;
    slide.slideContentsDOM = slideContentsDOM;
    slide.originalData = originalData;

    // TODO: 분리하자!
    slide.slideDOM.firstChild.firstChild.firstChild.replaceWith(slideContentsDOM);
  };

  this.create = function () {
    const ID = `slide-${++slideKey}`;
    const slideContentsDOM = convertStringToDOM();
    const parsedSlide = markupParser(slideContentsDOM);
    const slideDOM = createSlideDOM(ID, slideContentsDOM);

    slides[ID] = {
      note: '',
      originalData: '',
      parsedSlide,
      slideContentsDOM,
      slideDOM,
    };

    this.slideSize += 1;
    this.currentSlideIndex += 1;

    slideIDList.splice(this.currentSlideIndex, 0, ID);
  };

  this.remove = function () {
    const {slideDOM} = this.getSlide();
    slideDOM.remove();
    slideIDList.splice(this.currentSlideIndex, 1);
    this.slideSize -= 1;

    if (!this.currentSlideIndex && this.slideSize > 0) {
      this.currentSlideIndex = 0;
    } else {
      this.currentSlideIndex -= 1;
    }
  };

  this.update = function (newData) {
    const newSlideContentsDOM = convertStringToDOM(newData);
    const newParsedSlide = markupParser(newSlideContentsDOM);
    this.setSlide(newData, newSlideContentsDOM, newParsedSlide);
  };

  this.updateNote = function (newData) {
    const slide = this.getSlide();
    slide.note = newData;
  };

  this.swapIndex = function (targetIndex, swapIndex) {
    const targetID = slideIDList[targetIndex];
    if (targetIndex < swapIndex) {
      slideIDList.splice(swapIndex + 1, 0, targetID);
      slideIDList.splice(targetIndex, 1);
    } else {
      slideIDList.splice(targetIndex, 1);
      slideIDList.splice(swapIndex, 0, targetID);
    }

    this.currentSlideIndex = swapIndex;
  };
}

export default SlideModel;
