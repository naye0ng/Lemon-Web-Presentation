const TEXT_NODE = 3;
const ERROR = 'parsererror';

const isChild = node => {
  if (node.nodeType === TEXT_NODE && node.nodeValue.trim() === '') {
    return false;
  }
  if (node.tagName === ERROR) {
    return false;
  }
  return true;
};


const markupParser = node => {
  if (node.nodeType === TEXT_NODE) {
    return node.nodeValue;
  }

  const parsedObj = {
    tagName: node.tagName,
    attrs: {},
    children: Array.prototype.filter
      .call(node.childNodes, child => isChild(child))
      .map(child => markupParser(child)),
  };

  for (const {nodeName, nodeValue} of node.attributes) {
    parsedObj.attrs[nodeName] = nodeValue;
  }

  return parsedObj;
};

export default markupParser;
