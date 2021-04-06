<template>
  <v-card width="100%" class="market-card container" color="#013E2F">
    <v-row class="mx-0 mt-1 container">
      <v-col cols="7" class="pa-0">
        <v-row class="mx-0">
          <v-col class="pa-0 d-flex justify-start">
            <v-img position="left center" height="40" :src="symbolImg" contain />
          </v-col>
          <v-col class="pa-0">
            <h1>{{ underlyingSymbol }}</h1>
          </v-col>
          <v-col class="pa-0 d-flex justify-center align-center">
            <a :href="marketOnExplorer" target="_blank">
              <v-img height="16" src="@/assets/icon-link.svg" contain />
            </a>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5" class="pa-0">
        <v-row class="mx-0 d-flex justify-end">
          <h2 class="text-right">{{ supplyRate }}%</h2>
        </v-row>
        <v-row class="mx-0 d-flex justify-end">
          <p class="text-right">Rendimiento anual</p>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mx-0 container">
      <v-divider color="#BEBEBE"/>
    </v-row>
    <v-row class="mx-0 container">
      <v-col cols="7" class="pa-0 d-flex align-center">
        <div>
          <v-row class="mx-0">
            <p>Precio actual</p>
          </v-row>
          <v-row class="mx-0">
            <p class="boldie">1 {{ underlyingSymbol }} =</p>
            <p class="italique">{{ underlyingPrice | formatPrice }}</p>
          </v-row>
        </div>
      </v-col>
      <v-col cols="5" class="pa-0 d-flex align-center">
        <v-btn depressed color="#4CB163" width="100%" height="30">
          Ahorrar
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'WalletInfo',
  data() {
    return {
      db: this.$firebase.firestore(),
      symbolImg: null,
      baseExplorerURL: 'https://explorer.testnet.rsk.co/address/',
      underlyingBalance: 3,
      underlyingSymbol: 'RBTC',
      underlyingPrice: 50000,
      supplyRate: 6,
    };
  },
  props: {
    inBorrowMenu: {
      require: true,
      type: Boolean,
    },
    marketAddress: {
      require: true,
      type: String,
    },
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.account,
      chainId: (state) => state.Session.chainId,
    }),
    marketOnExplorer() {
      return `${this.baseExplorerURL}/${this.marketAddress}`;
    },
  },
  methods: {
    getSymbolImg() {
      this.db
        .collection('markets-symbols')
        .doc(this.underlyingSymbol)
        .get()
        .then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
    },
  },
  created() {
    this.getSymbolImg();
  },
};
</script>
