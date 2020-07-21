class Fullscreen {
  constructor (presentation) {
    this.presentation = presentation;

    this.fullscreenButton = document.querySelector('button.fullscreen-btn');
    this.fullscreenWrapper = document.querySelector('#fullscreen');
    this.fullscreenContents = document.querySelector('#fullscreen-contents');

    // TODO : 시작인덱스 입력 받기
    this.slideIndex = 0;
    this.slideCount = 0;

    this.init();
  }

  init () {
    this.fullscreenButton.addEventListener('click', () => {
      this.startFullscreen();
    });
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreen) return;
      this.fullscreenContents.innerHTML = '';
    });
    document.addEventListener('keydown', ({key}) => {
      if (!document.fullscreen) return;
      this.arrowKeyController(key);
    });
  }

  arrowKeyController (key) {
    if (key === 'ArrowLeft' && this.slideIndex > 0) {
      this.slideIndex -= 1;
      this.fullscreenContents.style.marginLeft = `${-100 * this.slideIndex}vw`;
    } else if (key === 'ArrowRight' && this.slideIndex < this.slideCount - 1) {
      this.slideIndex += 1;
      this.fullscreenContents.style.marginLeft = `${-100 * this.slideIndex}vw`;
    }
  }

  startFullscreen () {
    const slideNodes = this.presentation.vDOM;
    if (!slideNodes || !slideNodes.childElementCount) {
      alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');
    } else {
      this.slideCount = slideNodes.childElementCount;

      this.fullscreenContents.appendChild(slideNodes.cloneNode(true));
      this.fullscreenContents.firstChild.style.width = `${100 * this.slideCount}vw`;

      this.fullscreenWrapper.requestFullscreen();
    }
  }
}

export default Fullscreen;
