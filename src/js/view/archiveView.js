const archiveView = () => {
  const $archive = document.querySelector('#archive');

  const render = () => {
    $archive.innerHTML = `
      <div class="archive-header">
        <div class="archive-title">Archive</div>
        <div class="archive-subtitle">파일을 클릭하여 저징된 프레젠테이션을 불러올 수 있습니다.</div>
      </div>
      <div class="archive-viewer">
        <div class="archive-list"></div>
      </div>`;
  };

  const resetArchiveItem = () => {
    $archive.querySelector('.archive-list').innerHTML = '';
  };

  const renderArchiveItem = title => {
    const item = `
      <div class="archive-item" title="${title}">
        <div class="title" title="${title}">${title}</div>
        <button id="delete-item" title="${title}">삭제</button>
      </div>`;

    $archive.querySelector('.archive-list').insertAdjacentHTML('beforeend', item);
  };

  return {
    $archive,
    render,
    renderArchiveItem,
    resetArchiveItem,
  };
};

export default archiveView;
