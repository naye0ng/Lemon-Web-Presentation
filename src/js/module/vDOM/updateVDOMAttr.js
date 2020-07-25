const updateVDOMAttr = (oldAttrs, newAttrs) => {
  const changedAttrs = [];

  for (const attr in oldAttrs) {
    if (newAttrs[attr]) continue;

    changedAttrs.push(vDOM => {
      vDOM.removeAttribute(attr);
    });
  }

  for (const [attr, value] of Object.entries(newAttrs)) {
    if (oldAttrs[attr] === value) continue;

    changedAttrs.push(vDOM => {
      vDOM.setAttribute(attr, value);
    });
  }

  return vDOM => {
    for (const patch of changedAttrs) {
      patch(vDOM);
    }
  };
};

export default updateVDOMAttr;
