const fullscreenView = () => {
  const $fullscreen = document.querySelector('#fullscreen');
  let $fullscreenContents = null;
  let $mousePointer = null;
  let $slideNumber = null;

  const render = function () {
    $fullscreen.innerHTML =
      `<div id="fullscreen-menu">
      <div class="fullscreen-toolber">
        <div class="slide-toolber"><button id="before"></button>
          <div class="input-slide-number"><input id="pt-number" type="number" max="1" min="1" value="1"></div><button
            id="next"></button>
          </div><button id="pointer">포인터</button>
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

  const getFullscreenContents = () => {
    if ($fullscreenContents) return;
    $fullscreenContents = document.querySelector('#fullscreen-contents');
  };

  const getMousePointer = () => {
    if ($mousePointer) return;
    $mousePointer = document.querySelector('#mouse-pointer');
  };

  const renderSlide = slide => {
    getFullscreenContents();
    $fullscreenContents.append(slide);
  };

  const updateSlideContentsStyle = (type, value) => {
    getFullscreenContents();
    $fullscreenContents.style[type] = value;
  };

  const toggleMousePointer = () => {
    getMousePointer();
    $mousePointer.classList.toggle('active');
  };

  const renderMousePointer = (x, y) => {
    getMousePointer();
    $mousePointer.style.left = `${x}px`;
    $mousePointer.style.top = `${y}px`;
  };

  const reset = () => {
    getFullscreenContents();
    $fullscreenContents.innerHTML = '';
  };

  const updateSlideNumber = ({value, min, max}) => {
    if (!$slideNumber) $slideNumber = document.querySelector('#pt-number');
    if (value) $slideNumber.value = value;
    if (min) $slideNumber.min = min;
    if (max) $slideNumber.max = max;
  };

  return {
    $fullscreen,
    render,
    bindFullscreenEvent,
    renderSlide,
    updateSlideContentsStyle,
    toggleMousePointer,
    reset,
    renderMousePointer,
    updateSlideNumber,
  };
};

export default fullscreenView;
