import { sendAddCardMessage } from '../../../background/messages';

import { parsePostToCards } from '../parser';

export default {
  state: {
    list: [],
    pageSize: 15,
    currentPage: 0,
    scryfallQuery: '',
    scryfallSearchResults: [],
    filters: {
      name: '',
    },
    order: [],
    isTableOpen: false,
  },

  mutations: {
    setIsTableOpen(state, payload) {
      state.isTableOpen = payload;
    },

    setCards(state, payload) {
      state.cards = payload;
    },

    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },

    setPageSize(state, { pageSize, currentPage }) {
      state.pageSize = payload;
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
  },

  getters: {
    filtered({ list, filters }) {

      return list
        .filter((card) => (
          (!filters.name || card.name.includes(filters.name))
        ))
        .slice(currentPage * pageSize, pageSize);
    },

    total(state) {
      return state.list.length
    }
  }
}
