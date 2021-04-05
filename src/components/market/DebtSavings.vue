<template>
  <v-card width="100%" class="market-card container" color="#013E2F">
    <v-row class="mx-0 mt-1 container">
      <v-col cols="7" class="pa-0">
        <v-row class="mx-0">
          <v-col class="pa-0 d-flex justify-start">
            <v-img position="left center" height="40" :src="symbolImg" contain />
          </v-col>
          <v-col class="pa-0">
            <h1>{{ symbol }}</h1>
          </v-col>
          <v-col class="pa-0 d-flex justify-center align-center">
            <a :href="marketOnExplorer" target="_blank">
              <v-img height="16" src="@/assets/icon-link.svg" contain />
            </a>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5" class="pa-0 d-flex align-start">
        <v-btn depressed :color="buttonColor" width="100%" height="30">
          {{ buttonName }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mx-0 container">
      <v-divider color="#BEBEBE"/>
    </v-row>
    <v-row class="mx-0 mb-1 container">
      <v-col cols="7" class="pa-0 d-flex align-center">
        <div>
          <v-row class="mx-0">
            <p>Precio actual</p>
          </v-row>
          <v-row class="mx-0">
            <p class="boldie">1 {{ underlyingBalance }} {{ underlying }} =</p>
          </v-row>
          <v-row class="mx-0">
            <p class="italique">{{ tokenPrice | formatPrice }}</p>
          </v-row>
        </div>
      </v-col>
      <v-col cols="5" class="pa-0">
        <v-row class="mx-0 d-flex justify-end">
          <h2 class="text-right">{{ rate }}%</h2>
        </v-row>
        <v-row class="mx-0 d-flex justify-end">
          <p class="text-right">{{ rateLabel }}</p>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'DebtSavings',
  data() {
    return {
      db: this.$firebase.firestore(),
      symbolImg: null,
      symbol: 'crUSDT',
      underlying: 'rUSDT',
      baseExplorerURL: 'https://explorer.testnet.rsk.co/address/',
      rate: 6.54,
      underlyingPrice: 50000,
      underlyingBalance: 3,
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
    tokenPrice() {
      return this.inBorrowMenu ? this.underlyingBalance * this.underlyingPrice
        : this.underlyingBalance * this.underlyingPrice;
    },
    buttonColor() {
      return this.inBorrowMenu ? '#F24646' : '#4696A6';
    },
    buttonName() {
      return this.inBorrowMenu ? 'Pagar' : 'Ver';
    },
    marketOnExplorer() {
      return `${this.baseExplorerURL}/${this.marketAddress}`;
    },
    rateLabel() {
      return this.inBorrowMenu ? 'Interés anual' : 'Rendimiento anual';
    },
  },
  methods: {
    getSymbolImg() {
      this.db.collection('markets-symbols')
        .doc(this.underlying).get()
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
