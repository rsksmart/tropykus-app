import { ethers } from 'ethers';
import firebase from 'firebase';
import 'firebase/analytics';
import 'firebase/storage';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import * as chart from 'chart.js';
import { firebaseConfig } from '../firebaseConfig';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/main.scss';

require('./filters');

sync(store, router);

const web3 = new ethers.providers.JsonRpcProvider('https://public-node.testnet.rsk.co');
const format = web3.formatter.formats;
format.receipt.root = format.receipt.logsBloom;
Object.assign(web3.formatter, { format });
// eslint-disable-next-line no-multi-assign
Vue.prototype.$web3 = Vue.web3 = web3;

const web3Ws = new ethers.providers.JsonRpcProvider(process.env.VUE_APP_RSK_NODE);
const formatWs = web3Ws.formatter.formats;
formatWs.receipt.root = formatWs.receipt.logsBloom;
Object.assign(web3Ws.formatter, { format: formatWs });
// eslint-disable-next-line no-multi-assign
Vue.prototype.$web3Ws = Vue.web3Ws = web3Ws;

// eslint-disable-next-line no-multi-assign
Vue.prototype.$firebase = Vue.firebase = firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  chart,
  render: (h) => h(App),
}).$mount('#app');
