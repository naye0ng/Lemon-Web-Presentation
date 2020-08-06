const fullscreenView = () => {
  const $fullscreen = document.querySelector('.fullscreen');

  const render = function () {
    $fullscreen.innerHTML =
      `<div id="fullscreen-menu">
      <div class="fullscreen-toolber">
        <div class="slide-toolber"><button id="before"></button>
          <div class="input-slide-number"><input id="pt-number" type="number" max="1" min="1" value="1"></div><button
            id="next"></button>
          </div><button id="pointer">포인터</button><button id="helper">발표자 노트</button>
        </div>
      </div>
      <div id="fullscreen-contents"></div>
      <div id="mouse-pointer"></div>`;
  };

  const bindFullscreenEvent = (type, handler) => {
    $fullscreen.addEventListener(type, e => {
      e.stopPropagation();
      handler(e);
    });
  };

  return {
    render,
    bindFullscreenEvent,
  };
};

export default fullscreenView;
