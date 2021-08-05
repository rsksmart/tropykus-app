import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes';
import * as constants from '@/store/constants';
import store from '../store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === constants.ROUTE_NAMES.BALANCE) {
    if (to.matched.some((record) => record.meta.requiredWallet)) {
      if (store.getters.SESSION_IS_CONNECTED) {
        store.dispatch(constants.SESSION_SHOW_DIALOG_CONNECT, false);
        next();
      } else {
        store.dispatch(constants.SESSION_SHOW_DIALOG_CONNECT, true);
      }
    }
  } else {
    next();
  }
  if (from.name === null && to.name === constants.ROUTE_NAMES.BALANCE) {
    next({ path: '/' });
    store.dispatch(constants.SESSION_SHOW_DIALOG_CONNECT, false);
  }
});

export default router;
