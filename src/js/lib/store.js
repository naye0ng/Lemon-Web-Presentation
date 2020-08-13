import PubSub from './pubsub';

export default class Store {
  constructor (params) {
    this.events = new PubSub();

    this.actions = params.actions;
    this.mutations = params.mutations;

    this.status = 'resting';
    this.state = new Proxy(params.state, {
      set (state, key, value) {
        state[key] = value;

        this.events.publish('stateChange', this.state);
        this.status = 'resting';
        return true;
      },
    });
  }

  dispatch (action, payload) {
    if (typeof this.actions[action] !== 'function') return false;
    this.status = 'action';
    this.actions[action](this, payload);
    return true;
  }

  commit (mutation, payload) {
    if (typeof this.mutations[mutation] !== 'function') return false;
    const newState = this.mutations[mutation](this.state, payload);
    this.state = Object.assign(this.state, newState);
    return true;
  }
}
