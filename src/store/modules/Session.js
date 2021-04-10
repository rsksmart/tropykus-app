import store from '@/store';
import * as constants from '@/store/constants';
import Vue from 'vue';
import { ethers } from 'ethers';

if (window.ethereum) {
  window.ethereum.on('accountsChanged', () => {
    store.dispatch(constants.SESSION_CONNECT_WEB3);
  });
  window.ethereum.on('chainChanged', () => {
    store.dispatch(constants.SESSION_GET_CHAIN_ID);
  });
}

const state = {
  walletAddress: undefined,
  account: undefined,
  wallet: undefined,
  chainId: 31,
};

const actions = {
  [constants.SESSION_CONNECT_WEB3]: async ({ commit, dispatch }, wallet) => {
    if (window.ethereum) {
      await window.ethereum.enable();
      // eslint-disable-next-line no-multi-assign
      Vue.prototype.$web3 = Vue.web3 = new ethers.providers.Web3Provider(window.ethereum);
      const account = await Vue.web3.getSigner();
      const walletAddress = await account.getAddress();
      commit(constants.SESSION_SET_PROPERTY, { account });
      commit(constants.SESSION_SET_PROPERTY, { walletAddress });
      commit(constants.SESSION_SET_PROPERTY, { wallet });
      dispatch(constants.SESSION_GET_CHAIN_ID);
    }
  },
  [constants.SESSION_GET_CHAIN_ID]: async ({ commit }) => {
    if (window.ethereum) {
      const chainId = window?.ethereum?.chainId ?? 31;
      commit(constants.SESSION_SET_PROPERTY, { chainId: Number(chainId) });
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

const getters = {
  // eslint-disable-next-line no-shadow
  [constants.SESSION_GET_WALLET_NAME]: (state) => {
    switch (state.wallet) {
      case constants.WALLET_LIQUALITY:
        return 'Liquality';
      case constants.WALLET_METAMASK:
        return 'MetaMask';
      default:
        return 'wallet';
    }
  },
  // eslint-disable-next-line no-shadow
  [constants.SESSION_IS_CONNECTED]: (state) => !!state.account,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
