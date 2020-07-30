import View from '../view';

class Editor extends View {
  constructor () {
    super();

    this.$view = this.createElement('div', {class: 'editor'});
    this.$rawData = this.createElement('textarea', {id: 'raw-data', class: 'text-editor'});
    this.$PTNote = this.createElement('textarea', {id: 'pt-note', class: 'text-editor', placeholder: '발표자 노트를 추가하려면 클릭하세요.'});

    this.$view.append(this.$rawData, this.$PTNote);
  }
}

export default Editor;
