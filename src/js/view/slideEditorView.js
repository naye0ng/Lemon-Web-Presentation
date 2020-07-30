import View from './view';
import Viewer from './slideEditor/viewer';
import Editor from './slideEditor/editor';
import Toolbar from './slideEditor/toolbar';

class SlideEditorView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    this.viewer = new Viewer();
    this.toolbar = new Toolbar();
    this.editor = new Editor();

    this.$editorWrapper = this.createElement('div', {class: 'slide-editor'});
    this.$editorWrapper.append(this.toolbar.$view, this.editor.$view);

    this.$slideEditor = this.createElement('div', {class: 'viewer-and-editor'});
    this.$slideEditor.append(this.viewer.$view, this.$editorWrapper);

    this.init();
  }

  init () {
    this.initListeners();
    this.render(this.$slideEditor);
  }

  initListeners () {
    this.editor.$view.addEventListener('keyup', ({target}) => {
      if (!target.id) return;
      if (target.id === 'raw-data') return this.controller.updateSlide(target.value);
      if (target.id === 'pt-note') return this.controller.updatePTNote(target.value);
    });
    this.viewer.$viewModeChangeBtn.addEventListener('click', ({target}) => {
      const {id, classList} = target;
      if (!id) return;
      if (id === 'editor-view-btn' && !classList.length) return this.toggleViewerMode();
      if (id === 'grid-view-btn' && !classList.length) return this.toggleViewerMode();
    });

    this.toolbar.$view.addEventListener('click', ({target}) => {
      if (!target.id) return;
      if (target.id === 'delete') return this.controller.deleteSlide();
      if (target.id === 'create') return this.controller.createNextSlide();
      if (target.id === 'before') return this.controller.focusOnBeforeSlide();
      if (target.id === 'next') return this.controller.focusOnNextSlide();
    });

    this.toolbar.$view.addEventListener('keyup', ({target}) => {
      if (!target.id) return;
      if (!target.id === 'slide-number') this.controller.focusOnNthSlide(target.value - 1);
    });
  }

  toggleViewerMode () {
    this.viewer.toggleViewerMode();
    this.$slideEditor.classList.toggle('grid-mode');
  }
}

export default SlideEditorView;
