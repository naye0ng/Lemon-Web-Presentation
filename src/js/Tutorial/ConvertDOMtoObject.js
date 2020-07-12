// 커스텀 태그를 일반 태그 + 클래스로 바꿔주는 기능 추가!!

const TEXT_NODE = 3;
const isEmptyTextNode = node => {
  if (node.nodeType === TEXT_NODE && node.nodeValue.trim() === '') {
    return false;
  }
  return true;
};


const convert = node => {
  // 텍스트가 들어오는 경우
  if (node.nodeType === TEXT_NODE) {
    return node.nodeValue.trim();
  }

  const convertedObj = {
    tagName: node.tagName,
    attrs: {},
    children: Array.prototype.filter.call(node.childNodes, child => isEmptyTextNode(child))
      .map(child => convert(child)),
  };

  for (let i = 0; i < node.attributes.length; i++) {
    const k = node.attributes[i].nodeName;
    convertedObj.attrs[k] = node.getAttribute(k);
  }
  return convertedObj;
};

console.log(convert(document.querySelector('#target')));
