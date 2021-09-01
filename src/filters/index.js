import Vue from 'vue';
import * as constants from '../store/constants';

Vue.filter('formatPrice', (value) => value
  .toString().substr(0, 6));
Vue.filter('formatDecimals', (value, token) => (token === constants
  .RBTC_SYMBOL ? value.toString().substr(0, 6) : value
    .toString().substr(0, 4)));
