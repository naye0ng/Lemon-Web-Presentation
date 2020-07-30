import View from './view';

class NavigationView extends View {
  constructor (controller) {
    super();

    this.controller = controller;
    this.$navigation = this.createElement('div', {class: 'navigation'});
    this.$lemon = this.createElement('div', {class: 'lemon-logo'});
    this.$navContents = this.createElement('div');
    this.$fullscreenBtn = this.createElement('button', {id: 'start-fullscreen-0', class: 'fullscreen-btn'}, '슬라이드 쇼');
    this.$fullscreenNthSlideBtn = this.createElement('button', {id: 'start-fullscreen-nth', class: 'fullscreen-btn'}, '현재 슬라이드부터 쇼');
    this.$navContents.append(this.$fullscreenBtn, this.$fullscreenNthSlideBtn);
    this.$navigation.append(this.$lemon, this.$navContents);
    this.init();
  }

  init () {
    this.initListeners();
    this.render(this.$navigation);
  }

  initListeners () {
    this.$navigation.addEventListener('click', ({target}) => {
      const {id} = target;
      if (!id) return;
      return this.controller.startFullscreen(id === 'start-fullscreen-nth');
    });
  }
}

export default NavigationView;
