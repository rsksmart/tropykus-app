<template>
  <div class="home">
    <div class="container overview">
      <v-row class="my-5 ma-0 pl-16">
        <h1>Información de los mercados</h1>
      </v-row>
      <v-row class="d-flex justify-center">
        <div class="container">
          <v-row class="d-flex justify-center">
            <v-col cols="6" class="d-flex justify-center">
              <info-markets
                :marketsData="marketsData"
                :totalMarkets="totalSupply"
                :type="'totalSupply'"
              />
            </v-col>
            <v-col cols="6" class="d-flex justify-center">
              <info-markets
                :marketsData="marketsData"
                :totalMarkets="totalBorrow"
                :type="'totalBorrow'"
              />
            </v-col>
          </v-row>
        </div>
      </v-row>
      <button @click="getData"> GET DATA </button>
      <v-row class="mt-8 mb-5 pl-16">
        <h2>Todos los mercados</h2>
      </v-row>
      <v-row class="d-flex justify-center mb-10">
       <total-markets/>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InfoMarkets from '@/components/overview/InfoMarkets.vue';
import TotalMarkets from '@/components/overview/TotalMarkets.vue';
// import GeneralInfo from '@/components/market/GeneralInfo.vue';

import {
  Comptroller,
  Market,
  CRbtc,
  CToken,
} from '@/middleware';

export default {
  name: 'Overview',
  data() {
    return {
      comptroller: undefined,
      markets: [],
      marketsData: [],
      totalSupply: 0,
      totalBorrow: 0,
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
      chainId: (state) => state.Session.chainId,
      walletAddress: (state) => state.Session.walletAddress,
    }),
    marketsLoaded() {
      return this.markets.length > 0;
    },
  },
  methods: {
    getSymbolImg() {
      this.db
        .collection('markets-symbols')
        .doc(this.info.symbol)
        .get()
        .then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
    },
    async getData() {
      if (!this.walletAddress) return;
      console.log('walletAddress', this.walletAddress);
      console.log('wA', !!this.walletAddress);
      this.comptroller = new Comptroller(this.chainId);
      this.suggestions = await this.comptroller.allMarkets;

      const marketData = await this.suggestions.map(async (marketAddress) => (
        Market.isCRbtc(marketAddress)
          .then((isCRbtc) => {
            const market = isCRbtc ? new CRbtc(marketAddress, this.chainId)
              : new CToken(marketAddress, this.chainId);
            return Promise.all([
              market.underlyingAssetSymbol(),
              market.instance.totalSupply(),
              market.instance.totalBorrows(),
            ]);
          })
          .then(([symbol, totalSupply, totalBorrow]) => {
            // console.log('Market symbol', symbol);
            // console.log('totalSupply', totalSupply);
            // console.log('totalBorrows', totalBorrows);
            this.marketsData.push({ symbol, totalSupply, totalBorrow });
            const data = { symbol, totalSupply, totalBorrow };
            console.log(this.marketsData);
            return data;
          })
      ));
      console.log('data', marketData);
      const mData = await Promise.all(marketData);
      console.log('sum', mData);

      this.totalSupply = this.sumAll(mData, 'totalSupply');
      console.log('sumSupply', this.totalSupply);

      this.totalBorrow = this.sumAll(mData, 'totalBorrow');
      console.log('sumBorrow', this.totalBorrow);
    },
    sumAll(arr, key) {
      return arr.reduce((accumulator, value) => accumulator + Number(value[key]) / 1e18, 0);
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    // this.load();
  },
  components: {
    // GeneralInfo,
    InfoMarkets,
    TotalMarkets,
  },
};
</script>
