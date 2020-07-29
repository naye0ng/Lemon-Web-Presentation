import convertObjToDOM from '../converter/convertObjToDOM';
import updateDOMAttr from './updateDOMAttr';

const updateDOMChild = (oldChild, newChild) => {
  const changedChild = oldChild.map((oldNode, i) => updateDOM(oldNode, newChild[i])
  );

  const addedChild = newChild.slice(oldChild.length)
    .map(newNode => parentDOM => {
      parentDOM.appendChild(convertObjToDOM(newNode));
    });

  return parentDOM => {
    let parentSize = parentDOM.childNodes.length;
    let deletedCount = 0;

    for (let i = 0; i < changedChild.length; i++) {
      if (parentSize !== parentDOM.childNodes.length) {
        parentSize = parentDOM.childNodes.length;
        deletedCount += 1;
      }
      if (changedChild[i]) changedChild[i](parentDOM.childNodes[i - deletedCount]);
    }

    addedChild.forEach(patch => {
      if (patch) patch(parentDOM);
    });
  };
};

const updateDOM = (oldNode, newNode) => {
  if (!newNode) {
    return DOM => {
      DOM.remove();
    };
  }

  if (typeof newNode === 'string' || typeof oldNode === 'string') {
    if (newNode === oldNode) return;

    return DOM => {
      DOM.replaceWith(convertObjToDOM(newNode));
    };
  }

  if (oldNode.tag !== newNode.tag) {
    return DOM => {
      DOM.replaceWith(convertObjToDOM(newNode));
    };
  }

  return DOM => {
    updateDOMAttr(oldNode.attrs, newNode.attrs)(DOM);
    updateDOMChild(oldNode.children, newNode.children)(DOM);
  };
};

export default updateDOM;
