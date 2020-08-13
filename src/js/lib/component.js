export default class Component {
  constructor (props = {}) {
    this.render = this.render || function () {};
    this.element = props.element;

    props.store.events.subscribe('stateChange', this.render.bind(this));
  }
}
