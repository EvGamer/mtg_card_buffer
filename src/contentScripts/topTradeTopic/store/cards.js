import Vue from 'vue';
import { sendAddCardMessage } from '../../../background/messages';
import Scryfall from '../api/Scryfall';

import { parsePostToCards } from '../parser';

export default {
  namespaced: true,
  state: {
    isTableOpen: false,
    list: [],
    pageSize: 15,
    currentPage: 1,
    scryfallQuery: '',
    scryfallSearchResults: [],
    filters: {
      name: '',
    },
    order: [],
  },

  mutations: {
    setIsTableOpen(state, payload) {
      state.isTableOpen = payload;
    },

    setList(state, payload) {
      console.log('set list', payload);
      state.list = payload;
    },

    setCurrentPage(state, payload) {
      state.currentPage = payload;
    },

    setPageSize(state, { pageSize, currentPage }) {
      state.pageSize = pageSize;
      state.currentPage = currentPage;
    },

    setFilters(state, payload) {
      Vue.set(state, 'filters', payload);
      state.currentPage = 1;
    },

    setScryfallSearchResults(state, payload) {
      state.scryfallSearchResults = payload;
    }
  },

  actions: {
    async loadTable(context) {
      const postContentElement = document.querySelector('.cPost .cPost_contentWrap');

      if (context.rootState.sets.list.length < 1) {
        await context.dispatch('sets/fetch');
      }

      const cards = parsePostToCards(postContentElement);

      context.commit('setList', cards);
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
    },

    async searchOnScryfall(context, query) {
      if (!query) {
        context.commit('setScryfallSearchResults', []);
      }

      try {
        console.log('queue scryfall request');
        const response = await Scryfall.search(query);
        console.log('request resolved');
        const responseData = await response.json()
        console.log(responseData)
      } catch (error) {
        console.error(error.status);
        if (error.response) {
          console.log(error.response);
          console.error(error.response.error());
        }
      }
    }
  },

  getters: {
    filteredByScryfall({ scryfallSearchResults, list }) {
      return list;
    },

    filtered({ list, filters, currentPage, pageSize }) {
      const l = v => {
        console.log('list', v);
        return v;
      }

      console.log(`page: ${currentPage}, page size: ${pageSize}, `);
      console.log('filters', filters.name);

      return l(list
        .filter((card) => (
          (!filters.name || card.name.toLowerCase().includes(filters.name.toLowerCase()))
        ))
        .slice((currentPage - 1) * pageSize, currentPage * pageSize)
      );
    },

    total(state) {
      return state.list.length
    }
  }
}
