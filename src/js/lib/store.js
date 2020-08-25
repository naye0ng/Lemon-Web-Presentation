import PubSub from './pubsub';

export default function Store (params) {
  this.events = new PubSub();

  this.actions = params.actions;
  this.mutations = params.mutations;
  this.stateEvent = '';
  this.state = new Proxy(params.state, {
    set (state, key, value) {
      state[key] = value;
      return true;
    },
  });

  this.dispatch = function (action, payload = {}) {
    if (typeof this.actions[action] !== 'function') return false;
    this.stateEvent = payload.stateEvent;
    this.actions[action](this, payload);
    return true;
  };

  this.commit = function (mutation, payload) {
    if (typeof this.mutations[mutation] !== 'function') return false;
    const newState = this.mutations[mutation](this.state, payload);
    this.state = Object.assign(this.state, newState);

    this.events.publish(this.stateEvent, this.state);
    this.stateEvent = '';

    return true;
  };
}
