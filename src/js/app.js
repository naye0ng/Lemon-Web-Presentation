import '../../public/style.css';
import {layoutView} from './view';
import {editorController, fullscreenController} from './controller';
import SlideModel from './model/slideModel';

window.App = {
  init () {
    layoutView().render();

    this.model = new SlideModel();
    this.editorController = editorController(this.model);
    this.fullscreenController = fullscreenController(this.model);

    this.run();
  },

  run () {
    this.editorController.init();
    this.fullscreenController.init();
  },
};
