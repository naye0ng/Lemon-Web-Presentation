const navigationView = () => {
  const $navigation = document.querySelector('.navigation');

  const render = () => {
    $navigation.innerHTML = `
    <div class="lemon-logo"></div>
    <div class="fullscreen-btn-wrapper">
      <button id="animation-selector" class="fullscreen-btn">슬라이드 애니메이션</button>
      <button id="first-slide" class="fullscreen-btn">슬라이드 쇼</button>
      <button id="current-slide" class="fullscreen-btn">현재 슬라이드부터 쇼</button>
      <button id="helper-popup" class="fullscreen-btn">발표자 노트</button>
    </div>`;
  };

  const bindButtonEvent = (type, handler) => {
    $navigation.addEventListener(type, e => handler(e));
  };

  return {
    render,
    bindButtonEvent,
  };
};

export default navigationView;


/* <select id="animation-selector" name="animation">
        <option value="">슬라이드 효과</option>
        <option value="fade">천천히 사라지기</option>
        <option value="vertical">세로 슬라이드</option>
        <option value="horizontal">가로 슬라이드</option>


      </select> */
