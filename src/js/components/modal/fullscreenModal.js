import store from '../../store/store';
import {Popup} from '../';

export default function FullscreenModal () {
  const element = document.querySelector('#modal');
  const {state} = store;
  let popup = null;

  const render = function () {
    const {slideSize} = state;
    element.innerHTML = `
    <div id="presentation-modal" class="modal">
      <div class="title">👩🏻‍💻프레젠테이션 설정이 필요합니다. </div>
      <div class="subtitle">애니메이션과 시작 슬라이드 번호를 입력해주세요!</div>
      <div class="pt-slide-viewer"></div>
      <div class="input-slide-number">
          <label>✔️ 시작 슬라이드 번호 (총 ${slideSize}개) : </label>
          <input id="slide-number3" type="number" min="1" max="${slideSize}" value="1" />
      </div>
      <div class="select-animation">
          <label>✔️ 슬라이드 애니메이션 :</label>
          <select id="animation" name="animation">
              <option value="">효과 없음</option>
              <option value="horizontal">가로 슬라이드</option>
          </select>
      </div>
      <div class="helper">
          <p>발표 도구에서는 슬라이드 이동과 타이머, 발표 노트 보기 등을 활용할 수 있습니다.</p>
          <button id="popup">발표 도구 열기</button>
      </div>
      <div id="confirm">
          <button id="cancel">취소</button>
          <button id="show">슬라이드 쇼</button>
      </div>
    </div>`;
  };

  const renderSlides = function () {
    const $slideContainer = element.querySelector('.pt-slide-viewer');
    $slideContainer.innerHTML = '';
    const {$slide} = state.getPtSlide();
    $slideContainer.append($slide.cloneNode(true));
  };

  const addListener = function () {
    element.querySelector('#presentation-modal').addEventListener('click', e => clickHandler(e));
    element.querySelector('#slide-number3').addEventListener('keyup', ({target}) => {
      updateSlideIndex(target.value - 1);
    });
  };

  const clickHandler = function (e) {
    e.stopPropagation();
    const {id} = e.target;
    switch (id) {
      case 'popup': return openPopup();
      case 'cancel': return store.dispatch('eventPublish', {stateEvent: 'closeModal'});
      case 'show': return store.dispatch('eventPublish', {stateEvent: 'startFullscreen'});
      default:
    }
  };

  const updateSlideIndex = function (index = 0) {
    store.dispatch('updatePTIndex', {index});
    renderSlides();
  };

  const openPopup = function () {
    if (popup) popup.destory();
    popup = new Popup();
    popup.init();
  };

  this.init = function () {
    render();
    addListener();
    updateSlideIndex();
  };
}
