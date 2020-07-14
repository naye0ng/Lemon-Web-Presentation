const TEXT = 3;

const ALLOW_TAGS = [
  'SLIDE', 'DIV', 'TITLE', 'P', 'IMAGE', 'IMG', 'TEXT', 'ITEM',
  'LIST', 'UL', 'LI', 'OL', 'BOLD', 'B', 'ITALIC', 'I', '#text',
];

const TAGS = {
  SLIDE: 'DIV',
  TITLE: 'P',
  TEXT: 'P',
  IMAGE: 'IMG',
  LIST: 'UL',
  ITEM: 'LI',
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
  if (name === ':decorator') return ['class', `list-style-${value}`];
  if (name === ':path') return ['style', `content:url('${value}');`];

  // TODO : animation class 추가
  return [name, value];
};

const markupParser = node => {
  if (node.nodeType === TEXT) {
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
