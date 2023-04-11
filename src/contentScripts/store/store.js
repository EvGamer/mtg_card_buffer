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
      context.commit('setIsTableOpen', true);
    },

    toggleTable(context) {
      if (context.state.isTableOpen === false) {
        context.dispatch('loadTable');
      }
      context.dispatch('setIsTableOpen', false);
    }
  }
});
