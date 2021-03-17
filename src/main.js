import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/main.scss';
import 'bootstrap';

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
