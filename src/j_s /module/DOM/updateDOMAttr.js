const updateDOMAttr = (oldAttrs, newAttrs) => {
  const changedAttrs = [];

  for (const attr in oldAttrs) {
    if (newAttrs[attr]) continue;

    changedAttrs.push(DOM => {
      DOM.removeAttribute(attr);
    });
  }

  Object.entries(newAttrs).forEach(([attr, value]) => {
    if (oldAttrs[attr] === value) return;
    changedAttrs.push(DOM => {
      DOM.setAttribute(attr, value);
    });
  });

  return DOM => {
    for (const patch of changedAttrs) {
      patch(DOM);
    }
  };
};

export default updateDOMAttr;
