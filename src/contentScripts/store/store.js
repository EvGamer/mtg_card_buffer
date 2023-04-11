import Vue from 'vue';
import Vuex from 'vuex';
import { parsePostToCards } from '../topTradeTopic/parser';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cards: [],
    isTableOpen: false,
  },

  mutations: {
    setIsTableOpen(state, payload) {
      state.isTableOpen = payload;
    },

    setCards(state, payload) {
      state.cards = payload;
    }
  },

  actions: {
    loadTable(context) {
      const postContentElement = document.querySelector('.cPost .cPost_contentWrap');

      const cards = parsePostToCards(postContentElement);

      context.commit('setCards', cards);
    },

    async toggleTable(context) {
      if (context.state.isTableOpen === false) {
        await context.dispatch('loadTable');
        context.commit('setIsTableOpen', true);
      }
      context.commit('setIsTableOpen', false);
    }
  }
});
