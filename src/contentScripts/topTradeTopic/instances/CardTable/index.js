import Vue from 'vue';

import CardTableComponent from './CardTable.vue';

import { store } from '../../../store';

export const CardTable = Vue.extend({
  render: createElement => createElement(CardTableComponent),
  store,
})