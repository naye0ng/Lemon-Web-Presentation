
export const convertStringToDOM = (strXML = '') => {
  const DOM = new DOMParser().parseFromString(
    `<div class='slide-contents'>${strXML}</div>`, 'text/html');
  return DOM.body.childNodes[0];
};

export const convertslideStrToSlideDOM = strSlide => new DOMParser().parseFromString(strSlide, 'text/html').body.childNodes[0];

