<template>
  <v-container>
    <v-row class="mx-0 pl-3">
      <v-card class="crop-card">
        <v-card-title class="pa-0">
          <v-img class="mx-2" src="@/assets/icons/pig.svg" height="23" width="23" contain/>
          <h1 class="text-left">Mis ahorros</h1>
        </v-card-title>
      </v-card>
    </v-row>
    <template v-if="loadingSavings">
      <v-row class="mx-0 mt-4">
        <v-col cols="4" v-for="index in 3" :key="index">
          <v-skeleton-loader type="image" height="158" />
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <template v-if="savingsLoaded">
        <v-row class="mx-0 mt-4">
          <v-col cols="4" v-for="(market, idx) in savings"
                 :key="`market-${idx}`">
            <debt-savings :inBorrowMenu="inBorrowMenu" :marketAddress="market" />
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row class="mx-0 pl-3 py-4">
          <v-card color="#013E2F" width="100%" class="container">
            <p class="ma-0 whiteish">No has ahorrado cryptos aún</p>
          </v-card>
        </v-row>
      </template>
    </template>
  </v-container>
</template>

<script>
import DebtSavings from '@/components/market/DebtSavings.vue';

export default {
  name: 'Savings',
  props: {
    inBorrowMenu: {
      required: true,
      type: Boolean,
    },
    savings: {
      required: false,
      type: Array,
      default: null,
    },
  },
  computed: {
    loadingSavings() {
      return this.savings === null;
    },
    savingsLoaded() {
      return this.savings?.length > 0;
    },
  },
  components: {
    DebtSavings,
  },
};
</script>
