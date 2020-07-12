/*
[실시간 데이터 바인딩] Object.defineProperty(obj, prop, descriptor)
- obj : 프로퍼티를 정의할 대상 객체
- prop : 새로 정의하거나 수정하려는 프로퍼티 이름
- descriptor: : 새로 정의하거나 수정하려는 속성을 쓰는 객체


https://im-developer.tistory.com/140
*/

// base 객체에 key 속성을 추가하고 거기에 el를 저장하겠다.
function bind (base, el, key) {
  Object.defineProperty(base, key, {
    // base 객체에 key 속성을 추가하고 해당 속성의 옵션을 아래와 같이 설정하겠다는 의미
    get: () => el.value,
    set: value => {
      el.value = value;
    },
  });
}

const obj = {};
document.addEventListener('DOMContentLoaded', () => {
  bind(obj, document.getElementById('bind-input'), 'text');

  // [방법1] : 계속 돌렸을 때, 성능 문제 안생길까? >> 500ms로 늘려본다.
  setInterval(() => {
    document.getElementById('bind-output').innerText = obj.text;
  }, 500);

  // [방법2] : change는 입력을 아예 끝내버리고 focus가 해제됐을 떄 실행된다. >> 실시간이라 볼 수 없다.
  // const input = document.querySelector('#bind-input');
  // input.addEventListener('change', function () {
  //   document.querySelector('#bind-output').innerHTML = obj.text;
  // });
});

