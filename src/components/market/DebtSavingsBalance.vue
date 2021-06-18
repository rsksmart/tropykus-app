<template>
  <v-container>
    <template v-if="marketsLoaded">
      <v-card width="1581" color="#013E2F">
        <v-row>
          <v-col class="text-center">
            <p class="p1-descriptions">Crypto</p>
          </v-col>
          <v-col class="text-center">
            <p class="p1-descriptions">Total depositado</p>
          </v-col>
          <v-col class="text-center">
            <p class="p1-descriptions">Ganancias históricas</p>
          </v-col>
          <v-col class="text-center">
            <p class="p1-descriptions">Tasa de ganancia anual dinámica actual</p>
          </v-col>
          <v-col class="text-center">
          </v-col>
        </v-row>
        <div v-for="(market, index) in markets" :key="index">
          <debt-savings-row :market="market" />
        </div>
      </v-card>
    </template>
    <template v-else>
      <v-card color="#013E2F" height="100" class="container
        d-flex align-center justify-space-between pa-8">
          <p class="ma-0 whiteish">No tienes depositos aún. Empieza a depositar</p>
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
  },
  components: {
    DebtSavingsRow,
  },
};
</script>
