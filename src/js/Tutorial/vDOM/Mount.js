export default ($node, $target) => {
  // $target.replaceWith($node);
  $target.appendChild($node);
  return $node;
};
