import SlideModel from '../model/slideModel';
import NavigationView from '../view/navigationView';
import EditorController from './editorController';
import FullscreenController from './fullscreenController';

const App = {
  init () {
    this.model = new SlideModel();
    this.editorController = new EditorController(this.model);
    this.fullscreenController = new FullscreenController(this.model);
    this.view = new NavigationView(this.fullscreenController);

    this.run();
  },
  run () {
    this.view.bind();
    this.editorController.init();
    this.fullscreenController.init();
  },
};

export default App;
