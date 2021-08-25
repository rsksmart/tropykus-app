import * as constants from '@/store/constants';
import store from '@/store';

const state = {
  user: [],
  isLoading: false,
  infoLoading: {
    type: 'deposit',
    amount: '',
    symbol: '',
    wallet: true,
    loading: true,
    deposit: true,
    success: null,
  },
};
const actions = {
  [constants.USER_ACTION_MINT]: async ({ commint }, data) => {
    const { state: { Session } } = store;
    const { market } = data;
    console.log('min', market);
    console.log('state', commint);
    console.log('store', Session.walletAddress);
    // await this.market.supply(this.account, this.amount)
    //   .then((tx) => {
    //     state.infoLoading.wallet = false;
    //     this.market.wsInstance.on('Mint', async (from, actualMintAmount) => {
    //       if (from === this.walletAddress && Number(this.amount) === actualMintAmount / 1e18) {
    //         if (!state.isLoading) {
    //           state.isLoading = true;
    //         }
    //         state.infoLoading.loading = false;
    //         state.infoLoading.deposit = true;
    //         state.infoLoading.amount = actualMintAmount / 1e18;
    //         state.counterAction = 0;
    //       }
    //     });
    //   })
    //   .catch(console.error);
  },
};
const mutations = {};

export default {
  state,
  actions,
  mutations,
};
