class Fullscreen {
  constructor (domElemFunc) {
    this.isFullscreen = false;
    this.fullscreenWrapper = document.querySelector('#fullscreen');

    this.carousel = null;
    this.carouselSlideNumber = 0;
    this.slideCount = 0;

    this.domElemFunc = domElemFunc;
    this.init();
  }

  init () {
    this.bindToggleFullscreen();
    this.bindArrowController();

    document.querySelector('button.fullscreen-btn').addEventListener('click', () => {
      if (!this.isFullscreen) {
        this.startFullscreen();
      }
    });
  }

  bindToggleFullscreen () {
    this.fullscreenWrapper.addEventListener('webkitfullscreenchange', () => {
      this.isFullscreen = !this.isFullscreen;
    });
    this.fullscreenWrapper.addEventListener('mozfullscreenchange', () => {
      this.isFullscreen = !this.isFullscreen;
    });
    this.fullscreenWrapper.addEventListener('msfullscreenchange', () => {
      this.isFullscreen = !this.isFullscreen;
    });
    this.fullscreenWrapper.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !this.isFullscreen;
    });
  }

  bindArrowController () {
    this.fullscreenWrapper.addEventListener('keydown', ({key}) => {
      if (this.isFullscreen) {
        if (key === 'ArrowLeft' && this.carouselSlideNumber > 0) {
          this.carouselSlideNumber -= 1;
          this.carousel.style.marginLeft = `${-100 * this.carouselSlideNumber}vw`;
        } else if (key === 'ArrowRight' && this.carouselSlideNumber < this.slideCount - 1) {
          this.carouselSlideNumber += 1;
          this.carousel.style.marginLeft = `${-100 * this.carouselSlideNumber}vw`;
        }
      }
    });
  }

  startFullscreen () {
    const slideNodes = this.domElemFunc();
    this.slideCount = slideNodes.childElementCount;
    if (!this.slideCount) {
      alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');
    } else {
      const renderFullscreen =
        this.fullscreenWrapper.requestFullScreen ||
        this.fullscreenWrapper.webkitRequestFullScreen ||
        this.fullscreenWrapper.mozRequestFullScreen ||
        this.fullscreenWrapper.msRequestFullscreen;

      const firstChildEl = this.fullscreenWrapper.firstChild;
      if (firstChildEl) {
        this.fullscreenWrapper.removeChild(firstChildEl);
      }

      this.fullscreenWrapper.appendChild(slideNodes.cloneNode(true));

      this.carousel = document.querySelector('#fullscreen > .slide-container');
      this.carousel.style.width = `${100 * this.slideCount}vw`;

      // TODO : IE에서 테스트!
      if (renderFullscreen) {
        renderFullscreen.call(this.fullscreenWrapper);
      }
    }
  }
}

export default Fullscreen;
