import '../../public/style.css';
import {layoutView} from './view';
import {EditorController, FullscreenController} from './controller';
import SlideModel from './model/slideModel';

const App = {
  init () {
    layoutView().render();

    this.model = new SlideModel();
    this.editorController = new EditorController(this.model);
    this.fullscreenController = new FullscreenController(this.model);

    this.run();
  },
  run () {
    this.editorController.init();
    this.fullscreenController.init();
  },
};

export default App;
