const navigationView = () => {
  const $navigation = document.querySelector('.navigation');

  const render = () => {
    $navigation.innerHTML = `
    <div class="lemon-logo"></div>
    <div class="fullscreen-btn-wrapper">
      <button id="show-modal" class="fullscreen-btn">슬라이드 쇼</button>
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
