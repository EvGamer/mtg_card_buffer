import Vue from 'vue';

import ToolbarComponent from './Toolbar.vue';

import { store } from '../../store';

export const Toolbar = Vue.extend({
  render: createElement => createElement(ToolbarComponent),
  store,
})
