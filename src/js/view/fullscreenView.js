import View from './view';

class FullscreenView extends View {
  constructor () {
    super();
    this.$fullscreen = this.createElement('div', 'id', 'fullscreen');
    this.$fullscreenMenu = this.createElement('div', 'id', 'fullscreen-menu');
    this.$fullscreenContents = this.createElement('div', 'id', 'fullscreen-contents');

    this.$fullscreen.append(this.$fullscreenMenu, this.$fullscreenContents);
    this.$app.append(this.$fullscreen);
  }
}

export default FullscreenView;
