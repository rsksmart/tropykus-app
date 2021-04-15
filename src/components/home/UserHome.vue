<template>
  <div class="container">
    <template v-if="inBorrowMenu">
      <debts :inBorrowMenu="inBorrowMenu" :debts="debtsList" />
      <suggestions @borrow="load" :inBorrowMenu="inBorrowMenu" :suggestions="suggestions" />
    </template>
    <template v-else>
      <savings :inBorrowMenu="inBorrowMenu" :savings="savingsList" />
      <!--      <on-my-wallet />-->
      <suggestions @supply="load" :inBorrowMenu="inBorrowMenu" :suggestions="suggestions"  />
    </template>
  </div>
</template>

<script>
import Savings from '@/components/users/Savings.vue';
import Debts from '@/components/users/Debts.vue';
// import OnMyWallet from '@/components/users/OnMyWallet.vue';
import Suggestions from '@/components/users/Suggestions.vue';
import {
  Comptroller,
  Market,
  CRbtc,
  CToken,
} from '@/middleware';
import { mapState } from 'vuex';

export default {
  name: 'UserHome',
  data() {
    return {
      suggestions: null,
      assetsIn: null,
      comptroller: null,
      savings: [],
      debts: [],
      marketsLoaded: false,
    };
  },
  props: {
    inBorrowMenu: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
      walletAddress: (state) => state.Session.walletAddress,
    }),
    savingsList() {
      return this.marketsLoaded ? this.savings : null;
    },
    debtsList() {
      return this.marketsLoaded ? this.debts : null;
    },
  },
  methods: {
    async load() {
      this.suggestions = await this.comptroller.allMarkets;
      this.assetsIn = await this.comptroller.getAssetsIn(this.walletAddress);
      if (this.walletAddress) {
        await this.assetsIn.forEach((marketAddress) => {
          Market.isCRbtc(marketAddress)
            .then((isCRbtc) => {
              const market = isCRbtc ? new CRbtc(marketAddress, this.chainId)
                : new CToken(marketAddress, this.chainId);
              return Promise.all([market, market.balanceOf(this.walletAddress)]);
            })
            .then(([market, balanceOf]) => {
              if (balanceOf > 0 && this.savings.indexOf(marketAddress) === -1) {
                this.savings.push(marketAddress);
              }
              return market.borrowBalanceCurrent(this.walletAddress);
            })
            .then((borrowBalanceCurrent) => {
              if (borrowBalanceCurrent > 0 && this.debts.indexOf(marketAddress) === -1) {
                this.debts.push(marketAddress);
              }
            });
        });
      }
      this.marketsLoaded = true;
    },
  },
  watch: {
    chainId(val) {
      this.suggestions = null;
      this.savings = null;
      this.comptroller = new Comptroller(val);
      this.load();
    },
  },
  components: {
    Savings,
    Debts,
    // OnMyWallet,
    Suggestions,
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.load();
    this.comptroller.instance.on('MarketEntered', () => this.load());
  },
};
</script>
