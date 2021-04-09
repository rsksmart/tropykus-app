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
        <v-btn depressed :color="buttonColor" width="100%" height="30" @click="supplyOrBorrow">
          {{ buttonName }}
        </v-btn>
      </v-col>
    </v-row>
    <template v-if="walletDialog">
      <connect-wallet :showModal="walletDialog" @closed="walletDialog = false"/>
    </template>
    <template v-if="supplyDialog">
      <supply-redeem :showModal="supplyDialog" @save="deposit"
                     :info="info" @closed="supplyDialog = false"/>
    </template>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ConnectWallet from '@/components/dialog/ConnectWallet.vue';
import SupplyRedeem from '@/components/dialog/SupplyRedeem.vue';
import * as constants from '@/store/constants';
import { CToken, CRbtc, Market } from '@/middleware';

export default {
  name: 'GeneralInfo',
  data() {
    return {
      db: this.$firebase.firestore(),
      symbolImg: null,
      baseExplorerURL: 'https://explorer.testnet.rsk.co/address',
      info: {
        name: null,
        symbol: null,
        rate: null,
        balance: null,
        underlyingPrice: null,
        underlyingBalance: null,
        underlying: null,
      },
      walletDialog: false,
      supplyDialog: false,
      market: null,
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
      walletAddress: (state) => state.Session.walletAddress,
      account: (state) => state.Session.account,
      chainId: (state) => state.Session.chainId,
    }),
    ...mapGetters({
      isLoggedIn: constants.SESSION_IS_CONNECTED,
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
    supplyOrBorrow() {
      if (this.isLoggedIn) {
        this.supplyDialog = true;
      } else {
        this.walletDialog = true;
      }
    },
    async deposit(amount) {
      await this.market.supply(this.account, amount);
      await this.updateMarketInfo();
    },
    async updateMarketInfo() {
      this.info.name = await this.market.name;
      this.info.symbol = await this.market.symbol;
      this.info.underlyingSymbol = await this.market.underlyingAssetSymbol();
      this.info.underlying = await this.market.underlying();
      this.info.rate = this.inBorrowMenu
        ? await this.market.borrowRateAPY()
        : await this.market.supplyRateAPY();
      if (this.chainId) {
        this.info.underlyingPrice = await this.market.underlyingCurrentPrice(this.chainId);
      }
      if (this.walletAddress) {
        this.info.balance = await this.market.balanceOfUnderlying(this.walletAddress);
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.walletAddress);
      }
    },
  },
  components: {
    ConnectWallet,
    SupplyRedeem,
  },
  async created() {
    const isCRBT = await Market.isCRBT(this.marketAddress);
    if (isCRBT) {
      this.market = new CRbtc(this.marketAddress, this.chainId);
    } else {
      this.market = new CToken(this.marketAddress, this.chainId);
    }
    console.log(this.market);
    await this.updateMarketInfo();
  },
  async updated() {
    this.getSymbolImg();
    await this.updateMarketInfo();
  },
};
</script>
