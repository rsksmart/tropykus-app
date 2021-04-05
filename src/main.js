import { ethers } from 'ethers';
import firebase from 'firebase';
import 'firebase/analytics';
import 'firebase/storage';
import Vue from 'vue';
import { firebaseConfig } from '../firebaseConfig';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/main.scss';

const web3 = new ethers.providers.Web3Provider(window.ethereum);
const format = web3.formatter.formats;
format.receipt.root = format.receipt.logsBloom;
Object.assign(web3.formatter, { format });

// eslint-disable-next-line no-multi-assign
Vue.prototype.$web3 = Vue.web3 = web3;

// eslint-disable-next-line no-multi-assign
Vue.prototype.$firebase = Vue.firebase = firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
