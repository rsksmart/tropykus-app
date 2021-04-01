import Vue from 'vue';
import Web3 from 'web3';
import * as constants from '@/store/constants';

const state = {
  account: undefined,
};

const actions = {
  [constants.SESSION_CONNECT_WEB3]: async ({ commit }) => {
    if (window.ethereum) {
      Vue.prototype.$web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      const accounts = await Vue.prototype.$web3.eth.getAccounts();
      commit(constants.SESSION_SET_PROPERTY, { account: accounts[0] });
    }
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_SET_PROPERTY]: (state, data) => {
    const [[property, value]] = Object.entries(data);
    state[property] = value;
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
