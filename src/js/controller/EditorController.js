import {headerView, viewerView, toolbarView, editorView, archiveView, modalView} from '../view';

const editorController = model => {
  const header = headerView();
  const viewer = viewerView();
  const toolbar = toolbarView();
  const editor = editorView();
  let archive = null;

  const init = () => {
    renderView();
    bindEventHandler();
    createSlide();
    model.initPresentation();
  };

  const renderView = () => {
    header.render();
    viewer.render();
    toolbar.render();
    editor.render();
  };

  const bindEventHandler = () => {
    header.$header.addEventListener('click', ({target}) => headerEvent(target));
    header.$header.addEventListener('input', ({target}) => headerEvent(target));

    viewer.$viewer.addEventListener('click', ({target}) => viewerEvent(target));
    viewer.$viewer.querySelector('#slide-container').addEventListener('dragover', e => e.preventDefault());

    toolbar.$toolbar.addEventListener('click', ({target}) => toolbarClickEvent(target));
    toolbar.$toolbar.addEventListener('input', ({target}) => toolbarInputEvent(target));

    editor.$editor.addEventListener('input', ({target}) => editorEvent(target));
  };

  const archiveEvent = target => {
    const title = target.getAttribute('title');
    const {id} = target;
    if (!title) return;
    if (!id) return renderPresentation(title);
    return deletePresentation(title);
  };

  const headerEvent = target => {
    const {id, value} = target;
    switch (id) {
      case 'save-btn': return savePresentation();
      case 'archive-btn': return openPresentationList(target);
      case 'reset-btn': return createPresentation();
      case 'usage-btn': return openUsageModal();
      case 'title-input': return updateTitle(value);
      default:
    }
  };

  const viewerEvent = ({id, classList}) => {
    switch (id) {
      case 'editor-view-btn':
      case 'grid-view-btn':
        return toggleViewerMode(id, classList);
      default:
    }
  };

  const toolbarClickEvent = target => {
    switch (target.id) {
      case 'before': return focusOnBeforeSlide();
      case 'next': return focusOnNextSlide();
      case 'create': return createSlide();
      case 'copy': return copySlide();
      case 'delete': return deleteSlide();
      case 'left':
      case 'middle':
      case 'right':
        return updateAttribute(target);
      default:
    }
  };

  const toolbarInputEvent = target => {
    switch (target.id) {
      case 'slide-number': return focusOnNthSlide(target.value - 1);
      case 'color':
      case 'background-color':
        return updateAttribute(target);
      default:
    }
  };

  const editorEvent = ({id, value}) => {
    switch (id) {
      case 'slide-text': return updateSlide(value);
      case 'slide-note': return updateNote(value);
      default:
    }
  };

  const activateModal = () => {
    const $modal = document.querySelector('#modal');
    $modal.classList.add('active');
    $modal.classList.add('dark');
  };

  const openUsageModal = () => {
    modalView().renderUsageModal();
    document.querySelector('#github').addEventListener('click', ({target}) => {
      if (target.id !== 'github') return;
      window.open('https://github.daumkakao.com/kelley-j/Lemon-Presentation', '_blank');
    });
    activateModal();
  };

  const toggleViewerMode = (id, classList) => {
    if (classList.length === 2) return;
    viewer.$viewer.querySelector('#editor-view-btn').classList.toggle('active');
    viewer.$viewer.querySelector('#grid-view-btn').classList.toggle('active');
    document.querySelector('#main').classList.toggle('grid-mode');
  };

  const activateSlide = () => {
    const {slideDOM} = model.getSlide();
    slideDOM.classList.add('active');
  };

  const deactivateSlide = () => {
    const {slideDOM} = model.getSlide();
    slideDOM.classList.remove('active');
  };

  const rgbToHex = rgbText => {
    if (!rgbText) return;
    const rgb = rgbText.replace(/[^%,.\d]/g, '').split(',');
    const hex = rgb.map(dec => {
      const hexColor = parseInt(dec).toString(16);
      if (hexColor.length < 2) return `0${parseInt(dec).toString(16)}`;
      return parseInt(dec).toString(16);
    });
    return `#${hex.join('')}`;
  };

  const updateToolbarView = (backgroundColor, color) => {
    toolbar.renderSlideAttribute(rgbToHex(backgroundColor), rgbToHex(color));
  };

  const updateViewerView = notMoveScroll => {
    const {slideSize, currentSlideIndex} = model;
    const {updateSlide, updateNote} = editor;
    const {updateSlideNumber} = toolbar;

    if (!slideSize) {
      updateSlide();
      updateNote();
      updateSlideNumber({value: 0, min: 0, max: 0});
      toolbar.resetSlideAttribute();
      return;
    }
    const {note, originalData, slideDOM} = model.getSlide();
    updateSlide(note);
    updateNote(originalData);
    updateSlideNumber({value: currentSlideIndex + 1, min: 1, max: slideSize});
    const {backgroundColor, color} = slideDOM.style;
    updateToolbarView(backgroundColor, color);

    if (!notMoveScroll) viewer.focusOnSlide(slideDOM.offsetTop, slideDOM.offsetBottom);
  };

  const resetView = () => {
    model.reset();
    viewer.reset();
    updateTitle('');
    updateView();
  };

  const updateView = (notMoveScroll = false) => {
    if (model.slideSize) activateSlide();
    updateViewerView(notMoveScroll);
    updatePresentationList();
  };

  const renderSlide = () => {
    const {slideDOM} = model.getSlide();
    viewer.renderNthChild(slideDOM, model.currentSlideIndex);
    setDraggerbleSlide(slideDOM);
    updateView();
  };

  const createSlide = () => {
    if (model.slideSize) deactivateSlide();
    model.createSlide();
    renderSlide();
  };

  const updateSlide = value => {
    // alert
    if (!model.slideSize) return updateView();
    model.updateSlide(value);
  };

  const copySlide = () => {
    if (!model.slideSize) return alert('복사할 수 있는 슬라이드가 존재하지 않습니다.');
    deactivateSlide();
    model.copySlide();
    renderSlide();
  };

  const deleteSlide = () => {
    if (!model.slideSize) return;
    model.deleteSlide();
    updateView();
  };

  const updateNote = value => {
    // alert
    if (!model.slideSize) return updateView();
    model.updateNote(value);
  };

  const updateAttribute = ({name, value}) => {
    if (!model.slideSize) return;
    const {slideDOM} = model.getSlide();
    slideDOM.style[name] = value;
  };

  const focusOnBeforeSlide = () => {
    if (model.currentSlideIndex <= 0) return;
    deactivateSlide();
    model.currentSlideIndex -= 1;
    updateView();
  };

  const focusOnNextSlide = () => {
    if (model.currentSlideIndex >= model.slideSize - 1) return;
    deactivateSlide();
    model.currentSlideIndex += 1;
    updateView();
  };

  const focusOnNthSlide = (n, notMoveScroll = false) => {
    if (n < 0 || n >= model.slideSize) return;
    deactivateSlide();
    model.currentSlideIndex = n;
    updateView(notMoveScroll);
  };

  const updateTitle = value => {
    model.updateTitle(value);
    updateTitleView();
  };

  const createPresentation = () => {
    const response = confirm('새로운 프레젠테이션을 생성하시겠습니까?\n(현재 작업이 저장되지 않습니다.)');
    if (!response) return;
    resetPresentation();
  };

  const savePresentation = reset => {
    // alert 발생
    if (!model.slideSize) return updateView();
    if (!model.savePresentation()) return alert('제목을 입력해주세요.');
    alert('프레젠테이션이 저장되었습니다.');
    if (reset) return resetPresentation();
    updateView();
  };

  const deletePresentation = title => {
    const response = confirm(`${title}을 삭제하시겠습니까?`);
    if (!response) return;
    model.deletePresentation(title);
    updatePresentationList();
    // TODO : 현재 프레젠테이션이 삭제된 경우?(제목이 같으면) 리셋!
  };


  const renderPresentation = title => {
    if (!title || title === model.getTitle()) return;
    resetView();
    // 스토리지 데이터 가져와서 바인딩
    model.getPresentation(title);
    renderStorageSlide(title);
  };

  const renderStorageSlide = title => {
    const slideIDList = model.getSlideIDList();
    slideIDList.forEach(id => {
      const {slideDOM} = model.getSlide(id);
      viewer.renderSlide(slideDOM);
      setDraggerbleSlide(slideDOM);
    });

    updateView();
    updateTitleView();
  };

  const updateTitleView = () => {
    const title = model.getTitle();
    header.$header.querySelector('#title-input').value = title;
  };


  const resetPresentation = () => {
    resetView();
    createSlide();
  };

  const updatePresentationList = () => {
    if (!document.querySelector('.archive-list')) return;
    archive.resetArchiveItem();
    const presentations = model.getStorageData('lemon_presentationList') || [];
    presentations.forEach(title => archive.renderArchiveItem(title.split('_')[1]));
  };

  const openPresentationList = () => {
    archive = archiveView();
    archive.render();
    activateModal();
    document.querySelector('.archive-list').addEventListener('click', ({target}) => archiveEvent(target));
    updatePresentationList();
  };

  const setDraggerbleSlide = DOM => {
    // TODO: 이벤트 위임
    DOM.addEventListener('drag', e => dragHandler(e));
    DOM.addEventListener('dragend', ({target}) => dragendHandler(target));
    DOM.addEventListener('click', ({target}) => {
      focusOnNthSlide(model.getSlideOrder(target.id), true);
    });
  };

  const dragHandler = ({target, clientX, clientY}) => {
    target.classList.add('drag-active');
    const parent = target.parentNode;

    const swap = document.elementFromPoint(clientX, clientY);
    if (!swap) return;
    if (swap !== target && swap.classList[0] === 'slide') {
      const targetIndex = model.getSlideOrder(target.id);
      const swapIndex = model.getSlideOrder(swap.id);

      if (targetIndex < swapIndex) {
        parent.insertBefore(target, swap.nextSibling);
      } else {
        parent.insertBefore(target, swap);
      }

      deactivateSlide();
      model.swapIndex(targetIndex, swapIndex);
      updateView();
    }
  };

  const dragendHandler = target => {
    target.classList.remove('drag-active');
  };

  return {
    init,
  };
};

export default editorController;
