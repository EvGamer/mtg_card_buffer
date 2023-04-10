import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cards: [],
    isTableOpen: false,
  },
  mutations: {
    toggleTable(state) {
      state.isTableOpen = !state.isTableOpen;
    }
  }
});
