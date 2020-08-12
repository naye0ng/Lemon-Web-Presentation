const headerView = () => {
  const $header = document.querySelector('#header');

  const render = () => {
    $header.innerHTML = `
    <div class="header-infomation">
    <div class="header-logo"></div>
    <input id="title-input" type="text" placeholder="제목을 입력하세요." />
    </div>
    <div class="header-menu">
        <button id="save-btn" class="header-btn">저장</button>
        <button id="archive-btn" class="header-btn">파일</button>
        <button id="reset-btn" class="header-btn">새 프레젠테이션</button>
        <button id="usage-btn" class="header-btn">사용법</button>
    </div>`;
  };

  return {
    $header,
    render,
  };
};

export default headerView;
