import Vue from 'vue';

Vue.filter('formatPrice', (value) => `$ ${Number(value).toLocaleString('es', { minimumFractionDigits: 4 })}`);

Vue.filter('formatDecimals', (value) => Number(value).toLocaleString('es', { minimumFractionDigits: 4 }));
