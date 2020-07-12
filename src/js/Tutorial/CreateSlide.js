function Slide () {}

function bindSlide (obj, key, el) {
  Object.defineProperty(obj, key, {
    get: () => (el.value),
    set: value => {
      el.value = value;
    },
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const slide = new Slide();

  // [1] textarea, slide 영역 잡기
  const textarea = document.querySelector('textarea#slide-input');
  const slidearea = document.querySelector('div#slide-output');

  // [2] slide 데이터 받기
  bindSlide(slide, 'slide', textarea);

  // [3] slide 생성
  setInterval(() => {
    slidearea.innerHTML = slide.slide;
  });
});
