import Vue from 'vue';
import Vuex from 'vuex';
import { sendAddCardMessage } from '../../../background/messages';

import { parsePostToCards } from '../parser';

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
        return;
      }
      context.commit('setIsTableOpen', false);
    },

    async addToCart(context, card) {
      sendAddCardMessage({
        id: card.id,
        name: card.name,
        count: 1,
        price: card.price,
      })
    }
  }
});
