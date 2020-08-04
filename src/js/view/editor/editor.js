import View from '../view';
import {createCustomElement} from '../../Utils/DOMConstructor';

class Editor extends View {
  constructor () {
    super();

    this.$view = createCustomElement('div', {class: 'editor'});
    this.$originalData = createCustomElement('textarea', {id: 'raw-data', class: 'text-editor'});
    this.$note = createCustomElement('textarea', {id: 'pt-note', class: 'text-editor', placeholder: '발표자 노트를 추가하려면 클릭하세요.'});

    this.$view.append(this.$originalData, this.$note);
  }
}

export default Editor;
