import Vue from 'vue';
import Scryfall from '../api/Scryfall';

export default {
  namespaced: true,
  state: {
    list: [],
    isLoading: false,
  },
  mutations: {
    fetchSuccess(state, payload) {
      Vue.set(state, 'list', payload);
      state.isLoading = false;
    },
    fetchStart(state) {
      state.isLoading = true;
    }
  },
  actions: {
    async fetch(context) {
      context.commit('fetchStart');

      const response = await Scryfall.fetchSets();
      const responseBody = await response.json();

      const { data } = responseBody;

      const mtgSets = data.map(set => ({
        code: set.code,
        name: set.name,
        iconUrl: set.icon_svg_uri,
      }))

      console.log('set list', mtgSets);

      context.commit('fetchSuccess', mtgSets)
    }
  }
}
