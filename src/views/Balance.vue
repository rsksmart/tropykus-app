<template>
  <div class="balance">
    <h2 class="h2-heading text-detail">{{$t('balance.title')}}</h2>
    <div class="container-balance">
      <risk-balance :riskRate="riskValue" />
      <deposits-balance :infoDeposits="infoDeposits" />
      <debts-balance :infoBorrows="infoBorrows" />
      <chart-balance :chartInfo="chartData"/>
    </div>
    <v-row class="d-flex justify-center mt-15" v-if="isLoading">
      <v-progress-circular class="mt-5" :size="80" :width="6" indeterminate
        color="#47B25F"></v-progress-circular>
    </v-row>
    <history-balance v-else :dataMarkets="dataMarkets"
      :infoDeposits="infoDeposits"
      :infoBorrows="infoBorrows"
    />
  </div>
</template>
<script>
import { mapState } from 'vuex';
import * as constants from '@/store/constants';
import RiskBalance from '@/components/balance/RiskBalance.vue';
import ChartBalance from '@/components/balance/ChartBalance.vue';
import DepositsBalance from '@/components/balance/DepositsBalance.vue';
import DebtsBalance from '@/components/balance/DebtsBalance.vue';
import HistoryBalance from '@/components/balance/HistoryBalance.vue';
import {
  CRbtc,
  CToken,
  Market,
  Comptroller,
} from '@/middleware';

export default {
  components: {
    RiskBalance,
    DepositsBalance,
    DebtsBalance,
    ChartBalance,
    HistoryBalance,
  },
  data() {
    return {
      constants,
      db: this.$firebase.firestore(),
      counter: 0,
      isLoading: true,
      riskValue: 100,
      comptroller: null,
      marketAddresses: [],
      myMarkets: [],
      infoDeposits: {},
      infoBorrows: {},
      dataMarkets: [],
      chartData: [],
      borrowData: [
        ['', 0, ''],
        ['', 0, ''],
        ['', 0, ''],
        ['', 0, ''],
      ],
      supplyData: [
        ['', 0, ''],
        ['', 0, ''],
        ['', 0, ''],
        ['', 0, ''],
      ],
    };
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
      walletAddress: (state) => state.Session.walletAddress,
      markets: (state) => state.Session.markets,
    }),
  },
  watch: {
    walletAddress() {
      if (!this.walletAddress) {
        this.redirect();
      }
    },
  },
  methods: {
    async getMarkets() {
      return new Promise((resolve, reject) => {
        let counter = 0;
        this.marketAddresses.forEach(async (marketAddress) => {
          await Market.isCRbtc(marketAddress)
            .then((isCRbtc) => {
              counter += 1;
              if (isCRbtc) {
                this.myMarkets.push(new CRbtc(marketAddress, this.chainId));
              } else {
                this.myMarkets.push(new CToken(marketAddress, this.chainId));
              }
              if (counter === this.marketAddresses.length) resolve(this.markets);
            })
            .catch(reject);
        });
      });
    },
    async getData() {
      this.marketAddresses = await this.comptroller.allMarkets();
      if (this.walletAddress) {
        await this.getMarkets();

        // risk value
        this.riskValue = await this.comptroller
          .healthFactor(this.markets, this.chainId, this.walletAddress) * 100;

        // Supply
        this.infoDeposits = await this.comptroller
          .totalDepositsByInteresesInUSD(this.myMarkets, this.walletAddress, this.chainId);

        // Borrow
        this.infoBorrows = await this.comptroller
          .totalBorrowsByInteresesInUSD(this.myMarkets, this.walletAddress, this.chainId);
      } else {
        this.myMarkets = [];
      }
    },
    async getMarketsInfo() {
      if (!this.walletAddress) return;
      const data = [];
      this.chartData = [];
      await this.markets.map(async (market, i) => {
        try {
          const info = {};
          // General
          info.rateSupply = await market.supplyRateAPY();
          info.rateBorrow = await market.borrowRateAPY();
          info.rateSupply = info.rateSupply.toFixed(2);
          info.rateBorrow = info.rateBorrow.toFixed(2);

          info.marketAddress = market.marketAddress;
          info.symbol = await market.underlyingAssetSymbol();
          info.price = await market.underlyingCurrentPrice(this.chainId);
          info.img = await this.db
            .collection('markets-symbols')
            .doc(info.symbol)
            .get()
            .then((response) => response.data().imageURL);

          // Supply
          info.supplyBalance = await market.currentBalanceOfCTokenInUnderlying(this.walletAddress);
          info.interestBalance = await market.getEarnings(this.walletAddress);
          info.blanceUsd = info.supplyBalance * info.price;
          info.interesUsd = info.interestBalance * info.price;

          // Borrow
          info.borrowBalance = await market.borrowBalanceCurrent(this.walletAddress);
          info.interestBorrow = await market.getDebtInterest(this.walletAddress);
          info.borrowUsd = info.borrowBalance * info.price;
          info.interestBorrowUsd = info.interestBorrow * info.price;

          // chart balance
          const dataBorrow = ['', 0, ''];
          const dataSupply = ['', 0, ''];
          if (info.borrowBalance > 0) {
            dataBorrow[0] = info.symbol.toUpperCase();
            dataBorrow[1] = info.borrowBalance * info.price;
            dataBorrow[2] = 'borrow';
            this.borrowData[i] = dataBorrow;
          } else {
            this.borrowData[i] = dataBorrow;
          }
          if (info.supplyBalance > 0) {
            dataSupply[0] = info.symbol.toUpperCase();
            dataSupply[1] = info.supplyBalance * info.price;
            dataSupply[2] = 'deposit';
            this.supplyData[i] = dataSupply;
          } else {
            this.supplyData[i] = dataSupply;
          }
          this.chartData = [...this.supplyData, ...this.borrowData];

          data.push(info);
          this.dataMarkets = data;
          this.counter += 1;
          if (this.counter === this.markets.length) this.isLoading = false;
        } catch (error) {
          console.error(error);
        }
      });
    },
    redirect() {
      if (!this.walletAddress) {
        const to = { name: constants.ROUTE_NAMES.DEPOSITS };
        this.$router.push(to);
      }
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.redirect();
    this.getData();
    this.getMarketsInfo();
  },
};
</script>
