import View from '../view';
import {createCustomElement} from '../../Utils/DOMConstructor';

class Viewer extends View {
  constructor () {
    super();

    this.$view = createCustomElement('div', {class: 'slide-viewer'});
    this.$viewModeChangeBtn = createCustomElement('div', {class: 'view-type-btns'});
    this.$editorViewBtn = createCustomElement('button', {id: 'editor-view-btn', class: 'active'}, '에디터 뷰');
    this.$gridViewBtn = createCustomElement('button', {id: 'grid-view-btn'}, '그리드 뷰');
    this.$viewModeChangeBtn.append(this.$editorViewBtn, this.$gridViewBtn);
    this.$slideContainer = createCustomElement('div', {class: 'slide-container'});
    this.$slideCarousel = createCustomElement('div', {class: 'slide-carousel'});
    this.$slideCarousel.append(this.$slideContainer);
    this.$view.append(this.$viewModeChangeBtn, this.$slideCarousel);

    this.init();
  }

  init () {
    this.initListeners();
  }

  initListeners () {
    this.$slideContainer.addEventListener('dragover', e => e.preventDefault());
  }

  toggleViewerButton () {
    this.$editorViewBtn.classList.toggle('active');
    this.$gridViewBtn.classList.toggle('active');
  }
}

export default Viewer;
