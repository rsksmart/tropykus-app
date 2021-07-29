<template>
  <div>
    <template v-if="inBorrowMenu">
      <debts :inBorrowMenu="inBorrowMenu"
             :debts="debtsList" :key="debtKey" />
      <suggestions class="mt-8" @actionSucceed="forceDebts" :inBorrowMenu="inBorrowMenu"
                   :suggestions="suggestions" />
    </template>
    <template v-else>
      <savings :inBorrowMenu="inBorrowMenu"
               :savings="savingsList" :key="savKey" />
      <!--      <on-my-wallet />-->
      <suggestions class="mt-8" @actionSucceed="forceSavings" :inBorrowMenu="inBorrowMenu"
                   :suggestions="suggestions" />
    </template>
  </div>

</template>

<script>
// import OnMyWallet from '@/components/users/OnMyWallet.vue';
import Savings from '@/components/users/Savings.vue';
import Debts from '@/components/users/Debts.vue';
import * as constants from '@/store/constants';
import Suggestions from '@/components/users/Suggestions.vue';
import {
  Comptroller,
  Market,
  CRbtc,
  CToken,
} from '@/middleware';
import { mapActions, mapState } from 'vuex';

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
      debtKey: 0,
      savKey: 1,
      markets: [],
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
    ...mapActions({
      addMarkets: constants.SESSION_ADD_MARKETS,
    }),
    async forceDebts() {
      await this.load();
      this.debtKey += 1;
    },
    async forceSavings() {
      await this.load();
      this.savKey += 1;
    },
    async load() {
      this.savings = [];
      this.debts = [];
      this.suggestions = await this.comptroller.allMarkets;
      this.assetsIn = await this.comptroller.getAssetsIn(this.walletAddress);
      let counter = 0;
      if (this.walletAddress) {
        await this.assetsIn.forEach((marketAddress) => {
          Market.isCRbtc(marketAddress)
            .then((isCRbtc) => {
              const market = isCRbtc ? new CRbtc(marketAddress, this.chainId)
                : new CToken(marketAddress, this.chainId);
              counter += 1;
              this.markets.push(market);
              return Promise.all([
                market,
                market.balanceOf(this.walletAddress),
              ]);
            })
            .then(([market, balanceOf]) => {
              if (counter === this.suggestions.length) this.addMarkets(this.markets);
              if (balanceOf > 0 && this.savings.indexOf(marketAddress) === -1) {
                this.savings.push(marketAddress);
              }
              return market.borrowBalanceStored(this.walletAddress);
            })
            .then((borrowBalanceStored) => {
              if (borrowBalanceStored > 0 && this.debts.indexOf(marketAddress) === -1) {
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
    this.comptroller.wsInstance.on('MarketEntered', () => this.load());
  },
};
</script>
