import Vue from 'vue';
import Vuex from 'vuex';

import cards from './cards';
import sets from './sets';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { cards, sets }
});
