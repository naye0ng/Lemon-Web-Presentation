export const POPUP_HTML = `
<div class="presentaion-helper">
<div class="timer-and-viewer">
  <div id="timer">
    <div id="time-view">00:00:00</div>
    <div class="buttons">
      <button id="start-timer">시작</button>
      <button id="stop-timer">정지</button>
      <button id="reset-timer">초기화</button>
    </div>
  </div>
  <div id="viewer">
  </div>
</div>
<div class="controller-and-note">
  <div id="slide-controller">
    <div id="total">슬라이드 1 / 11</div>
    <div class="buttons">
      <button id="before">이전</button>
      <button id="next">다음</button>
    </div>
  </div>
  <div id="presentation-note"></div>
</div>
</div>`;

export const POPUP_STYLE = `
* {
  box-sizing: border-box;
}

*:focus {
  outline: none;
}
body {
  font-size: 14px;
  line-height: 1.35;
  font-family: 'SF Pro Text Regular', 'AppleSDGothicNeo', sans-serif;
}

body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background: #f1f1f1;
}

.presentation-helper {
  width: 100%;
  height: 100%;
}

.timer-and-viewer,
.controller-and-note {
  display: inline-block;
  height: 300px;
  float: left;
}

.timer-and-viewer {
  width: 250px;
  border-right: 1.2px solid #cecece;
  ;
}

.controller-and-note {
  width: 250px;
}

#timer,
#slide-controller,
#presentation-note,
#viewer {
  display: flex;
  align-items: center;
}

#viewer {
  height: calc(100% - 60px);
  justify-content: center;
}

#timer {
  height: 60px;
  padding: 0 10px;
  background: #ffffff;
  border-bottom: 1.2px solid #cecece;
  justify-content: space-between;
}

#time-view {
  font-size: 16.5px;
  letter-spacing: .1rem;
  font-weight: 600;
}

#slide-controller {
  height: 60px;
  padding: 5px;
  border-bottom: 1.2px solid #cecece;
  justify-content: space-between;
}

#presentation-note {
  overflow-y: scroll;
  display: block;
  height: calc(100% - 60px);
  padding: 15px;
  background: #ffffff;
  white-space: pre-wrap;
  font-size: 12px;
}

#total {
  padding: 0 10px;
  font-size: 12px;
}

button {
  border: 1px solid #cecece;
  border-radius: 5px;
  font-size: 12px;
}

button:hover,
#before:hover,
#next:hover,
button.active {
  background-color: #f4d569;
}

#before,
#next {
  padding: 5px 20px;
  margin: 5px;
  background: #ffffff;
}

#start-timer,
#stop-timer,
#reset-timer {
  width: 40px;
  padding: 5px 0;
  margin: 2px;
  font-size: 12px;
}

#start-timer.active{
  background-color: #705aff;
}

.slide {
  width: 220px;
  height: calc(220px * 9 / 16);
  overflow: hidden;
  background: #ffffff;
  white-space: pre-wrap;
  flex-shrink: 0;
  border-radius: 3px;
}
.slide-contents {
  overflow: hidden;
  -ms-overflow-style: none;
  scrollbar-width: none;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: 4%;
  font-size: 2rem;
}

.slide-viewer .slide-contents {
  overflow: scroll;
}

.slide-viewer .slide-contents::-webkit-scrollbar {
  display: none;
}

.slide-contents h1, .head-1 {
  font-size: 5rem;
}

.slide-contents h2, .head-2 {
  font-size: 4.3rem;
}

.slide-contents h3, .head-3 {
  font-size: 3.7rem;
}

.slide-contents h4, .head-4 {
  font-size: 3.4rem;
}

.slide-contents h5, .head-5 {
  font-size: 3rem;
}

.slide-contents h6, .head-6 {
  font-size: 2rem;
}

.slide ul.list-style-number li {
  list-style: decimal inside;
}

.slide ul.list-style-circle li {
  list-style: disc inside;
}

.slide ul {
  margin: 0 3%;
}

.slide img {
  display: flex;
  width: 50%;
  margin: auto;
}`;

