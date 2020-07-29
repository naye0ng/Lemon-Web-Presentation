class View {
  constructor () {
    if (this.constructor === View) throw new TypeError('View is abstract class');
    this.$app = document.querySelector('#app');
  }

  // TODO : util로 빼는 것이 좋을까?
  createElement (tag, attrs = {}, contents) {
    const el = document.createElement(tag);

    Object.entries(attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });

    if (contents) el.innerHTML = contents;
    return el;
  }

  renderNthChild (childEl, parentEl, n) {
    parentEl.insertBefore(childEl, parentEl.childNodes[n]);
  }

  render (childEl, parentEl = this.$app) {
    parentEl.append(childEl);
  }
}

export default View;
