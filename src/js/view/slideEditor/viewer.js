import View from '../view';

class Viewer extends View {
  constructor () {
    super();

    this.$view = this.createElement('div', {class: 'slide-viewer'});
    this.$viewModeChangeBtn = this.createElement('div', {class: 'view-type-btns'});
    this.$editorViewBtn = this.createElement('button', {id: 'editor-view-btn', class: 'active'}, '에디터 뷰');
    this.$gridViewBtn = this.createElement('button', {id: 'grid-view-btn'}, '그리드 뷰');
    this.$viewModeChangeBtn.append(this.$editorViewBtn, this.$gridViewBtn);
    this.$slideContainer = this.createElement('div', {class: 'slide-container'});
    this.$slideCarousel = this.createElement('div', {class: 'slide-carousel'});
    this.$slideCarousel.append(this.$slideContainer);
    this.$view.append(this.$viewModeChangeBtn, this.$slideCarousel);
  }

  toggleViewerMode () {
    this.$editorViewBtn.classList.toggle('active');
    this.$gridViewBtn.classList.toggle('active');
  }
}

export default Viewer;
