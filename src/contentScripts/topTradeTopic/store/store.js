import Vue from 'vue';
import Vuex from 'vuex';

import cards from './cards';

import { sendAddCardMessage } from '../../../background/messages';

import { parsePostToCards } from '../parser';

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: { cards }
});
