import Store from '../lib/store.js';
import actions from './actions';
import mutations from './mutations';
import state from './state';

export default new Store({
  actions,
  mutations,
  state,
});
