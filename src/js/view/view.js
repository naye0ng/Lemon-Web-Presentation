class View {
  constructor () {
    this.$app = this.getElement('#app');
  }
  createElement (tag, attr, value) {
    const element = document.createElement(tag);
    if (attr) element.setAttribute(attr, value);
    return element;
  }

  getElement (selector) {
    const element = document.querySelector(selector);
    return element;
  }
}

export default View;
