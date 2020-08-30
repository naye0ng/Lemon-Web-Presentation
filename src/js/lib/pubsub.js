export default function PubSub () {
  this.events = new Map();

  this.subscribe = function (event, callback) {
    if (!this.events.get(event)) {
      this.events.set(event, []);
    }
    return this.events.get(event).push(callback);
  };

  this.publish = function (event, data = {}) {
    if (!this.events.get(event)) return [];
    return this.events.get(event).map(callback => callback(data));
  };
}
