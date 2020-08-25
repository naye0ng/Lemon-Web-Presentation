import {getStorageItem, setStorageItem, deleteStorageItem} from '../utils/storage';
import {customSyntaxParser, convertObjToDOM, convertslideStringToDOM} from '../module';

const getSlideHtmlText = ID => `
  <div id="${ID}" class="slide" draggable="true">
    <svg viewBox="0 0 1280 720" width="100%">
      <foreignObject width="1280" height="720">
      <div class="slide-contents"></div>
      </foreignObject>
    </svg>
  </div>`;

export default {
  createSlide (state, payload) {
    this.focusOutSlide(state);
    const ID = `slide-${++state.slideKey}`;

    if (payload.isCopy) {
      const {note, originalData} = state.getSlide();
      const $slide = state.getSlideNode().cloneNode(true);
      $slide.id = ID;

      state.slides[ID] = {note, originalData, $slide};
    } else {
      const [note, originalData] = ['', ''];
      const [$slide] = new DOMParser().parseFromString(getSlideHtmlText(ID), 'text/html').body.childNodes;
      state.slides[ID] = {note, originalData, $slide};
    }

    state.slideSize++;
    state.currentSlideIndex++;

    state.slideIDList.splice(state.currentSlideIndex, 0, ID);
    this.focusOnSlide(state);
  },

  deleteSlide (state, payload) {
    state.getSlideNode().remove();
    state.slideIDList.splice(state.currentSlideIndex, 1);
    state.slideSize--;

    if (!state.currentSlideIndex && state.slideSize > 0) {
      state.currentSlideIndex = 0;
    } else {
      state.currentSlideIndex -= 1;
    }
    this.focusOnSlide(state);
  },

  updateSlide (state, payload) {
    state.getSlide().originalData = payload.value;
    const [$slide] = new DOMParser().parseFromString(`<div class="slide-contents">${payload.value}</div>`, 'text/html').body.childNodes;
    state.getSlideNode().querySelector('.slide-contents')
      .replaceWith(convertObjToDOM(customSyntaxParser($slide)));
  },

  updateSlideAttribute (state, payload) {
    state.getSlideNode().style[payload.name] = payload.value;
  },

  updateNote (state, payload) {
    state.getSlide().note = payload.value;
  },

  updateTitle (state, payload) {
    state.title = payload;
  },

  updatePTIndex (state, payload) {
    state.ptIndex = payload.index;
  },

  focusOutSlide (state) {
    if (!state.slideSize) return;
    state.getSlideNode().classList.remove('active');
  },

  focusOnSlide (state) {
    if (!state.slideSize) return;
    state.getSlideNode().classList.add('active');
  },

  focusOnBeforeSlide (state) {
    this.focusOutSlide(state);
    state.currentSlideIndex--;
    this.focusOnSlide(state);
  },

  focusOnNextSlide (state) {
    this.focusOutSlide(state);
    state.currentSlideIndex++;
    this.focusOnSlide(state);
  },

  focusOnNthSlide (state, {slideIndex}) {
    this.focusOutSlide(state);
    state.currentSlideIndex = slideIndex;
    this.focusOnSlide(state);
  },

  savePresentation (state, {title}) {
    const presentationList = getStorageItem('presentationList') || [];
    const order = presentationList.indexOf(title);
    if (order === -1) presentationList.push(title);

    const {slideIDList, slideKey, slides, currentSlideIndex} = state;
    const presentation = {
      currentSlideIndex,
      slideIDList,
      slideKey,
      slides: {},
    };

    slideIDList.forEach(id => {
      const {$slide, note, originalData} = slides[id];
      presentation.slides[id] = {
        note,
        originalData,
        $slide: $slide.outerHTML,
      };
    });

    setStorageItem('presentationList', presentationList);
    setStorageItem(`${title}`, presentation);
  },

  createPresentation (state, payload) {
    state.slides = {};
    state.slideIDList = [];
    state.title = '';
    state.slideKey = 0;
    state.slideSize = 0;
    state.currentSlideIndex = -1;
    this.createSlide(state, payload);
  },

  deletePresentation (state, {title}) {
    deleteStorageItem(`${title}`);
    const presentationList = getStorageItem('presentationList') || [];
    presentationList.splice(presentationList.indexOf(title), 1);
    setStorageItem('presentationList', presentationList);
    deleteStorageItem(title);
  },

  renderPresentation (state, {title}) {
    const newSlide = getStorageItem(title);
    state.slideIDList = newSlide.slideIDList;
    state.slideKey = newSlide.slideKey;
    state.currentSlideIndex = newSlide.currentSlideIndex;
    state.title = title;
    state.slideSize = state.slideIDList.length;

    state.slides = {};
    state.slideIDList.forEach(id => {
      const {$slide, note, originalData} = newSlide.slides[id];
      state.slides[id] = {
        note,
        originalData,
        $slide: convertslideStringToDOM($slide),
      };
    });
  },

  eventPublish () {},
};
