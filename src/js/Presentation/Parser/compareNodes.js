import convertObjToDOM from './convertObjToDOM';

const compareChildNodes = (oldChild, newChild) => {
  const changedChildNodes = oldChild.map((node, i) => compareNodes(node, newChild[i])
  );

  const addedChildNodes = newChild.slice(oldChild.length)
    .map(node => parent => {
      parent.appendChild(convertObjToDOM(node));
    });

  return parentVDOM => {
    for (let i = 0; i < changedChildNodes.length; i++) {
      // TODO : 사용자가 한꺼번에 여러 노드를 삭제하는 경우 parentVDOM.childNodes[i] 순서가 밀리게 된다.
      changedChildNodes[i](parentVDOM.childNodes[i]);
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

  const patchChildNodes = compareChildNodes(oldNode.children, newNode.children);

  return vDOM => {
    patchChildNodes(vDOM);
  };
};

export default compareNodes;
