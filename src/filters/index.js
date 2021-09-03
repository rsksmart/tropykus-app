
import Vue from 'vue';
import * as constants from '../store/constants';

Vue.filter('formatPrice', (value) => `$ ${Number(value)
  .toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`);

Vue.filter('formatDecimals', (value, token) => (token === constants.RBTC_SYMBOL ? Number(value)
  .toLocaleString('es', { minimumFractionDigits: 7, maximumFractionDigits: 7 }) : Number(value)
  .toLocaleString('es', { minimumFractionDigits: 4, maximumFractionDigits: 4 })));