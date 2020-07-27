import SlideEditorController from './SlideEditorController';
import FullscreenModeController from './fullscreenModeController';
import NavigationView from '../view/navigationView';

class App {
  constructor () {
    this.view = new NavigationView(this);
    this.slideEditor = new SlideEditorController();
    this.fullscreen = new FullscreenModeController();
  }

  startFullscreen (isStatCurrentSlide) {
    if (this.slideEditor.slideSize === 0) return alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');
    if (!isStatCurrentSlide) return this.fullscreen.requestFullscreenMode(this.slideEditor.slides);
    return this.fullscreen.requestFullscreenMode(this.slideEditor.slides, this.slideEditor.editingSlideIndex);
  }
}

export default App;
