import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    cards: [
      { 
        id: 1,
        name: "Plains",
        set: "MRD",
        quantity: 69,
        quality: "SP",
        language: "EN",
        price: 5,
      },
      { 
        id: 3,
        name: "Plains",
        set: "ZRN",
        quantity: 1,
        quality: "SP",
        language: "EN",
        price: 5,
        extra: "Full Art",
      },
      {
        id: 2,
        name: "Clock of Omens",
        set: "M13",
        quantity: 1,
        quality: "NM",
        language: "RU",
        price: 100,
        extra: "Foil",
      }
    ],
    isTableOpen: false,
  },
  mutations: {
    toggleTable(state) {
      state.isTableOpen = !state.isTableOpen;
    }
  }
  
});
