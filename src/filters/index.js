import Vue from 'vue';

Vue.filter('formatPrice', (value) => `$ ${Number(value).toLocaleString('es')}`);

Vue.filter('twoDecimals', (value) => `${value.toFixed(2)
  .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`);
