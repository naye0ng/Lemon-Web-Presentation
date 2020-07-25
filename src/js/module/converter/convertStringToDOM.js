
const convertStringToDOM = strXML => {
  const DOM = new DOMParser().parseFromString(`<div class='slide'>${strXML}</div>`, 'text/html');
  return DOM.body.childNodes[0];
};

export default convertStringToDOM;
