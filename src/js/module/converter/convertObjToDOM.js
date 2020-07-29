const bindNode = ({tag, attrs, children}) => {
  const el = document.createElement(tag);

  Object.entries(attrs).forEach(([attr, value]) => {
    el.setAttribute(attr, value);
  });

  for (const child of children) {
    if (attrs.class === 'slide-container ') {
      if (typeof child === 'string' || child.attrs.class.indexOf('slide') === -1) continue;
    }
    el.appendChild(convertObjToDOM(child));
  }

  return el;
};

const convertObjToDOM = node => {
  if (typeof node === 'string') return document.createTextNode(node);
  return bindNode(node);
};

export default convertObjToDOM;
