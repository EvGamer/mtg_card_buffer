import Vue from 'vue';
import { sendAddCardMessage } from '../../../background/messages';
import Scryfall from '../api/Scryfall';
import { CardDisplayMode } from '../const/CardDisplayMode';

import { parsePostToCards } from '../parser';

export default {
  namespaced: true,
  state: {
    displayMode: null,
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
      state.displayMode = payload ? CardDisplayMode.table : null;
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
      if (context.getters.isTableOpen === false) {
        if (context.state.displayMode === null) {
          await context.dispatch('loadTable');
        }
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
      return list
        .filter((card) => (
          (!filters.name || card.name.toLowerCase().includes(filters.name.toLowerCase()))
        ))
        .slice((currentPage - 1) * pageSize, currentPage * pageSize);
    },

    isTableOpen(state) {
      return state.displayMode === CardDisplayMode.table;
    },

    total(state) {
      return state.list.length
    }
  }
}
