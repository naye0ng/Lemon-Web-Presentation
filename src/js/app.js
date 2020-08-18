import '../../public/style.css';
// import {layoutView} from './view';
// import {editorController, fullscreenController} from './controller';
// import SlideModel from './model/slideModel';

// window.App = {
//   init () {
//     layoutView().render();

//     this.model = new SlideModel();
//     this.editorController = editorController(this.model);
//     this.fullscreenController = fullscreenController(this.model);

//     this.run();
//   },

//   run () {
//     this.editorController.init();
//     this.fullscreenController.init();
//   },
// };

import {Layout, Header, Viewer, Toolbar, Editor, Fullscreen} from './components';

window.App = {
  init () {
    const layout = new Layout();
    layout.render();

    this.run();
  },

  run () {
    const header = new Header();
    const viewer = new Viewer();
    const toolbar = new Toolbar();
    const editor = new Editor();
    const fullscreen = new Fullscreen();

    header.render();
    viewer.render();
    toolbar.render();
    editor.render();
    fullscreen.render();
  },
};
