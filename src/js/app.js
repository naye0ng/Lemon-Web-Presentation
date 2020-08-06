import '../css/style.css';
import {layoutView, navigationView, titlebarView, viewerView, editorView, fullscreenView, popupView} from './view';
import EditorController from './controller/EditorController';
import FullscreenController from './controller/fullscreenController';
import SlideModel from './model/slideModel';

const App = {
  init () {
    this.model = new SlideModel();

    layoutView().render();
    this.view = {
      navigation: navigationView(),
      fullscreen: fullscreenView(),
      titlebar: titlebarView(),
      viewer: viewerView(),
      editor: editorView(),
      popup: popupView(),
    };

    this.controller = {
      editor: new EditorController(this.model, this.view),
      fullscreen: new FullscreenController(this.model, this.view),
    };

    this.render();
  },

  render () {
    Object.values(this.view).forEach(view => view.render());
    Object.values(this.controller).forEach(controller => controller.init());
  },
};


App.init();
