import '../../public/style.css';
import {Layout} from './components';

window.App = {
  init () {
    const layout = new Layout();
    layout.render();
  },
};
