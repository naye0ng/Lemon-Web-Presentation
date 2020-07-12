// 가상 객체를 생성하는 함수
export default ({tagName = 'div', attrs = {}, children = []}) => ({
  tagName,
  attrs,
  children,
});
// export default (tagName, {attrs, children}) => {
//   const vElem = Object.create(null);

//   Object.assign(vElem, {
//     tagName,
//     attrs,
//     children,
//   });

//   return vElem;
// };
