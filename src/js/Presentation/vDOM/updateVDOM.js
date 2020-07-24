import convertObjToDOM from '../Parser/convertObjToDOM';
import updateVDOMAttr from './updateVDOMAttr';

const updateVDOMChild = (oldChild, newChild) => {
  const changedChild = oldChild.map((oldNode, i) => updateVDOM(oldNode, newChild[i])
  );

  const addedChild = newChild.slice(oldChild.length)
    .map(newNode => parentVDOM => {
      parentVDOM.appendChild(convertObjToDOM(newNode));
    });

  return parentVDOM => {
    let parentSize = parentVDOM.childNodes.length;
    let deletedCount = 0;

    for (let i = 0; i < changedChild.length; i++) {
      if (parentSize !== parentVDOM.childNodes.length) {
        parentSize = parentVDOM.childNodes.length;
        deletedCount += 1;
      }
      changedChild[i](parentVDOM.childNodes[i - deletedCount]);
    }

    for (const patch of addedChild) {
      patch(parentVDOM);
    }
  };
};

const updateVDOM = (oldNode, newNode) => {
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
    updateVDOMAttr(oldNode.attrs, newNode.attrs)(vDOM);
    updateVDOMChild(oldNode.children, newNode.children)(vDOM);
  };
};

export default updateVDOM;
