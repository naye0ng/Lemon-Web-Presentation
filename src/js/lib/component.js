export default class Component {
  constructor (props = {}) {
    this.element = props.element;
    this.store = props.store;
  }

  subscribeStateEvent (event, callback) {
    this.store.events.subscribe(event, callback.bind(this));
  }
}
