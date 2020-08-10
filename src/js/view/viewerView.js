const viewerView = () => {
  const $viewer = document.querySelector('#viewer');
  let $slideContainer = null;
  let $slideViewer = null;

  const render = () => {
    $viewer.innerHTML = `
    <div class="mode-change-btns">
      <button id="editor-view-btn" class="mode-change-btn active">에디터뷰</button>
      <button id="grid-view-btn" class="mode-change-btn">그리드뷰</button>
    </div>
    <div class="slide-viewer">
        <div id="slide-container"></div>
    </div>`;

    $slideContainer = $viewer.querySelector('#slide-container');
    $slideViewer = $viewer.querySelector('.slide-viewer');
  };

  const renderNthChild = (child, n) => {
    $slideContainer.insertBefore(child, $slideContainer.childNodes[n]);
  };

  const reset = () => {
    $slideContainer.innerHTML = '';
  };

  // storage data render
  const renderSlide = slide => {
    $slideContainer.append(slide);
  };

  const focusOnSlide = (scrollTop, scrollBottom) => {
    const viewerScrollTop = $slideViewer.scrollTop;
    const viewerScrollHeight = $slideViewer.offsetHeight;
    if (viewerScrollTop <= scrollTop && scrollBottom <= viewerScrollTop + viewerScrollHeight) return;
    $slideViewer.scrollTop = scrollTop - ($slideViewer.offsetHeight / 3);
  };

  return {
    $viewer,
    render,
    renderNthChild,
    renderSlide,
    focusOnSlide,
    reset,
  };
};

export default viewerView;
