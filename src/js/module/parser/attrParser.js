export default (name, value) => {
  if (name === ':color') return ['style', `color: ${value};`];
  if (name === ':background-color') return ['style', `background-color: ${value};`];
  if (name === ':size') return ['class', `head-${value}`];
  if (name === ':bold') return ['style', value ? 'font-weight: 600;' : ''];
  if (name === ':italic') return ['style', value ? 'font-style: italic; ' : ''];
  if (name === ':width') return ['style', `width: ${value};`];
  if (name === ':height') return ['style', `height: ${value};`];
  if (name === ':float') return ['style', `float: ${value};`];
  if (name === ':decorator') return ['class', `list-style-${value}`];
  if (name === ':path') return ['style', `content:url('${value}');`];

  // TODO : animation class 추가
  return [name, value];
};
