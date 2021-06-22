<template>
  <v-container>
    <template v-if="marketsLoaded">
      <v-card class="px-10 py-5" width="1581" color="#013E2F">
          <v-row class="ma-auto">
            <v-col class="text-center">
              <p class="p1-descriptions">Crypto</p>
            </v-col>
            <v-col class="text-center">
              <p class="p1-descriptions">{{ debtSavingsTotal }}</p>
            </v-col>
            <v-col class="text-center">
              <p class="p1-descriptions">{{ debtSavingsInterest }}</p>
            </v-col>
            <v-col class="text-center">
              <p class="p1-descriptions">{{ debtSavingsRate }}</p>
            </v-col>
            <v-col class="text-center">
            </v-col>
          </v-row>
          <div>
            <div v-for="(market, index) in markets" :key="index">
              <v-divider color="#FFF" class="my-3"/>
              <debt-savings-row :market="market" :inBorrowMenu="inBorrowMenu" />
            </div>
          </div>
      </v-card>
    </template>
    <template v-else>
      <v-card color="#013E2F" height="100" class="container
        d-flex align-center justify-space-between pa-8">
          <p class="ma-0 whiteish">{{ $t('balance.my-activity.title') }}</p>
          <v-btn width="340" color="#4CB163">
              <span class="b1-main">{{ $t('balance.my-activity.button') }}</span>
          </v-btn>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';
import DebtSavingsRow from '@/components/market/DebtSavingsRow.vue';

export default {
  name: 'DebtSavingsBalance',
  props: {
    inBorrowMenu: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    ...mapState({
      markets: (state) => state.Session.markets,
    }),
    marketsLoaded() {
      return this.markets.length > 0;
    },
    debtSavingsTotal() {
      return this.inBorrowMenu ? this.$t('overview.borrowed-card.title') : this.$t('overview.deposited-card.title');
    },
    debtSavingsInterest() {
      return this.inBorrowMenu ? this.$t('balance.my-balance.subtitle4') : this.$t('balance.my-balance.subtitle2');
    },
    debtSavingsRate() {
      return this.inBorrowMenu ? this.$t('overview.borrowed-card.subtitle4') : this.$t('overview.deposited-card.subtitle4');
    },
  },
  components: {
    DebtSavingsRow,
  },
};
</script>
