class Fullscreen {
  constructor (getSlideElFunc) {
    this.fullscreenState = false;
    this.fullscreenEl = document.querySelector('#fullscreen');

    this.getSlideElFunc = getSlideElFunc;
    this.init();
  }

  init () {
    this.initCarousel();
    this.toggleFullscreen();
    this.bindArrowController();

    document.querySelector('button.fullscreen-btn').addEventListener('click', () => {
      if (!this.fullscreenState) {
        this.startFullscreen();
      }
    });
  }

  initCarousel (carousel = null, slideIndex = 0, slideCount = 0) {
    this.carousel = carousel;
    this.slideIndex = slideIndex;
    this.slideCount = slideCount;
  }

  toggleFullscreenState () {
    this.fullscreenState = !this.fullscreenState;
    if (!this.fullscreenState) {
      this.fullscreenEl.innerHTML = '';
      this.initCarousel();
    }
  }

  toggleFullscreen () {
    ['webkitfullscreenchange', 'msfullscreenchange'].forEach(event => {
      this.fullscreenEl.addEventListener(event, () => {
        this.toggleFullscreenState();
      });
    });
  }

  bindArrowController () {
    this.fullscreenEl.addEventListener('keydown', ({key}) => {
      if (!this.fullscreenState) return;

      if (key === 'ArrowLeft' && this.slideIndex > 0) {
        this.slideIndex -= 1;
        this.carousel.style.marginLeft = `${-100 * this.slideIndex}vw`;
      } else if (key === 'ArrowRight' && this.slideIndex < this.slideCount - 1) {
        this.slideIndex += 1;
        this.carousel.style.marginLeft = `${-100 * this.slideIndex}vw`;
      }
    });
  }

  startFullscreen () {
    const slideNodes = this.getSlideElFunc();
    this.slideCount = slideNodes.childElementCount;
    if (!this.slideCount) {
      alert('작성된 슬라이드가 없습니다. \n슬라이드를 만들어주세요!');
    } else {
      const renderFullscreen =
        this.fullscreenEl.webkitRequestFullScreen ||
        this.fullscreenEl.msRequestFullscreen;

      this.fullscreenEl.appendChild(slideNodes.cloneNode(true));

      this.carousel = document.querySelector('#fullscreen > .slide-container');
      this.carousel.style.width = `${100 * this.slideCount}vw`;

      // TODO : IE에서 테스트!
      if (renderFullscreen) {
        renderFullscreen.call(this.fullscreenEl);
      }
    }
  }
}

export default Fullscreen;
