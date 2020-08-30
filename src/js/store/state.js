export default {
  slides: {},
  slideIDList: [],
  title: '',
  slideKey: 0,
  slideSize: 0,
  currentSlideIndex: -1,
  ptIndex: -1,

  getSlide (ID) {
    if (!this.slideSize) return null;
    return this.slides[ID || this.slideIDList[this.currentSlideIndex]];
  },

  getSlideNode (ID) {
    if (!this.slideSize) return null;
    return this.getSlide(ID).$slide;
  },

  getNextSlideNode () {
    if (this.currentSlideIndex + 1 >= this.slideSize) return null;
    return this.slides[this.slideIDList[this.currentSlideIndex + 1]].$slide;
  },

  getSlideIndexByID (ID) {
    return this.slideIDList.indexOf(ID);
  },

  getPtSlide () {
    return this.slides[this.slideIDList[this.ptIndex]];
  },
};
