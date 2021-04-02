import Vue from 'vue';
import Web3 from 'web3';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/main.scss';
import vuetify from './plugins/vuetify';

// eslint-disable-next-line no-multi-assign
Vue.prototype.$web3 = Vue.web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
