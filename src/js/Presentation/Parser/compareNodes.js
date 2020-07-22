import convertObjToDOM from './convertObjToDOM';

const compareAttributes = (oldAttrs, newAttrs) => {
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


const compareChildNodes = (oldChild, newChild) => {
  const changedChildNodes = oldChild.map((node, i) => compareNodes(node, newChild[i])
  );

  const addedChildNodes = newChild.slice(oldChild.length)
    .map(node => parent => {
      parent.appendChild(convertObjToDOM(node));
    });

  return parentVDOM => {
    let parentIndex = 0;
    let j = 0;
    if (changedChildNodes.length >= 1) {
      parentIndex = parentVDOM.childNodes.length;
    }
    for (let i = 0; i < changedChildNodes.length; i++) {
      if (parentIndex !== parentVDOM.childNodes.length) {
        parentIndex = parentVDOM.childNodes.length;
        j += 1;
      }
      changedChildNodes[i](parentVDOM.childNodes[i - j]);
    }
    for (let i = 0; i < addedChildNodes.length; i++) {
      addedChildNodes[i](parentVDOM);
    }
  };
};

const compareNodes = (oldNode, newNode) => {
  if (newNode === undefined) {
    return vDOM => {
      vDOM.remove();
    };
  }

  if (typeof newNode === 'string' || typeof oldNode === 'string') {
    if (newNode !== oldNode) {
      return vDOM => {
        vDOM.replaceWith(convertObjToDOM(newNode));
      };
    }
    return vDOM => {};
  }

  if (oldNode.tag !== newNode.tag) {
    return vDOM => {
      vDOM.replaceWith(convertObjToDOM(newNode));
    };
  }

  return vDOM => {
    compareAttributes(oldNode.attrs, newNode.attrs)(vDOM);
    compareChildNodes(oldNode.children, newNode.children)(vDOM);
  };
};

export default compareNodes;
