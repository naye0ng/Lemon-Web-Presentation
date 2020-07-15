class Fullscreen {
  constructor (domElemFunc) {
    // 전체모드에서 들어갈 버튼 껍데기? 레이아웃
    // this.closedBtn = '';
    this.domElemFunc = domElemFunc;

    this.init();
  }

  init () {
    document.querySelector('button.fullscreen-btn').addEventListener('click', () => {
      this.openFullscreen();
    });
  }

  openFullscreen () {
    // TODO : fullscreen 껍대기 만들어서 추가하기
    const fullscreenEl = this.domElemFunc();
    if (!fullscreenEl.childElementCount) {
      alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');
    } else {
      const renderFullscreen =
        fullscreenEl.requestFullScreen ||
        fullscreenEl.webkitRequestFullScreen ||
        fullscreenEl.mozRequestFullScreen ||
        fullscreenEl.msRequestFullscreen;

      // TODO : IE에서 테스트!
      if (renderFullscreen) {
        renderFullscreen.call(fullscreenEl);
      }
    }
  }
}

export default Fullscreen;
