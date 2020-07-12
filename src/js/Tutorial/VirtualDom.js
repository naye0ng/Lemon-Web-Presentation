// import createElement from './vDOM/CreateElement';
import render from './vDOM/Render';
import mount from './vDOM/Mount';
import diff from './vDOM/Diff';
// const vApp = createElement('div', {
//   attrs: {
//     id: 'app',
//   },
//   children: [
//     'hello world!',
//     createElement('img', {
//       attrs: {
//         src: 'https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif',
//       },
//     }),
//   ],
// });


let DOM = {
  tagName: 'ul',
  attrs: {},
  children: [
    {
      tagName: 'li',
      attrs: {},
      children: ['first'],
    },
    {
      tagName: 'li',
      attrs: {},
      children: ['second',
        {
          tagName: 'li',
          attrs: {},
          children: ['0'],
        },
      ],
    },
    {
      tagName: 'li',
      attrs: {},
      children: ['third',
        // {
        //   tagName: 'img',
        //   attrs: {
        //     src: 'https://media.giphy.com/media/13CoXDiaCcCoyk/giphy.gif',
        //   },
        //   children: [],
        // },
      ],
    },
  ],
};

const $app = render(DOM);
let $rootEl = mount($app, document.querySelector('#app'));


// 임시적으로 차이를 보여줌
let counter = 1;

// // 차이에 대한 랜더링
setInterval(() => {
  const DOM2 = JSON.parse(JSON.stringify(DOM));
  DOM2.children[1].children[1].children[0] = String(counter++);
  // gif가 새로 시작되는 이유?
  const patch = diff(DOM, DOM2);
  $rootEl = patch($rootEl);
  DOM = DOM2;
}, 1000);
