<template>
  <div class="home">
    <div class="container overview">
      <v-row class="mb-5 ma-0 pl-16">
        <h1 class="mt-0">Información de los mercados</h1>
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
      <v-row class="mt-8 mb-5 pl-16">
        <h2>Todos los mercados</h2>
      </v-row>
      <v-row class="d-flex justify-center mb-10">
        <total-markets :marketsData="marketsData"/>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import InfoMarkets from '@/components/overview/InfoMarkets.vue';
import TotalMarkets from '@/components/overview/TotalMarkets.vue';

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
      db: this.$firebase.firestore(),
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
    getSymbolImg(symbol) {
      return this.db
        .collection('markets-symbols')
        .doc(symbol)
        .get()
        .then((response) => response.data().imageURL)
        .catch(console.error);
    },
    async getData() {
      this.comptroller = new Comptroller(this.chainId);
      this.markets = await this.comptroller.allMarkets;
      const marketData = await this.markets
        .map(async (marketAddress) => (
          Market.isCRbtc(marketAddress)
            .then((isCRbtc) => {
              const market = isCRbtc ? new CRbtc(marketAddress, this.chainId)
                : new CToken(marketAddress, this.chainId);
              return Promise.all([
                market.name,
                market.underlyingAssetSymbol(),
                market.totalSupplyUSD(this.chainId),
                market.totalBorrowsUSD(this.chainId),
                market.totalSupplyInUnderlying(),
                market.totalBorrowsInUnderlying(),
                market.underlyingAssetName(),
                market.supplyRateAPY(),
                market.borrowRateAPY(),
                market.suppliedLast24Hours(this.chainId),
                market.borrowedLast24Hours(),
              ]);
            })
            .then(
              ([
                name,
                symbol,
                totalSupply,
                totalBorrow,
                totalSupplyInUnderlying,
                totalBorrowsInUnderlying,
                underlyingAssetName,
                supplyRate,
                borrowRate,
                suppliedLast24Hours,
                borrowedLast24Hours,
              ]) => (
                Promise.all([
                  name,
                  symbol,
                  this.getSymbolImg(symbol),
                  totalSupply,
                  totalBorrow,
                  totalSupplyInUnderlying,
                  totalBorrowsInUnderlying,
                  underlyingAssetName,
                  supplyRate,
                  borrowRate,
                  suppliedLast24Hours,
                  borrowedLast24Hours,
                ])
              ),
            )
            .then(([
              name,
              symbol,
              symbolUrl,
              totalSupply,
              totalBorrow,
              totalSupplyInUnderlying,
              totalBorrowsInUnderlying,
              underlyingAssetName,
              supplyRate,
              borrowRate,
              suppliedLast24Hours,
              borrowedLast24Hours,
            ]) => {
              const data = {
                name,
                symbol,
                symbolUrl,
                totalSupply,
                totalBorrow,
                totalSupplyInUnderlying,
                totalBorrowsInUnderlying,
                underlyingAssetName,
                supplyRate,
                borrowRate,
                suppliedLast24Hours,
                borrowedLast24Hours,
              };
              this.marketsData.push(data);
              return data;
            })
        ));
      const mData = await Promise.all(marketData);
      this.totalSupply = this.sumAll(mData, 'totalSupply');
      this.totalBorrow = this.sumAll(mData, 'totalBorrow');
    },
    sumAll(arr, key) {
      return arr.reduce((accumulator, value) => accumulator + value[key], 0);
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getData();
  },
  watch: {
    chainId(val) {
      this.comptroller = new Comptroller(val);
      this.getData();
    },
  },
  components: {
    InfoMarkets,
    TotalMarkets,
  },
};
</script>
