export default {
  slides: {},
  slideIDList: [],
  title: '',
  slideKey: 0,
  slideSize: 0,
  currentSlideIndex: -1,

  getSlide () {
    if (!this.slideSize) return null;
    return this.slides[this.slideIDList[this.currentSlideIndex]];
  },

  getSlideNode () {
    if (!this.slideSize) return null;
    return this.getSlide().$slide;
  },

  getNextSlideNode () {
    if (this.currentSlideIndex + 1 >= this.slideSize) return null;
    return this.slides[this.slideIDList[this.currentSlideIndex + 1]].$slide;
  },

  getSlideIndexByID (ID) {
    return this.slideIDList.indexOf(ID);
  },
};
