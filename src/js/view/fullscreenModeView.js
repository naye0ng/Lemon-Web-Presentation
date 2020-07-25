import View from './view';

class FullscreenModeView extends View {
  constructor (controller) {
    super();
    this.controller = controller;

    this.$fullscreen = this.createElement('div', 'id', 'fullscreen');
    this.$fullscreenMenu = this.createElement('div', 'id', 'fullscreen-menu');
    this.$fullscreenContents = this.createElement('div', 'id', 'fullscreen-contents');
    this.$fullscreen.append(this.$fullscreenMenu, this.$fullscreenContents);

    this.render(this.$fullscreen);
  }
}

export default FullscreenModeView;
