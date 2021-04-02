import Vue from 'vue';
import Web3 from 'web3';
import firebase from 'firebase';
import 'firebase/analytics';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/main.scss';
import vuetify from './plugins/vuetify';
import 'firebase/storage';
import { firebaseConfig } from '../firebaseConfig';

Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig);
Vue.prototype.$web3 = new Web3(Web3.givenProvider || 'ws://localhost:8545');
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
