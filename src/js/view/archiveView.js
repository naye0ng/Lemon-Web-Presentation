const archiveView = () => {
  const $modal = document.querySelector('#modal');// document.querySelector('#archive');

  const render = () => {
    $modal.innerHTML = `
    <div id="archive-modal" class=" modal">
      <div class="archive-header">
        <div class="title">Archive</div>
        <div class="subtitle">파일을 클릭하여 저징된 프레젠테이션을 불러올 수 있습니다.</div>
      </div>
      <div class="archive-list"></div>
      </div>`;
  };

  const resetArchiveItem = () => {
    $modal.querySelector('.archive-list').innerHTML = '';
  };

  const renderArchiveItem = title => {
    const item = `
      <div class="archive-item" title="${title}">
        <div class="archive-title" title="${title}">${title}</div>
        <button id="delete-item" title="${title}">삭제</button>
      </div>`;

    $modal.querySelector('.archive-list').insertAdjacentHTML('beforeend', item);
  };

  return {
    $modal,
    render,
    renderArchiveItem,
    resetArchiveItem,
  };
};

export default archiveView;
