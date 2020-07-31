import SlideEditorController from './SlideEditorController';
import FullscreenModeController from './fullscreenModeController';
import NavigationView from '../view/navigationView';

const App = {
  init () {
    this.view = new NavigationView(this);
    this.slideEditor = new SlideEditorController();
    this.fullscreen = new FullscreenModeController();
  },

  startFullscreen (isStatCurrentSlide) {
    const {slides, slideIDList, slideSize, currentSlideIndex} = this.slideEditor;
    if (slideSize === 0) return alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');
    if (!isStatCurrentSlide) return this.fullscreen.requestFullscreenMode(slides, slideIDList);
    return this.fullscreen.requestFullscreenMode(slides, slideIDList, currentSlideIndex);
  },
};

export default App;