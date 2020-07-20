import Presentation from './Presentation/presentation';
import Fullscreen from './Fullscreen/fullscreen';

import '../css/common.css';
import '../css/lemon.css';

document.addEventListener('DOMContentLoaded', () => {
  const presentation = new Presentation();

  // eslint-disable-next-line no-new
  new Fullscreen(presentation);
});
