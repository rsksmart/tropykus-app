import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  unitrollerAddress: undefined,
  comptroller: undefined,
  markets: [],
};

const actions = {
  [constants.CONTRACT_GET_UNITROLLER_ADDRESS]: async ({ commit, rootState }) => {
    let unitrollerAddress = null;
    Vue.firebase.firestore()
      .collection('contracts')
      .doc('unitroller')
      .collection('addresses')
      .get()
      .then((unitrollers) => {
        unitrollers.forEach((doc) => {
          if (doc.id === rootState.Session.chainId.toString()) {
            unitrollerAddress = doc.data().address;
          }
        });
        commit(constants.CONTRACT_SET_PROPERTY, { unitrollerAddress });
      });
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [constants.CONTRACT_SET_PROPERTY]: (state, data) => {
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
