<template>
  <div class="container">
    <template v-if="inBorrowMenu">
<!--      <debts />-->
      <suggestions :inBorrowMenu="inBorrowMenu" :suggestions="suggestions" />
    </template>
    <template v-else>
      <savings :inBorrowMenu="inBorrowMenu" :savings="savings" />
<!--      <on-my-wallet />-->
      <suggestions :inBorrowMenu="inBorrowMenu" :suggestions="suggestions"  />
    </template>
  </div>
</template>

<script>
import Savings from '@/components/users/Savings.vue';
// import Debts from '@/components/users/Debts.vue';
// import OnMyWallet from '@/components/users/OnMyWallet.vue';
import Suggestions from '@/components/users/Suggestions.vue';
import { Comptroller } from '@/middleware';
import { mapState } from 'vuex';

export default {
  name: 'UserHome',
  data() {
    return {
      suggestions: null,
      savings: null,
      comptroller: null,
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
  },
  methods: {
    async load() {
      this.suggestions = await this.comptroller.allMarkets;
      this.savings = await this.comptroller.getAssetsIn(this.walletAddress);
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
    // Debts,
    // OnMyWallet,
    Suggestions,
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.load();
  },
};
</script>
