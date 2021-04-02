import Vue from 'vue';
import * as constants from '@/store/constants';

const state = {
  unitrollerAddress: undefined,
};

const actions = {
  [constants.CONTRACT_GET_UNITROLLER_ADDRESS]: async ({ commit }) => {
    Vue.firebase.firestore()
      .collection('contracts')
      .doc('unitroller')
      .collection('addresses')
      .get()
      .then((unitrollers) => {
        unitrollers.forEach((doc) => {
          commit(constants.CONTRACT_SET_PROPERTY, { unitrollerAddress: doc.data().address });
        });
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
