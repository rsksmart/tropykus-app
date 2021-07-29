import * as constants from '@/store/constants';
import firebase from 'firebase/app';
import {
  CToken,
  CRbtc,
  Market,
} from '@/middleware';

const initState = {
  underlyingSymbol: null,
  rate: null,
  underlyingPrice: 0,
  underlyingBalance: null,
  liquidity: null,
  interestBalance: 0,
  supplyBalance: 0,
  borrowBalance: 0,
  price: 0,
};

const state = {
  getMarkets: [],
  chainId: 31,
  market: null,
  isProgress: true,
  info: initState,
  select: {
    symbol: '',
    img: '',
  },
};

const actions = {

  [constants.MARKET_GET_MARKETSINFO]: async ({ commit }, markets) => {
    const getMarkets = [];
    await markets.map(async (market) => {
      try {
        const data = {};
        data.symbol = await market.symbol;
        data.underlyingSymbol = await market.underlyingAssetSymbol();
        data.marketAddress = market.marketAddress;
        data.img = await firebase.firestore()
          .collection('markets-symbols')
          .doc(data.symbol)
          .get()
          .then((response) => response.data().imageURL);

        getMarkets.push(data);
        commit(constants.MARKET_GET_MARKETSINFO, getMarkets);
      } catch (error) {
        //
        console.error(error);
      }
    });
  },

  [constants.MARKET_UPDATE_MARKET]: async ({ commit }, data) => {
    const info = {};
    const {
      walletAddress, account,
    } = data;
    const { market } = state;

    info.underlyingSymbol = await market.underlyingAssetSymbol();
    info.rate = await market.supplyRateAPY();
    info.rate = info.rate.toFixed(2);
    info.cash = await market.getCash();
    if (state.chainId) {
      info.underlyingPrice = await market.underlyingCurrentPrice(state.chainId);
    }
    if (walletAddress) {
      info.underlyingBalance = await market
        .balanceOfUnderlyingInWallet(account);
      // console.log('underlying store', info.underlyingBalance);
      info.price = await market.underlyingCurrentPrice(state.chainId);
      info.supplyBalance = await market
        .currentBalanceOfCTokenInUnderlying(walletAddress);
      // console.log('supply store', info.supplyBalance);
      info.supplyBalance = info.supplyBalance ? info.supplyBalance : 0;
      info.borrowBalance = await market
        .borrowBalanceStored(walletAddress);
      // console.log('borrow store', info.borrowBalance);
      info.interestBalance = await market.getEarnings(walletAddress);
      // maximo que puedo pedir prestado
      // info.liquidity = await this.comptroller.getAccountLiquidity(this.walletAddress);
    } else {
      commit(constants.MARKET_RESET_MARKET);
    }

    commit(constants.MARKET_UPDATE_MARKET, info);
    commit(constants.MARKET_ISPROGRESS, false);
  },

  [constants.MARKET_UPDATE_SELECT]: async ({ commit }, market) => {
    const select = {};
    // console.log('select desde estore', market);

    select.symbol = await market.symbol;
    select.underlyingSymbol = await market.underlyingAssetSymbol();
    select.img = await firebase.firestore()
      .collection('markets-symbols')
      .doc(select.symbol)
      .get()
      .then((response) => response.data().imageURL);

    commit(constants.MARKET_UPDATE_SELECT, select);
  },

  [constants.MARKET_GET_MARKET]: async ({ commit, dispatch }, data) => {
    const { marketAddress } = data;
    const isCRbtc = await Market.isCRbtc(marketAddress);

    const market = isCRbtc ? new CRbtc(marketAddress, state.chainId)
      : new CToken(marketAddress, state.chainId);

    commit(constants.MARKET_GET_MARKET, market);

    dispatch(constants.MARKET_UPDATE_MARKET, { market, ...data });
    dispatch(constants.MARKET_UPDATE_SELECT, market);
  },

  [constants.MARKET_ISPROGRESS]: ({ commit }, data) => {
    commit(constants.MARKET_ISPROGRESS, data);
  },
};

const mutations = {
  // eslint-disable-next-line no-shadow
  [constants.MARKET_ISPROGRESS]: (state, payload) => {
    state.isProgress = payload;
  },
  // eslint-disable-next-line no-shadow
  [constants.MARKET_GET_MARKET]: (state, payload) => {
    state.market = payload;
  },

  // eslint-disable-next-line no-shadow
  [constants.MARKET_GET_MARKETSINFO]: (state, payload) => {
    state.getMarkets = payload;
  },

  // eslint-disable-next-line no-shadow
  [constants.MARKET_UPDATE_MARKET]: (state, payload) => {
    state.info = { ...state.info, ...payload };
  },

  // eslint-disable-next-line no-shadow
  [constants.MARKET_UPDATE_SELECT]: (state, payload) => {
    state.select = { ...state.select, ...payload };
  },

  // eslint-disable-next-line no-shadow
  [constants.MARKET_RESET_MARKET]: (state) => {
    state.info = initState;
  },
};

export default {
  state,
  actions,
  mutations,
};
