import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/main.scss';
import vuetify from './plugins/vuetify';
import 'firebase/storage';
import firebaseConfig from '../firebaseConfig.json';

Vue.prototype.$firebase = firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
