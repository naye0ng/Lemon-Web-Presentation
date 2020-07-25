class View {
  constructor () {
    this.$app = this.getElement('#app');
  }

  getElement (selector) {
    const element = document.querySelector(selector);
    return element;
  }

  createElement (tag, attr, value) {
    const element = document.createElement(tag);
    if (attr) element.setAttribute(attr, value);
    return element;
  }

  render (childElement, parentElement) {
    (parentElement || this.$app).append(childElement);
  }
}

export default View;
