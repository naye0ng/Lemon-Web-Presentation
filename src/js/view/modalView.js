const modalView = () => {
  const $modal = document.querySelector('#modal');

  const renderFullscreenModal = slideSize => {
    $modal.innerHTML = `
      <div id="presentation-modal" class="modal">
        <div class="title">👩🏻‍💻프레젠테이션 설정이 필요합니다. </div>
        <div class="subtitle">애니메이션과 시작 슬라이드 번호를 입력해주세요!</div>
        <div class="pt-slide-viewer"></div>
        <div class="input-slide-number">
            <label>✔️ 시작 슬라이드 번호 (총 ${slideSize}개) : </label>
            <input id="slide-number3" type="number" min="1" max="${slideSize}" value="1" />
        </div>
        <div class="select-animation">
            <label>✔️ 슬라이드 애니메이션 :</label>
            <select id="animation" name="animation">
                <option value="">효과 없음</option>
                <option value="horizontal">가로 슬라이드</option>
            </select>
        </div>
        <div class="helper">
            <p>발표 도구에서는 슬라이드 이동과 타이머, 발표 노트 보기 등을 활용할 수 있습니다.</p>
            <button id="popup">발표 도구 열기</button>
        </div>
        <div id="confirm">
            <button id="cancel">취소</button>
            <button id="show">슬라이드 쇼</button>
        </div>
      </div>`;
  };

  const renderUsageModal = () => {
    $modal.innerHTML = `
    <div id="usage-modal" class="modal">
      <div class="title">
        👩🏻‍💻프레젠테이션 사용법
      </div>
      <div class="subtitle">제목, 텍스트, 이미지, 리스트 태그를 기본적으로 제공하며, html을 모르는 일반 사용자들을 위해 새롭게 정의한 직관적인 마크업 태그를
        지원합니다.</div>
      <div class="usage-viewer"></div>
      <button id="github">+ 더 자세한 설명을 보려면 여기를 클릭하세요!</button>
    </div>`;

    renderUsageItem();
  };

  const usage = [
    {
      name: '① 제목',
      description: 'HTML에서 <span class="badge">h1</span>, <span class="badge">h2</span>, <span class="badge">h3</span>, <span class="badge">h4</span>, <span class="badge">h5</span>, <span class="badge">h6</span> 태그를 의미하며 아래처럼 작성 가능합니다.',
      tag: '<title :size="1" :bold="true" :italic="false">this is title!</title>',
    },
    {
      name: '② 텍스트',
      description: '<span class="badge">p</span> 태그에 해당하는 내용으로 <span class="badge">text</span> 태그를 사용하지 않아도 됩니다.',
      tag: '<text :color="red">this is text</text>',
    },
    {
      name: '③ 이미지',
      description: '<span class="badge">img</span> 태그도 사용이 가능합니다. 가운데 정렬이 기본입니다. \n<span class="badge">width</span> 및 <span class="badge">height</span> 속성의 단위는 <span class="badge">%</span>입니다.',
      tag: '<image :float="left" :width="30" :path="https://bit.ly/3fDSLso"></image>',
    },
    {
      name: '④ 리스트와 아이템',
      description: '<span class="badge">decorator</span> 속성을 이용하면, <span class="badge">ol</span> 및 <span class="badge">ul</span>태그와 같은 리스트를 만들 수 있습니다.',
      tag: `<list :decorator="circle"> \n\t<item>아메리카노</item> \n\t<item :color="red">카페라떼</item>\n\t<list :decorator="number">\n\t\t<item>아이스</item>\n\t\t<item>핫</item>\n\t</list>\n</list>`,
    },
  ];

  const renderUsageItem = () => {
    const $usageViewer = $modal.querySelector('.usage-viewer');
    usage.forEach(item => {
      $usageViewer.insertAdjacentHTML('beforeend', `
      <div class="usage-item">
        <div class="tag-name">${item.name}</div>
        <div class="tag-description">${item.description}</div>
        <div class="tag-text">
          <pre>${item.tag.replace(/</gi, '&lt;').replace(/>/gi, '&gt;')}</pre>
        </div>
      </div>`);
    });
  };

  return {
    $modal,
    renderFullscreenModal,
    renderUsageModal,
  };
};

export default modalView;
