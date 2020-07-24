import attrParser from './attrParser';
import {ALLOW_TAGS, TAGS} from '../Utils/constants';


const isNode = ({nodeName, nodeValue}, isSlideChild) => {
  if (!ALLOW_TAGS.includes(nodeName)) return false;
  if (nodeName === '#text' && nodeValue.trim() === '') return false;
  if (isSlideChild && nodeName === 'SLIDE') return false;
  return true;
};

const markupParser = ({nodeName, nodeValue, tagName, attributes, childNodes}, isSlideChild = false) => {
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

  if (tagName === 'SLIDE') {
    parsedObj.attrs.class = 'slide ';
    // eslint-disable-next-line no-param-reassign
    isSlideChild = true;
  }

  parsedObj.children = Array.from(childNodes)
    .filter(child => isNode(child, isSlideChild))
    .map(child => markupParser(child, isSlideChild));


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
