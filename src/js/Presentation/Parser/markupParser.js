import attrParser from './attrParser';
import {ALLOW_TAGS, TAGS} from './constants';


const isNode = node => {
  if (!ALLOW_TAGS.includes(node.nodeName)) return false;
  if (node.nodeName === '#text' && node.nodeValue.trim() === '') return false;

  return true;
};

const markupParser = node => {
  if (node.nodeName === '#text') {
    if (node.nodeValue[0] === '\n') return node.nodeValue.slice(1);
    return node.nodeValue;
  }

  const parsedObj = {
    tag: TAGS[node.tagName] || node.tagName,
    attrs: {},
    children: Array.prototype.filter
      .call(node.childNodes, child => isNode(child))
      .map(child => markupParser(child)),
  };

  if (node.tagName === 'SLIDE') {
    parsedObj.attrs.class = 'slide ';
  }

  for (let i = 0; i < node.attributes.length || 0; i++) {
    let name; let value;
    ({name, value} = node.attributes[i]);

    if (value) {
      if (name !== 'class' && name !== 'style') {
        [name, value] = attrParser(name, value);
      }

      if (parsedObj.attrs[name] === undefined) {
        parsedObj.attrs[name] = '';
      }
      parsedObj.attrs[name] += `${value} `;
    }
  }
  return parsedObj;
};

export default markupParser;
