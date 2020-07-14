# Lemon Presentation🍋
> 2020 Kakao Summer Internship Project



## I. 기술 과제

> 코드를 왜 이렇게 작성했는지 이유를 명확하게 설명할 수 있을 것!

### 📌 웹 기반 프레젠테이션 툴 개발

[Goolge Slides](https://www.google.com/slides/about), [Reveal.js](https://revealjs.com), [Marp](https://web.marp.app), [Remark.js](https://remarkjs.com), [Deck.js](http://imakewebthings.com/deck.js), [Impress.js]( https://impress.js.org)



#### 1) 요구 사항

- 크롬 브라우저에서 동작을 보장해야 한다.
- 모든 동작은 브라우저에서 이루어 져야한다.
- 웹 UI를 이용하여 텍스트 형식으로 데이터를 입력받는다.
- 버튼과 키보드를 이용하여 페이지를 전환할 수 있어야 한다.
- 발표(풀스크린) 모드를 지원해야 한다.
- 출력 요소로는 제목, 텍스트, 이미지, 리스트 아이템이 있어야 한다.
- [선택] 내보내기(예: PDF)가 가능해야 한다.
- [선택] 애니메이션 효과를 부여할 수 있어야 한다.
- [선택] 모바일 디바이스에서 사용성을 보장해야 한다.
- [선택] IE10 이상, 다른 모던 브라우저를 지원한다.



#### 2) 개발 환경

- JS, CSS, HTML only
- @kakao/styleguide 구성
- No Back-End(WAS) Logic
- No Third-Party Libraries
- 추가 개발 환경(Optional)
- [선택] Babel, Webpack 구성 여부
- [선택] 테스팅(Unit, E2E) 도입 여부



#### 3) 평가 요소

- 업무에 필요한 시스템(git, jira) 활용 능력
- 기능 완성도 및 코드 품질
- 생소한 기술에 대한 학습 능력
- Vanilla JS, ES6에 대한 이해도
- 웹 어플리케이션 설계 및 구성 능력
- 멘토링 및 인턴간 코드 리뷰를 실시, 커뮤니케이션 및 협업 역량
- 본인이 개발한 도구를 이용하여 본인이 개발한 내용을 발표, 전달 능력



## II. 기획 및 개발 계획

✔️ 마크업 형식으로 입력을 받을 예정이며, 일반 사용자를 위해 새롭게 정의한 마크업 태그를 제공할 예정. 

✔️ HTML 문법을 사용하는 것도 가능!

✔️ 기본적으로 `제목`, `텍스트`, `이미지`, `리스트` 아이템을 만드는 태그를 지원한다.



### A. 입력 기능

- `textarea`에서 텍스트를  입력 받는다.



#### 1) 슬라이드

- `slide` 태그로 감싸진 영역을 하나의 슬라이드로 변환한다.
- HTML 문법으로 작성할 경우, `section.slide`로 작성한다.

```text
<slide :background="red">
	<title>this is title</title>
</slide>
```

| 속성             | 값                               | 기본값 | 설명               |
| ---------------- | -------------------------------- | ------ | ------------------ |
| background-color | HEX code(#00ff00), rgb(00,ff,00) | white  | 배경 색            |
| color            | HEX code(#00ff00), rgb(00,ff,00) | black  | 글자 색            |
| animation        |                                  |        | 슬라이드 전환 효과 |

- [ ] `animation` 속성에 맞는 전환 애니메이션 구현 추가



#### 2) 제목

- HTML에서 `h1`, `h2`, `h3`, `h4`, `h5`, `h6` 태그를 의미하며, 아래와 같이 작성한다.

```text
<title :size="1" :bold="true" :italic="false">
this is title!
</title>
```

| 속성   | 값                               | 기본값 | 설명      |
| ------ | -------------------------------- | ------ | --------- |
| size   | 1 <= size <= 6                   | 1      | 글자 크기 |
| color  | HEX code(#00ff00), rgb(00,ff,00) | black  |           |
| bold   | true, false                      | false  | 볼드체    |
| italic | true, false                      | false  | 이텔릭체  |



#### 3) 텍스트

- `p` 태그에 해당하는 내용

```text
<text :color="red">
this is text
</text>
```

| 속성   | 값                               | 기본값 | 설명      |
| ------ | -------------------------------- | ------ | --------- |
| size   | 1 <= size <= 6                   | 1      | 글자 크기 |
| color  | HEX code(#00ff00), rgb(00,ff,00) | black  | 글자 색   |
| bold   | true, false                      | false  | 볼드체    |
| italic | true, false                      | false  | 이텔릭체  |



#### 4) 이미지

- `img` 태그에 해당하는 내용
- `width`, `height`

```text
<image :path="{local image path}"></image>
```

| 속성   | 값                  | 기본값 | 설명        |
| ------ | ------------------- | ------ | ----------- |
| width  | 0 ~ 100%            | 100%   | 이미지 넓이 |
| height | 0 ~ 100%            | 100%   | 이미지 높이 |
| float  | left, middle, right | middle | 이미지 정렬 |

- [ ] 브라우저에서 이미지 경로 찾아서 삽입하는 기능 추가



#### 5) 리스트

```text
<list :decorator="circle">
  <item>아메리카노</item>
  <item :color="red">카페라떼</item>
  <list :decorator="number">
    <item>아이스</item>
    <item>핫</item>
  </list>
</list>
```

| 속성      | 값                               | 기본값 | 설명                   |
| --------- | -------------------------------- | ------ | ---------------------- |
| decorator | number, circle                   | circle | 리스트 데코레이터 모양 |
| size      | 1 <= size <= 6                   | 1      | 글자 크기              |
| color     | HEX code(#00ff00), rgb(00,ff,00) | black  | 글자 색                |
| bold      | true, false                      | false  | 볼드체                 |
| italic    | true, false                      | false  | 이텔릭체               |



### B. 출력 기능 💡

- 입력된 텍스트를 파싱하여 슬라이드 구성
- 슬라이드로 프레젠테이션 구현



#### 1) 일반 화면에서의 slide

- [추가] cirular 모양으로 움직이는 carousel로 구성



#### 2) 프레젠테이션 발표 모드

- javascript의 fullscreen을 사용한 발표 모드 구현

- 키보드 및 마우스로 슬라이드 조작

(구글 프레젠테이션의 발표 모드 참고)

- 마우스 궤적을 따라서 색상을 브라우저에 표현하는 기능(포인터)
- 왼쪽 하단에 조작 버튼 뛰우기
- 발표 스크립트 및 타이머 기능 추가(전체 모드 창과 다른 창에서 띄우기)



### C. 추가 기능

- [ ] PDF 내보내기
- [ ] 파일 입력창 만들기
- [ ] 프레젠테이션 전환 에니메이션 구현
- [ ] 입력기에서 자동으로 옵션 목록 hover로 띄우기
- [ ] 출력요소(표, 마크다운 이모지, 자바스크립트 코드) 추가
- [ ] 성능 테스트
- [ ] IE10 이상, 다른 모던 브라우저를 지원



## III. 설계

✔️ 구현하기 어려워보이는 단일 작업에 대한 사전 조사

✔️ 내부 코드 설계



#### 1) 슬라이드 입력 및 파싱(feat. virtual DOM)

- 발표 스크립트는 section 내부의 memo태그로 받아오고, memo는 section 부분에 보여지지 않는다.
- memo 태그는 section 내부에 단 한개만 존재하도록 해야하며, 여러 개가 보인다면? 합치는 작업을 수행해야 한다.
- memo 태그가 사용되지 않아도 section은 빈 memo를 가지고 있어야 한다.



1. `textarea`에서 마크업을  입력 받는다.

2. 해당 마크업을 파싱하여 배열을 구성한다.

   - `<slide></slide>` 혹은 `<div.slide>` 을 기준으로 파싱

   ```javascript
   [{
     type: 'section',
     props: {
       id: '1',
       class: 'slide',
     },
     children: [
       {
         type: 'div',
         {
         	props:{
         		class: 'memo',
       		}
       	}
       },
       {
         type: 'h1',
         children: ['this is title!']
       },
       {
         type: 'ul',
         props: {},
         children: [
           {
             type: 'li',
             props: {
               color: "red",
             },
             children: ['item1'],
           },{
             type: 'li',
             children: ['item2'],
           }
         ]
       },
     ]
   }]
   ```
   
3. [babel jsx](https://www.npmjs.com/package/babel-plugin-transform-react-jsx)를 사용해 가상 DOM 생성

4. 실제 DOM에 가상 DOM 그리기

5. 가상 DOM 업데이트(추가, 삭제, 변경) 함수 작성



>😦 **2-way binding VS virtual DOM**
>
>- 2-way binding : 출력값과 모델값이 동기화된다.
>- virtual DOM : 필요한 부분만 빠르게 렌더링할 수 있어, 돔 트리 전체를 뒤지거나 화면 전체를 다시 그릴 필요가 없다.
>
>이번 프로젝트의 경우, 텍스트 필드에서 변경 사항이 생기면 빠르게 그 부분에 해당하는 DOM을 조작해야한다. 또한, 입력 텍스트가 많아지거나 변경이 많은 경우 성능에서 문제가 될 수 있다.



#### 2) 발표모드 설정

1. requestFullscreen, cancelFullscreen, toggleFullscreen 함수 생성 및 바인딩

   1. requestFullscreen(arrEL)

      ```javascript
      function requestFullscreen(arrEl){
        /*
        	(1) fullscreen으로 보여줄 carousel 구성
        			- carousel은 각 section.slide를 하나씩 보여준다.
        			- carousel을 넘기는 키 조작은 키보드 방향키와 마우스 클릭(좌우 hover button)으로 진행
        			- [추가] carousel 넘어가는 애니메이션 설정(section.slide에 animation 부분의 값)
        			
        	(2) 슬라이드 메뉴를 보여주는 DOM 객체 생성해서 carousel 바깥부분에 삽입
        			- 타이머, 스크립트를 새창으로 보여주는 기능
        */
        carousel.requestFullScreen;
      }
      ```
      
      - arrEL은 section.slide 객체 배열
      
   2. cancelFullscreen
   
      ```javascript
      function cancelFullscreen(el){
        el.cancelFullScreen;
      }
      ```
   
   - el에는 fullscreen target이 아니라 해당 document 자체
   
2. carouselControll 함수 생성 및 carousel 스타일 구현

   1. carouselControll()

      ```javascript
      function carouselControll(){
        // carousel slide 버튼 조작
      }
      ```
      
   2. carousel 스타일 구현
   
   3. carousel 전환 애니메이션 효과 지정



#### 3) 발표 스크립트 창

1. 발표 모드의 carousel 위에 띄어진 메뉴 버튼을 클릭
2. 타이머 설정과 발표 스크립트가 보이는 새창이 띄어짐



#### 4) 예외 찾기

- 지정된 문법을 제대로 사용하지 않고 입력한 경우


#### 5) 추가

- 링크 기능
- 수정하고 있는 부분을 프레젠테이션으로 포커스


#### 6) 참고 링크

- virtual dom : [참고 1](https://medium.com/@enro2414_40667/virtual-dom-%EB%B2%84%EC%B6%94%EC%96%BC-%EB%8F%94-%EA%B0%80%EC%83%81-%EB%8F%94-%EC%9D%84-%EC%A7%81%EC%A0%91-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90-1c44606ea9b1), [참고 2](https://wonism.github.io/deep-dive-into-vdom/)
- 2-way binding : [참고 1](https://www.it-swarm.dev/ko/javascript/javascript%EC%97%90%EC%84%9C-dom-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EB%B0%94%EC%9D%B8%EB%94%A9%EC%9D%84-%EA%B5%AC%ED%98%84%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95/1073759748/)
- fullscreen : [참고 1](https://www.it-swarm.dev/ko/javascript/javascript%EB%A1%9C-%EC%B0%BD%EC%9D%84-%EC%A0%84%EC%B2%B4-%ED%99%94%EB%A9%B4%EC%9C%BC%EB%A1%9C-%EB%A7%8C%EB%93%9C%EB%8A%94-%EB%B0%A9%EB%B2%95-%ED%99%94%EB%A9%B4-%EC%A0%84%EC%B2%B4%EC%97%90-%EC%8A%A4%ED%8A%B8%EB%A0%88%EC%B9%AD/967287376/), [참고 2](https://developer.mozilla.org/ko/docs/Web/API/Fullscreen_API/Guide), [참고3](https://www.cssscript.com/responsive-fullscreen-carousel/)
- carousel : [참고 1](https://medium.com/@wooder2050/%EB%B0%94%EB%8B%90%EB%9D%BC%EC%BD%94%EB%94%A9-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EC%BA%90%EB%9F%AC%EC%85%80-carousel-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-1dbad1b3c7ac), [참고 2](https://www.w3schools.com/howto/howto_js_slideshow.asp)