const layoutView = () => {
  const render = function () {
    const $app = document.querySelector('#app');

    $app.innerHTML = `
    <div class="navigation"></div>
    <div class="titlebar"></div>
    <div class="viewer-and-editor">
      <div class="slide-viewer"></div>
      <div class="slide-editor">
        <div class="toolbar"></div>
        <div class="editor"></div>
      </div>
    </div>
    <div class="slide-editor"></div>
    <div id="fullscreen"></div>
    <div id="modal-wrapper"></div>`;
  };

  return {render};
};


export default layoutView;
