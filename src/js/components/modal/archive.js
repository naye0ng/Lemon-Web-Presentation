import Component from '../../lib/component';
import store from '../../store/store';

export default class Archive extends Component {
  constructor () {
    super({
      store,
      element: document.querySelector('#modal'),
    });
  }

  render () {
    this.element.innerHTML = `
      <div id="archive-modal" class=" modal">
        <div class="archive-header">
          <div class="title">Archive</div>
          <div class="subtitle">파일을 클릭하여 저징된 프레젠테이션을 불러올 수 있습니다.</div>
        </div>
        <div class="archive-list"></div>
      </div>`;
  }
}
