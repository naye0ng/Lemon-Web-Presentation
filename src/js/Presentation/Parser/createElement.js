const renderElement = ({tag, attrs, children}) => {
  const el = document.createElement(tag);

  for (const [name, value] of Object.entries(attrs)) {
    el.setAttribute(name, value);
  }

  for (const child of children) {
    if (attrs.class === 'slide-container ' && typeof child === 'string') continue;
    el.appendChild(createElement(child));
  }

  return el;
};

const createElement = node => {
  if (typeof node === 'string') return document.createTextNode(node);
  return renderElement(node);
};

export default createElement;
