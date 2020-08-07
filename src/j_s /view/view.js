class View {
  constructor () {
    if (this.constructor === View) throw new TypeError('View is abstract class');
    this.$app = document.querySelector('#app');
  }

  renderNthChild (childEl, parentEl, n) {
    parentEl.insertBefore(childEl, parentEl.childNodes[n]);
  }

  render (childEl, parentEl = this.$app) {
    parentEl.append(childEl);
  }
}

export default View;
