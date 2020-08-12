import attrParser from './attrParser';
import {ALLOW_TAGS, TAGS} from './constants';


const isNode = ({nodeName, nodeValue}) => {
  if (!ALLOW_TAGS.includes(nodeName)) return false;
  if (nodeName === '#text' && nodeValue.trim() === '') return false;
  return true;
};

const markupParser = ({nodeName, nodeValue, tagName, attributes, childNodes}) => {
  if (nodeName === '#text') {
    if (nodeValue[0] === '\n') return nodeValue.slice(1);
    return nodeValue;
  }

  const parsedObj = {
    tag: TAGS[tagName] || tagName,
    attrs: {
      class: '',
    },
  };

  parsedObj.children = Array.from(childNodes)
    .filter(child => isNode(child))
    .map(child => markupParser(child));


  for (let i = 0; i < attributes.length || 0; i++) {
    let name; let value;
    ({name, value} = attributes[i]);

    if (value) {
      [name, value] = attrParser(name, value);

      if (!parsedObj.attrs[name]) {
        parsedObj.attrs[name] = '';
      }
      parsedObj.attrs[name] += `${value} `;
    }
  }

  return parsedObj;
};

export default markupParser;
