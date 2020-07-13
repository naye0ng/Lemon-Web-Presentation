const TEXT = 3;

const ALLOW_TAGS = [
  'SLIDE', 'DIV', 'TITLE', 'P', 'IMAGE', 'IMG',
  'LIST', 'LI', 'OL', 'BOLD', 'B', 'ITALIC', 'I', '#text',
];

const TAGS = {
  SLIDE: 'DIV',
  TITLE: 'P',
  TEXT: 'P',
  IMAGE: 'IMG',
  LIST: 'LI',
  BOLD: 'B',
  ITALIC: 'I',
};

const isNode = node => {
  if (!ALLOW_TAGS.includes(node.nodeName)) return false;
  if (node.nodeType === TEXT && node.nodeValue.trim() === '') return false;

  return true;
};

const attrParser = (name, value) => {
  if (name === ':color') return ['style', `color: ${value};`];
  if (name === ':background-color') return ['style', `background-color: ${value};`];
  if (name === ':size') return ['style', `font-size: ${value};`];
  if (name === ':bold') return ['style', value ? 'font-weight: 600;' : ''];
  if (name === ':italic') return ['style', value ? 'font-style: italic; ' : ''];
  if (name === ':width') return ['style', `width: ${value}%;`];
  if (name === ':height') return ['style', `height: ${value}%;`];
  if (name === ':float') return ['style', `float: ${value};`];
  if (name === ':decorator') return ['style', `list-style: ${value === 'number' ? 'decimal' : value};`];
  // TODO : animation class 추가로 정의
  return [name, value];
};

const markupParser = node => {
  if (node.nodeType === TEXT) {
    return node.nodeValue;
  }

  const parsedObj = {
    tagName: TAGS[node.tagName] || node.tagName,
    attrs: {
      class: '',
      style: '',
    },
    children: Array.prototype.filter
      .call(node.childNodes, child => isNode(child))
      .map(child => markupParser(child)),
  };

  for (let i = 0; i < node.attributes.length || 0; i++) {
    let nodeName; let nodeValue;
    ({nodeName, nodeValue} = node.attributes[i]);
    if (nodeValue) {
      if (nodeName !== 'class' && nodeName !== 'style') {
        [nodeName, nodeValue] = attrParser(nodeName, nodeValue);
      }
      parsedObj.attrs[nodeName] += `${nodeValue} `;
    }
  }
  return parsedObj;
};

export default markupParser;
