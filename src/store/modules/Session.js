import Vue from 'vue';
import Web3 from 'web3';
import * as constants from '@/store/constants';

const state = {
  account: undefined,
  wallet: undefined,
};

const actions = {
  [constants.SESSION_CONNECT_WEB3]: async ({ commit }, walletType) => {
    if (window.ethereum) {
      Vue.prototype.$web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
      window.ethereum.on('accountsChanged', async () => {
        const accounts = await Vue.prototype.$web3.eth.getAccounts();
        commit(constants.SESSION_SET_PROPERTY, { account: accounts[0] });
      });
      if (walletType === constants.WALLET_METAMASK && window.ethereum.isMetaMask) {
        const accounts = await Vue.prototype.$web3.eth.getAccounts();
        commit(constants.SESSION_SET_PROPERTY, { account: accounts[0] });
        commit(constants.SESSION_SET_PROPERTY, { wallet: walletType });
        return true;
      }
      if (walletType === constants.WALLET_LIQUALITY && window.ethereum.isLiquality) {
        const accounts = await Vue.prototype.$web3.eth.getAccounts();
        commit(constants.SESSION_SET_PROPERTY, { account: accounts[0] });
        commit(constants.SESSION_SET_PROPERTY, { wallet: walletType });
        return true;
      }
      console.error(`Error while getting account data from ${walletType} wallet`);
      return false;
    }
    console.error('No web3 wallet detected');
    return false;
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
};

export default {
  state,
  actions,
  mutations,
  getters,
};
