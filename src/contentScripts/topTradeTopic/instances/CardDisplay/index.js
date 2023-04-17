import Vue from 'vue';

import CardDisplayComponent from './CardDisplay.vue';

import { store } from '../../store';

export const CardDisplay = Vue.extend({
  render: createElement => createElement(CardDisplayComponent),
  store,
})
