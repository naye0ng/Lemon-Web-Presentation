import {convertStringToDOM, convertslideStrToSlideDOM} from '../module/converter/convertStringToDOM';
import convertObjToDOM from '../module/converter/convertObjToDOM';
import markupParser from '../module/parser/markupParser';
import {createSlideDOM} from '../Utils/DOMConstructor';
import {objDeepCopy} from '../Utils/objDeepCopyj';

function SlideModel () {
  const storage = localStorage;

  let slides = {};
  let slideIDList = [];
  let title = '';
  let slideKey = 0;

  this.slideSize = 0;
  this.currentSlideIndex = -1;


  this.reset = function () {
    slides = {};
    slideIDList = [];
    title = '';
    slideKey = 0;

    this.slideSize = 0;
    this.currentSlideIndex = -1;
  };

  this.getSlideByIndex = function (index) {
    return this.getSlide(this.getSlideID(index));
  };

  this.getSlide = function (ID) {
    return slides[ID || slideIDList[this.currentSlideIndex]];
  };

  this.getSlideIDList = function () {
    return slideIDList;
  };

  this.getSlideID = function (index) {
    return slideIDList[index];
  };

  this.getTitle = function () {
    return title;
  };

  this.getSlideOrder = function (ID) {
    return slideIDList.indexOf(ID);
  };

  this.setSlideIDList = function (newSlideIDList) {
    slideIDList = newSlideIDList;
  };

  this.setSlideKey = function (newSlideKey) {
    slideKey = newSlideKey;
  };

  // 여기서부터 빼자!
  this.updateSlideContents = function (originalData, parsedSlide, slideContentsDOM) {
    const slide = this.getSlide();
    slide.parsedSlide = parsedSlide;
    slide.slideContentsDOM = slideContentsDOM;
    slide.originalData = originalData;

    slide.slideDOM.querySelector('.slide-contents').replaceWith(slideContentsDOM);
  };

  this.createSlide = function () {
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

  this.updateSlide = function (originalData) {
    const newParsedSlide = markupParser(convertStringToDOM(originalData));
    const newSlideContentsDOM = convertObjToDOM(newParsedSlide);
    this.updateSlideContents(originalData, newParsedSlide, newSlideContentsDOM);
  };

  this.deleteSlide = function () {
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

  this.copySlide = function () {
    const {originalData, parsedSlide, slideContentsDOM, slideDOM} = this.getSlide();
    const ID = `slide-${++slideKey}`;

    const copySlideContentsDOM = slideContentsDOM.cloneNode(true);
    const copyParsedSlide = objDeepCopy(parsedSlide);
    const copySlideDOM = createSlideDOM(ID, copySlideContentsDOM);
    copySlideDOM.style.cssText = slideDOM.style.cssText;

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

  this.getStorageData = function (key) {
    return JSON.parse(storage[key] || null);
  };

  this.setStorageData = function (key, value) {
    storage[key] = JSON.stringify(value);
  };

  this.isStorageEmpty = function () {
    return !(this.getStorageData('lemon_presentationList') || []).length;
  };

  this.deletePresentation = function (key) {
    storage.removeItem(`lemon_${key}`);
    const presentationList = this.getStorageData('lemon_presentationList');
    presentationList.splice(presentationList.indexOf(`lemon_${key}`), 1);
    this.setStorageData('lemon_presentationList', presentationList);
  };

  this.savePresentation = function () {
    if (!title) return false;
    const presentationList = this.getStorageData('lemon_presentationList') || [];
    const order = presentationList.indexOf(`lemon_${title}`);
    if (order >= 0) presentationList.splice(order, 1);
    presentationList.push(`lemon_${title}`);

    const presentation = {
      slideIDList,
      slides: {},
      slideKey,
    };

    slideIDList.forEach(id => {
      const {note, originalData, parsedSlide, slideDOM} = slides[id];
      presentation.slides[id] = {
        note,
        originalData,
        parsedSlide,
        slideDOM: slideDOM.outerHTML,
      };
    });

    this.setStorageData('lemon_presentationList', presentationList);
    this.setStorageData(`lemon_${title}`, presentation);
    return true;
  };

  this.getPresentation = function (selectedTitle) {
    title = selectedTitle;
    const PT = this.getStorageData(`lemon_${title}`);

    this.setSlideIDList(PT.slideIDList);
    this.setSlideKey(PT.slideKey);

    slideIDList.forEach(id => {
      const slide = PT.slides[id];
      const slideDOM = convertslideStrToSlideDOM(slide.slideDOM);
      const slideContentsDOM = slideDOM.querySelector('.slide-contents');

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
