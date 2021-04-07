<template>
  <v-card width="100%" class="market-card container" color="#013E2F">
    <v-row class="mx-0 mt-1 container">
      <v-col cols="7" class="pa-0">
        <v-row class="mx-0">
          <v-col class="pa-0 d-flex justify-start">
            <v-img position="left center" height="40" :src="symbolImg" contain/>
          </v-col>
          <v-col class="pa-0">
            <h1>{{ info.symbol }}</h1>
          </v-col>
          <v-col class="pa-0 d-flex justify-center align-center">
            <a :href="marketOnExplorer" target="_blank">
              <v-img height="16" src="@/assets/icon-link.svg" contain/>
            </a>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5" class="pa-0">
        <v-row class="mx-0 d-flex justify-end">
          <h2 class="text-right">{{ info.rate }}%</h2>
        </v-row>
        <v-row class="mx-0 d-flex justify-end">
          <p class="text-right">{{ rateLabel }}</p>
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
            <p class="boldie">1 {{ info.underlyingSymbol }} =</p>
            <p class="italique">{{ info.underlyingPrice | formatPrice }}</p>
          </v-row>
        </div>
      </v-col>
      <v-col cols="5" class="pa-0 d-flex align-center">
        <v-btn depressed :color="buttonColor" width="100%" height="30">
          {{ buttonName }}
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState } from 'vuex';
import { CToken, CRbtc, Market } from '@/middleware';

export default {
  name: 'GeneralInfo',
  data() {
    return {
      db: this.$firebase.firestore(),
      symbolImg: null,
      baseExplorerURL: 'https://explorer.testnet.rsk.co/address/',
      info: {
        name: null,
        symbol: null,
        rate: null,
        savings: null,
        price: null,
        underlyingPrice: null,
        available: null,
        underlying: null,
      },
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
    }),
    buttonColor() {
      return this.inBorrowMenu ? '#FF9153' : '#51C1AF';
    },
    buttonName() {
      return this.inBorrowMenu ? 'Pedir prestado' : 'Ahorrar';
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
      this.db
        .collection('markets-symbols')
        .doc(this.info.symbol)
        .get()
        .then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
    },
  },
  async created() {
    const market = await Market.isCRBT(this.marketAddress)
      ? new CRbtc(this.marketAddress)
      : new CToken(this.marketAddress);
    this.info.name = await market.name;
    this.info.symbol = await market.symbol;
    this.info.underlyingSymbol = await market.underlyingAssetSymbol();
    this.info.underlying = await market.underlying();
    this.info.rate = this.inBorrowMenu
      ? await market.borrowRateAPY()
      : await market.supplyRateAPY();
    this.info.underlying = await market.underlying();
    this.info.underlyingPrice = 50000;
    if (this.walletAddress) {
      this.info.savings = await market.balanceOfUnderlying(this.walletAddress);
      this.info.available = await market.balanceOfUnderlyingInWallet(this.walletAddress);
      this.info.underlyingPrice = await market.underlyingCurrentPrice(this.chainId);
    }
  },
  async updated() {
    this.getSymbolImg();
  },
};
</script>
