const convertslideStringToDOM = strSlide => new DOMParser().parseFromString(strSlide, 'text/html').body.childNodes[0];

export default convertslideStringToDOM;
