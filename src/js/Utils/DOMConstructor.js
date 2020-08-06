export const createElement = (tag, attrs = {}, child) => {
  const el = document.createElement(tag);

  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });

  if (child) el.append(child);
  return el;
};

export const createSVGElement = (url, tag, attrs = {}, child) => {
  const el = document.createElementNS(url, tag);
  Object.entries(attrs).forEach(([key, value]) => {
    el.setAttribute(key, value);
  });
  if (child) el.append(child);
  return el;
};

export const createSlideDOM = (id, contents) => {
  const foreign = createSVGElement('http://www.w3.org/2000/svg', 'foreignObject', {
    width: '1280',
    height: '720',
  }, contents);

  const svg = createSVGElement('http://www.w3.org/2000/svg', 'svg', {
    viewBox: '0 0 1280 720',
    width: '100%',
  }, foreign);

  const slideDOM = createElement('div', {
    id,
    class: 'slide',
    draggable: true,
  }, svg);

  return slideDOM;
};
