const toolbarView = () => {
  const $toolbar = document.querySelector('.toolbar');
  let $slideNumber = null;

  const render = () => {
    $toolbar.innerHTML = `
      <div class="slide-controller">
        <div class="focus-btn">
          <button id="before"></button><div class="slide-number-wrap">
            <input id="slide-number" type="number" max="1" min="1">
          </div><button id="next"></button>
        </div>
        <div class="crud-btn">
          <button id="slide-create">슬라이드 추가</button><button id="slide-copy">복사</button><button id="slide-delete">삭제</button>
        </div>
      </div>
      <div class="attribute-controller">
        <div class="bg-color-btn">
          <label>배경 색</label>
          <input type="color" id="background-color" name="background-color" value="#ffffff"/>
        </div>
        <div class="font-color-btn">
          <label>글자 색</label>
          <input type="color" id="color" name="color" value="#333333"/>
        </div>
        <div class="align-btn">
          <label>컨텐츠 정렬</label>
          <button id="left" class="active" name="text-align" value="left" >왼</button>
          <button id="middle" name="text-align" value="center" >중</button>
          <button id="right" name="text-align" value="right" >오</button>
        </div>
      </div>`;
  };

  const bindToolbarEvent = (type, handler) => {
    $toolbar.addEventListener(type, ({target}) => handler(target));
  };

  const updateSlideNumber = ({value, min, max}) => {
    if (!$slideNumber) $slideNumber = document.querySelector('#slide-number');
    if (value) $slideNumber.value = value;
    if (min) $slideNumber.min = min;
    if (max) $slideNumber.max = max;
  };

  return {
    render,
    bindToolbarEvent,
    updateSlideNumber,
  };
};

export default toolbarView;
