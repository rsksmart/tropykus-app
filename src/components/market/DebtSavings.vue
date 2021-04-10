<template>
  <v-card width="100%" class="market-card container" color="#013E2F">
    <v-row class="mx-0 mt-1 container">
      <v-col cols="7" class="pa-0">
        <v-row class="mx-0">
          <v-col class="pa-0 d-flex justify-start">
            <v-img position="left center" height="40" :src="symbolImg" contain/>
          </v-col>
          <v-col class="pa-0">
            <h1>{{ token }}</h1>
          </v-col>
          <v-col class="pa-0 d-flex justify-center align-center">
            <a :href="marketOnExplorer" target="_blank">
              <v-img height="16" src="@/assets/icon-link.svg" contain/>
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
            <p class="boldie">1 {{ tokenBalance }} {{ token }} =</p>
          </v-row>
          <v-row class="mx-0">
            <p class="italique">{{ tokenPrice | formatPrice }}</p>
          </v-row>
        </div>
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
  </v-card>
</template>

<script>
import { CRbtc, CToken, Market } from '@/middleware';
import { mapState } from 'vuex';

export default {
  name: 'DebtSavings',
  data() {
    return {
      db: this.$firebase.firestore(),
      symbolImg: null,
      baseExplorerURL: 'https://explorer.testnet.rsk.co/address/',
      underlyingBalance: 3,
      cTokenBalance: 35,
      cTokenExchangeRate: 0.02,
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
      required: true,
      type: Boolean,
    },
    marketAddress: {
      required: true,
      type: String,
    },
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.account,
    }),
    token() {
      return this.inBorrowMenu ? this.info.symbol : this.info.underlyingPrice;
    },
    tokenBalance() {
      return this.inBorrowMenu ? this.cTokenBalance : this.underlyingBalance;
    },
    tokenPrice() {
      return this.inBorrowMenu
        ? this.cTokenBalance * this.cTokenExchangeRate * this.info.underlyingPrice
        : this.underlyingBalance * this.info.underlyingPrice;
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
      this.db
        .collection('markets-symbols').doc(this.info.symbol).get().then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
    },
    async updateMarketInfo() {
      this.info.name = await this.market.name;
      this.info.symbol = await this.market.symbol;
      this.info.underlyingSymbol = await this.market.underlyingAssetSymbol();
      this.info.underlying = await this.market.underlying();
      this.info.underlyingSymbol = await this.market.underlyingAssetSymbol();
      this.info.rate = this.inBorrowMenu
        ? await this.market.borrowRateAPY()
        : await this.market.supplyRateAPY();
      this.info.rate = this.info.rate.toFixed(2);
      this.getSymbolImg();
      if (this.chainId) {
        this.info.underlyingPrice = await this.market.underlyingCurrentPrice(this.chainId);
      }
      if (this.walletAddress) {
        this.info.balance = await this.market.balanceOf(this.walletAddress);
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
      }
    },
    isCRbtc() {
      return Market.isCRBT(this.marketAddress);
    },
  },
  created() {
    this.isCRbtc()
      .then((isCRbtc) => {
        this.market = isCRbtc ? new CRbtc(this.marketAddress, this.chainId)
          : new CToken(this.marketAddress, this.chainId);
        this.updateMarketInfo();
      })
      .catch(console.error);
  },
};
</script>
