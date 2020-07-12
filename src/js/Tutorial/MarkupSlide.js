function Slide () {}

// string으로 들러온 마크업을 돌면서 변환한다.
function customMarkupParser (markup) {
  const parsedMarkup = markup;

  // TODO : 이렇게 하면 DOM을 계속 새로 그리게 되는거 아닌가?
  // virtual DOM?
  return parsedMarkup;
}


function bindSlide (obj, key, el) {
  Object.defineProperty(obj, key, {
    get: () => customMarkupParser(el.value),
    set: value => {
      el.value = value;
    },
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const textarea = document.querySelector('textarea#slide-input');
  const slidearea = document.querySelector('div#slide-output');

  // textarea 내부 텍스트는 여기 있음
  const slide = new Slide();
  bindSlide(slide, 'slide', textarea);

  // [3] slide 생성
  setInterval(() => {
    // 원하는 부분만 변환해주는 작업이 필요한데...
    slidearea.innerHTML = slide.slide;
  });
});


/*
var txt = `
<presentation :color='red'><p>a</p></presentation>
<presentation :color='blue'><p>a</p></presentation>`

var parser = new DOMParser();
var htmlDoc = parser.parseFromString(txt, 'text/html');

htmlDoc.querySelector('Presentation').children


*/
