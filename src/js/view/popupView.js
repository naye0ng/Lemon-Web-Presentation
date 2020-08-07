const popupView = () => {
  const render = ({timer, slideNumber, slideSize, note}) => `<div class="presentaion-helper">
    <div class="timer-and-viewer">
      <div id="timer">
        <div id="time-view">${timer}</div>
        <div class="buttons">
          <button id="start-timer">시작</button>
          <button id="stop-timer">정지</button>
          <button id="reset-timer">초기화</button>
        </div>
      </div>
      <div id="viewer">
      </div>
    </div>
    <div class="controller-and-note">
      <div id="slide-controller">
        <div id="total">슬라이드 ${slideNumber} / ${slideSize}</div>
        <div class="buttons">
          <button id="before">이전</button>
          <button id="next">다음</button>
        </div>
      </div>
      <div id="presentation-note">${note}</div>
    </div>
    </div>`;
  return {render};
};

export default popupView;

