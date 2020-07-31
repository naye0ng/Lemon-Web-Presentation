export const createCustomElement = (tag, attrs = {}, child) => {
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
