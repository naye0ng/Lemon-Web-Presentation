const titlebarView = () => {
  const $titlebar = document.body.querySelector('.titlebar');

  const render = function () {
    $titlebar.innerHTML = `
    <div class="presentation-info">
      <input id="presentation-title" type="text" placeholder="제목 없는 프레젠테이션"></div>
      <div class="presenteation-menu">
      <select id="presentation-selector" name="presentation">
        <option value="">저장된 프레젠테이션 목록</option>
      </select>
      <div class="presentation-btn">
        <button id="new">새 프레젠테이션</button>
        <button id="delete">저장 기록 삭제</button>
        <button id="save">저장</button>
      </div>
    </div>`;
  };

  const bindTitlebarEvent = (type, handler) => {
    $titlebar.addEventListener(type, ({target}) => handler(target));
  };

  const updateSelectOption = function (options) {
    const titleSelector = document.body.querySelector('#presentation-selector');

    let selectOptions = '<option value="">저장된 프레젠테이션 목록</option>';
    options.forEach(title => {
      selectOptions += `<option value="${title}">${title}</option>`;
    });

    titleSelector.innerHTML = selectOptions;
  };


  return {
    render,
    bindTitlebarEvent,
    updateSelectOption,
  };
};

export default titlebarView;
