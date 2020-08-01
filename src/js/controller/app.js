import SlideModel from '../model/slideModel';
import EditorController from './EditorController';

const App = {
  init () {
    const model = new SlideModel();
    const editor = new EditorController(model);
    editor.init();
  },
};

export default App;
