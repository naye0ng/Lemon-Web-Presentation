const navigationView = () => {
  const $navigation = document.querySelector('.navigation');

  const render = () => {
    $navigation.innerHTML = `
    <div class="lemon-logo"></div>
    <div>
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
