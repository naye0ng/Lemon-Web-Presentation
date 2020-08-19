import Component from '../lib/component';
import store from '../store/store';

export default class Editor extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#fullscreen'),
    });
  }

  render () {
    this.element.innerHTML = `
      <div id="fullscreen-menu">
        <div class="fullscreenn-controller">
          <button id="before2" class="before-btn"></button>
          <input id="slide-number2" type="number" max="1" min="1" value="1">
          <button id="next2" class="next-btn"></button>
        </div>
        <button id="pointer">포인터</button>
      </div>
      <div id="fullscreen-contents"></div>
      <div id="mouse-pointer"></div>`;

    this.subscribeEvent();

    // 방향키 이벤트 추가!!
  }

  subscribeEvent () {
    store.events.subscribe('startFullscreen', this.startFullscreen.bind(this));
  }

  startFullscreen () {
    this.renderSlides();
    this.element.requestFullscreen();
  }

  renderSlides () {
    const $slideContainer = this.element.querySelector('#fullscreen-contents');
    $slideContainer.innerHTML = '';

    const {slideIDList, currentSlideIndex, slideSize} = store.state;
    slideIDList.forEach(ID => {
      const $slide = store.state.getSlideNode(ID);
      $slideContainer.append($slide.cloneNode(true));
    });

    // TODO : 애니메이션!
    $slideContainer.style.width = `${100 * slideSize}vw`;
    this.updateSlideNumber(currentSlideIndex + 1, slideSize);
    // TODO : 모달 닫기
  }

  updateSlideNumber (value, max) {
    const $slideNumber = this.element.querySelector('#slide-number2');
    $slideNumber.value = value;
    $slideNumber.max = max;
  }
}
