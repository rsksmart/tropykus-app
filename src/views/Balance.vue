<template>
  <div class="balance">
    <h2 class="h2-heading text-detail">Balance General</h2>
    <div class="container-balance">
      <risk-balance :riskRate="riskValue" />
      <deposits-balance />
      <debts-balance />
      <chart-balance />
    </div>
    <history-balance />
  </div>
</template>

<script>
import { mapState } from 'vuex';
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
      riskValue: 100,
      totalSuppliedUSD: 0,
      totalBorrowedUSD: 0,
      comptroller: null,
      marketAddresses: [],
      myMarkets: [],
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
    async walletAddress() {
      if (this.walletAddress) {
        this.riskValue = await this.comptroller
          .healthFactor(this.markets, this.chainId, this.walletAddress) * 100;
      }
      this.getData();
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
      this.marketAddresses = await this.comptroller.allMarkets;
      if (this.walletAddress) {
        await this.getMarkets();
        this.totalSuppliedUSD = await this.comptroller
          .totalDepositsInUSD(this.myMarkets, this.walletAddress, this.chainId);
        this.totalBorrowedUSD = await this.comptroller
          .totalBorrowsInUSD(this.myMarkets, this.walletAddress, this.chainId);
        const i = await this.comptroller
          .totalDepositsInteresInUSD(this.myMarkets, this.walletAddress, this.chainId);
        console.log('total intereses', i);
        this.totalSuppliedUSD = this.totalSuppliedUSD.toFixed(2);
        this.totalBorrowedUSD = this.totalBorrowedUSD.toFixed(2);
      } else {
        this.myMarkets = [];
      }
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getData();
  },
};
</script>
