import {createElement} from '../Utils/DOMConstructor';

const viewerView = () => {
  const $viewer = document.body.querySelector('.slide-viewer');
  const $viewerModeChangeBtns = createElement('div', {class: 'view-type-btns'});
  const $slideCarousel = createElement('div', {class: 'slide-carousel'});
  const $slideContainer = createElement('div', {class: 'slide-container'});
  const $editorViewBtn = createElement('button', {id: 'editor-view-btn', class: 'active'}, '에디터 뷰');
  const $gridViewBtn = createElement('button', {id: 'grid-view-btn'}, '그리드 뷰');

  const render = function () {
    $viewerModeChangeBtns.append($editorViewBtn, $gridViewBtn);

    $slideCarousel.append($slideContainer);
    $viewer.append($viewerModeChangeBtns, $slideCarousel);


    bindDropEvent();
    bindViewerModeChangeEvent();
  };

  const bindDropEvent = () => {
    $slideContainer.addEventListener('dragover', e => e.preventDefault());
  };

  const bindViewerModeChangeEvent = () => {
    $viewerModeChangeBtns.addEventListener('click', ({target}) => toogleViewerMode(target));
  };

  const toogleViewerMode = ({id, classList}) => {
    if (!id || classList.length) return;
    $editorViewBtn.classList.toggle('active');
    $gridViewBtn.classList.toggle('active');
    document.querySelector('.viewer-and-editor').classList.toggle('grid-mode');
  };

  return {
    render,
    toogleViewerMode,
    bindViewerModeChangeEvent,
  };
};

export default viewerView;
