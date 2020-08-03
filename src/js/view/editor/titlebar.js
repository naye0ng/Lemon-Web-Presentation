import View from '../view';
import {createCustomElement} from '../../Utils/DOMConstructor';

class Titlebar extends View {
  constructor () {
    super();

    this.$view = createCustomElement('div', {class: 'titlebar'});
    this.$presentationTitle = createCustomElement('div', {class: 'presentation-info'});
    this.$inputTitle = createCustomElement('input', {id: 'presentation-title', type: 'text', placeholder: '제목 없는 프레젠테이션'});
    this.$presentationTitle.append(this.$inputTitle);

    this.$selectSavedFile = createCustomElement('select', {name: 'presentation'});
    this.$presntationCRUDButton = createCustomElement('div', {class: 'presentation-btn'});
    this.$presntationCRUDButton.innerHTML =
      '<button id="new">새 프레젠테이션</button>' +
      '<button id="delete">저장 기록 삭제</button>' +
      '<button id="save">저장</button>';

    this.$presentationMenu = createCustomElement('div', {class: 'presenteation-menu'});
    this.$presentationMenu.append(this.$selectSavedFile, this.$presntationCRUDButton);
    this.$view.append(this.$presentationTitle, this.$presentationMenu);
  }
}

export default Titlebar;
