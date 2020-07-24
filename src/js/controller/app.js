import SlideEditor from './SlideEditor';
import Fullscreen from './fullscreen';

class App {
  constructor () {
    this.slideEditor = new SlideEditor();
    this.fullscreen = new Fullscreen();
  }
}

export default App;
