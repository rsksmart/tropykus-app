import Vue from 'vue';
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
firebase.analytics();

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
