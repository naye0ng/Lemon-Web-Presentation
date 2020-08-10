const fullscreenView = () => {
  const $fullscreen = document.querySelector('#fullscreen');
  let $fullscreenContents = null;
  let $slideNumber = null;
  let $mousePointer = null;

  const render = () => {
    $fullscreen.innerHTML = `
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

    $fullscreenContents = $fullscreen.querySelector('#fullscreen-contents');
    $slideNumber = $fullscreen.querySelector('#slide-number2');
    $mousePointer = $fullscreen.querySelector('#mouse-pointer');
  };

  const renderSlide = slide => {
    $fullscreenContents.append(slide);
  };

  const updateSlideContentsStyle = (type, value) => {
    $fullscreenContents.style[type] = value;
  };

  const updateSlideNumber = ({value, min, max}) => {
    if (value) $slideNumber.value = value;
    if (min) $slideNumber.min = min;
    if (max) $slideNumber.max = max;
  };

  const renderMousePointer = (x, y) => {
    $mousePointer.style.left = `${x}px`;
    $mousePointer.style.top = `${y}px`;
  };

  const reset = () => {
    $fullscreenContents.innerHTML = '';
    $fullscreenContents.classList = '';
  };

  return {
    $fullscreen,
    render,
    renderSlide,
    updateSlideContentsStyle,
    updateSlideNumber,
    renderMousePointer,
    reset,
  };
};

export default fullscreenView;
