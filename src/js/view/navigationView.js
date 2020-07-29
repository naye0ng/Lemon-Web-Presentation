import View from './view';

class NavigationView extends View {
  constructor (controller) {
    super();

    this.controller = controller;
    this.$navigation = this.createElement('div', {class: 'navigation'});
    this.$lemon = this.createElement('div', {class: 'lemon-logo'});
    this.$startFullscreen = this.createElement('button', {id: 'start-fullscreen'}, '슬라이드 쇼');
    this.$startFullscreenNthSlide = this.createElement('button', {id: 'start-fullscreen-nth'}, '현재 슬라이드부터 쇼');
    this.$navigation.append(this.$lemon, this.$startFullscreen, this.$startFullscreenNthSlide);
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
      this.controller.startFullscreen(id === 'start-fullscreen-nth');
    });
  }
}

export default NavigationView;
