export default function UsageModal () {
  const element = document.querySelector('#modal');

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
      description: '<span class="badge">img</span> 태그도 사용이 가능합니다. 가운데 정렬이 기본입니다.',
      tag: '<image :float="left" :width="30%" :path="https://bit.ly/3fDSLso"></image>',
    },
    {
      name: '④ 리스트와 아이템',
      description: '<span class="badge">decorator</span> 속성을 이용하면, <span class="badge">ol</span> 및 <span class="badge">ul</span>태그와 같은 리스트를 만들 수 있습니다.',
      tag: `<list :decorator="circle"> \n\t<item>아메리카노</item> \n\t<item :color="red">카페라떼</item>\n\t<list :decorator="number">\n\t\t<item>아이스</item>\n\t\t<item>핫</item>\n\t</list>\n</list>`,
    },
  ];

  const render = function () {
    element.innerHTML = `
      <div id="usage-modal" class="modal">
        <div class="title">
          👩🏻‍💻프레젠테이션 사용법
        </div>
        <div class="subtitle">제목, 텍스트, 이미지, 리스트 태그를 기본적으로 제공하며, html을 모르는 일반 사용자들을 위해 새롭게 정의한 직관적인 마크업 태그를
          지원합니다.</div>
        <div class="usage-viewer"></div>
        <button id="github">+ 더 자세한 설명을 보려면 여기를 클릭하세요!</button>
      </div>`;
  };

  const renderUsageItem = function () {
    const $usageViewer = element.querySelector('.usage-viewer');
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

  const addListener = function () {
    element.querySelector('#github').addEventListener('click', () => {
      window.open('https://github.daumkakao.com/kelley-j/Lemon-Presentation', '_blank');
    });
  };

  this.init = function () {
    render();
    renderUsageItem();
    addListener();
  };
}
