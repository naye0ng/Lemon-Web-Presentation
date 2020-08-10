const layoutView = () => {
  const render = () => {
    const $app = document.querySelector('#app');
    $app.innerHTML = `
      <div id="header"></div>
      <div id="archive"></div>
      <div id="main">
          <div id="viewer"></div>
          <div id="editor">
              <div id="toolbar"></div>
              <div id="text-editor"></div>
          </div>
      </div>
      <div id="fullscreen-btn"></div>
      <div id="fullscreen"></div>
      <div id="modal"></div>`;
  };

  return {render};
};

export default layoutView;
