import store from '@/store';
import * as constants from '@/store/constants';
import Vue from 'vue';

if (window.ethereum) {
  window.ethereum.on('accountsChanged', async () => {
    store.dispatch(constants.SESSION_CONNECT_WEB3);
  });
}

const state = {
  account: undefined,
  wallet: undefined,
  chainId: undefined,
};

const actions = {
  [constants.SESSION_CONNECT_WEB3]: async ({ commit }) => {
    if (window.ethereum) {
      await window.ethereum.enable();
      const account = await Vue.web3.getSigner();
      commit(constants.SESSION_SET_PROPERTY, { chainId: window?.ethereum?.chainId ?? 0 });
      commit(
        constants.SESSION_SET_PROPERTY,
        { account: account.provider.provider.selectedAddress },
      );
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
