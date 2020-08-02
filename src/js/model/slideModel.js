import convertStringToDOM from '../module/converter/convertStringToDOM';
import markupParser from '../module/parser/markupParser';
import {createSlideDOM} from '../Utils/DOMConstructor';
import {objDeepCopy} from '../Utils/objDeepCopyj';

function SlideModel () {
  const slides = {};
  let slideIDList = [];
  let slideKey = 0;
  let title = '';

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

  this.update = function (value) {
    const newSlideContentsDOM = convertStringToDOM(value);
    const newParsedSlide = markupParser(newSlideContentsDOM);
    this.setSlide(value, newSlideContentsDOM, newParsedSlide);
  };

  this.copy = function () {
    const {originalData, parsedSlide, slideContentsDOM} = this.getSlide();
    const ID = `slide-${++slideKey}`;
    const copySlideContentsDOM = slideContentsDOM.cloneNode(true);
    const copyParsedSlide = objDeepCopy(parsedSlide);
    const copySlideDOM = createSlideDOM(ID, copySlideContentsDOM);

    slides[ID] = {
      note: '',
      originalData,
      parsedSlide: copyParsedSlide,
      slideContentsDOM: copySlideContentsDOM,
      slideDOM: copySlideDOM,
    };

    this.slideSize += 1;
    this.currentSlideIndex += 1;

    slideIDList.splice(this.currentSlideIndex, 0, ID);
  };

  this.updateNote = function (value) {
    const slide = this.getSlide();
    slide.note = value;
  };

  this.updateTitle = function (value) {
    title = value;
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

  this.isSavedStorage = function () {
    const pt = localStorage.getItem('presentationOrder') || [];
    return pt.length;
  };

  this.save = function () {
    if (!title) return alert('제목을 입력해주세요.');

    const presentationOrder = JSON.parse(localStorage.getItem('presentationOrder')) || [];
    const order = presentationOrder.indexOf(title);
    if (order >= 0) presentationOrder.splice(order, 1);
    presentationOrder.push(title);

    const presentation = {
      slideIDList,
      slides: {},
      slideKey,
    };

    slideIDList.forEach(id => {
      const {note, originalData, parsedSlide, slideContentsDOM} = slides[id];
      presentation.slides[id] = {
        note,
        originalData,
        parsedSlide,
        slideContents: slideContentsDOM.innerHTML,
      };
    });

    localStorage.setItem('presentationOrder', JSON.stringify(presentationOrder));
    localStorage.setItem(title, JSON.stringify(presentation));
  };

  this.getStorageData = function (order) {
    const presentationOrder = JSON.parse(localStorage.getItem('presentationOrder'));
    title = presentationOrder[(order || presentationOrder.length - 1)];
    const presentation = JSON.parse(localStorage.getItem(title));

    /* eslint-disable prefer-destructuring */
    slideKey = presentation.slideKey;
    slideIDList = presentation.slideIDList;

    slideIDList.forEach(id => {
      const slide = presentation.slides[id];
      const slideContentsDOM = convertStringToDOM(slide.slideContents);
      const slideDOM = createSlideDOM(id, slideContentsDOM);
      slides[id] = {
        note: slide.note,
        originalData: slide.originalData,
        parsedSlide: slide.parsedSlide,
        slideContentsDOM,
        slideDOM,
      };
      this.slideSize += 1;
    });
    this.currentSlideIndex += 1;
    this.updateTitle(title);
  };
}

export default SlideModel;
