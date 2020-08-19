import Component from '../lib/component';
import store from '../store/store';

export default class Layout extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#viewer'),
    });
  }

  render () {
    this.element.innerHTML = `
    <div class="mode-change-btns">
      <button id="editor-view-btn" class="mode-change-btn active">에디터뷰</button>
      <button id="grid-view-btn" class="mode-change-btn">그리드뷰</button>
    </div>
    <div class="slide-viewer">
      <div id="slide-container"></div>
    </div>`;

    this.addListener();
    this.subscribeEvent();
  }

  subscribeEvent () {
    store.events.subscribe('updateSlide', this.renderSlide.bind(this));
    store.events.subscribe('choosePresentation', this.renderPresentationSlide.bind(this));
  }

  renderSlide () {
    const $slide = store.state.getSlideNode();
    const $nextSlide = store.state.getNextSlideNode();
    if (!$slide) return;
    this.element.querySelector('#slide-container').insertBefore($slide, $nextSlide);
  }

  renderPresentationSlide () {
    const $slideContaioner = this.element.querySelector('#slide-container');
    $slideContaioner.innerHTML = '';

    store.state.slideIDList.forEach(ID => {
      const $slide = store.state.getSlideNode(ID);
      $slideContaioner.append($slide);
    });
  }

  addListener () {
    this.element.querySelectorAll('button').forEach(button => {
      button.addEventListener('click', ({target}) => this.toggleViewerMode(target));
    });

    this.element.querySelector('#slide-container').addEventListener('click', ({target}) => this.focusOnClickedSlide(target));
    // this.element.querySelector('#slide-container').addEventListener('dragover', e => e.preventDefault());
  }

  toggleViewerMode ({id, classList}) {
    if (classList.length === 2) return;
    this.element.querySelector('#editor-view-btn').classList.toggle('active');
    this.element.querySelector('#grid-view-btn').classList.toggle('active');
    document.querySelector('#main').classList.toggle('grid-mode');
  }

  focusOnClickedSlide ({id, classList}) {
    if (!classList.contains('slide')) return;
    return store.dispatch('focusOnNthSlide', {
      stateEvent: 'focusOnSlide',
      slideIndex: store.state.getSlideIndexByID(id),
    });
  }
}

