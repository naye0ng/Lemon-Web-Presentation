const containerView = () => {
  const render = function () {
    const $app = document.querySelector('#app');

    $app.innerHTML = `
    <div class="navigation"></div>
    <div class="titlebar"></div>
    <div class="viewer-and-editor">
      <div class="slide-viewer"></div>
      <div class="slide-editor"></div>
    </div>
    <div class="slide-editor"></div>
    <div id="fullscreen"></div>`;
  };

  return {render};
};


export default containerView;
