<template>
  <v-container>
    <v-row class="ma-0 mb-5 pl-3">
      <h3 class="text-left h3-sections-heading">Mis deudas</h3>
    </v-row>
    <template v-if="loadingDebts">
      <v-row class="mx-0 mt-4">
        <v-col cols="4" v-for="index in 3" :key="index">
          <v-skeleton-loader type="image" height="158" />
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <template v-if="debtsLoaded">
        <v-row class="mx-0 mt-4">
          <v-col cols="4" v-for="(market, idx) in debts"
                 :key="`market-${idx}`">
            <debt-savings :inBorrowMenu="inBorrowMenu" :marketAddress="market"
                          @success="forceReload" :key="key" />
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row class="mx-0 pl-3 py-4">
          <v-card color="#013E2F" width="100%" class="container">
            <p class="ma-0 whiteish">No tienes prestamos aún</p>
          </v-card>
        </v-row>
      </template>
    </template>
  </v-container>
</template>

<script>
import DebtSavings from '@/components/market/DebtSavings.vue';

export default {
  name: 'Debts',
  data() {
    return {
      key: 0,
    };
  },
  props: {
    inBorrowMenu: {
      required: true,
      type: Boolean,
    },
    debts: {
      required: false,
      type: Array,
      default: null,
    },
  },
  computed: {
    loadingDebts() {
      return this.debts === null;
    },
    debtsLoaded() {
      return this.debts?.length > 0;
    },
  },
  methods: {
    forceReload() {
      this.key += 1;
    },
  },
  components: {
    DebtSavings,
  },
};
</script>
