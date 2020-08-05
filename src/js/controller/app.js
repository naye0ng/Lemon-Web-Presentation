import SlideModel from '../model/slideModel';
import EditorController from './editorController';
import FullscreenController from './fullscreenController';

const App = {
  init () {
    this.model = new SlideModel();
    this.editorController = new EditorController(this.model);
    this.fullscreenController = new FullscreenController(this.model);

    this.run();
  },
  run () {
    this.fullscreenController.initNavigationView();
    this.editorController.init();
    this.fullscreenController.init();
  },
};

export default App;
