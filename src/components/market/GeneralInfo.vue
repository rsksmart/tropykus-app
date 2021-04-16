<template>
  <v-card width="100%" class="market-card container" color="#013E2F">
    <v-row class="mx-0 mt-1 container">
      <v-col cols="7" class="pa-0">
        <v-row class="mx-0">
          <v-col class="pa-0 d-flex justify-start">
            <v-img position="left center" height="40" :src="symbolImg" contain/>
          </v-col>
          <v-col class="pa-0">
            <h1>{{ info.underlyingSymbol }}</h1>
          </v-col>
          <v-col class="pa-0 d-flex justify-center align-center">
            <a :href="marketOnExplorer" target="_blank">
              <v-img height="16" src="@/assets/icons/link.svg" contain/>
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
    <template v-if="supplyBorrowDialog">
      <component :is="supplyBorrowComponent" :showModal="supplyBorrowDialog"
                 @action="menuAction" :info="info" @closed="supplyBorrowDialog = false"
                 :inBorrowMenu="inBorrowMenu"/>
    </template>
    <template v-if="waitingDialog">
      <modal-tx-status :showModal="waitingDialog" :stage="'in-progress'"
                       :inBorrowMenu="inBorrowMenu"/>
    </template>
    <template v-if="successDialog">
      <modal-tx-status :showModal="successDialog" :stage="'success'"
                       :txAmount="amount" :txCryptocurrency="txCurrency"
                       :inBorrowMenu="inBorrowMenu"/>
    </template>
    <template v-if="errorDialog">
      <modal-tx-status :showModal="errorDialog" :stage="'error'"
                       :inBorrowMenu="inBorrowMenu"/>
    </template>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import ConnectWallet from '@/components/dialog/ConnectWallet.vue';
import SupplyRedeem from '@/components/dialog/SupplyRedeem.vue';
import ModalTxStatus from '@/components/dialog/ModalTxStatus.vue';
import BorrowRepay from '@/components/dialog/BorrowRepay.vue';
import * as constants from '@/store/constants';
import {
  CToken,
  CRbtc,
  Market,
  Comptroller,
} from '@/middleware';

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
        underlyingSymbol: null,
      },
      walletDialog: false,
      supplyBorrowDialog: false,
      waitingDialog: false,
      successDialog: false,
      errorDialog: false,
      market: null,
      amount: null,
      txCurrency: null,
      comptroller: null,
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
      walletAddress: (state) => state.Session.walletAddress,
      chainId: (state) => state.Session.chainId,
      account: (state) => state.Session.account,
    }),
    ...mapGetters({
      isLoggedIn: constants.SESSION_IS_CONNECTED,
    }),
    supplyBorrowComponent() {
      return this.inBorrowMenu ? 'BorrowRepay' : 'SupplyRedeem';
    },
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
        this.supplyBorrowDialog = true;
      } else {
        this.walletDialog = true;
      }
    },
    reset() {
      this.walletDialog = false;
      this.supplyBorrowDialog = false;
      this.waitingDialog = false;
      this.successDialog = false;
      this.errorDialog = false;
    },
    showError() {
      this.waitingDialog = false;
      this.errorDialog = true;
    },
    showSuccess() {
      this.waitingDialog = false;
      this.successDialog = true;
    },
    async menuAction({ amountIntended, action }) {
      this.amount = amountIntended;
      this.reset();
      this.waitingDialog = true;
      this.txCurrency = this.info.underlyingSymbol;
      switch (action) {
        case 'Depositar':
          await this.market.supply(this.account, this.amount)
            .then(() => this.comptroller.enterMarkets(this.account, this.marketAddress))
            .then(() => {
              this.market.instance.on('Mint', () => {
                this.showSuccess();
                this.$emit('supply');
                this.updateMarketInfo();
              });
            })
            .catch(() => this.showError());
          break;
        case 'Pedir prestado':
          await this.comptroller.enterMarkets(this.account, this.marketAddress)
            .then(() => this.market.borrow(this.account, this.amount))
            .then(() => {
              this.market.instance.on('Borrow', () => {
                this.showSuccess();
                this.$emit('borrow');
                this.updateMarketInfo();
              });
            })
            .catch(() => this.showError());
          break;
        case 'Retirar':
          console.log('redeem');
          break;
        case 'Pagar':
          console.log('repay');
          break;
        default:
          break;
      }
      this.market.instance.on('Failure', (from, to, amount, event) => {
        console.info(`Failure Event: ${JSON.stringify(event)}`);
        const { error, detail, info } = event.args;
        console.log(`Error: ${error}, detail: ${detail}, info: ${info}`);
        this.waitingDialog = false;
        this.errorDialog = true;
      });
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
      return Market.isCRbtc(this.marketAddress);
    },
  },
  components: {
    ConnectWallet,
    SupplyRedeem,
    BorrowRepay,
    ModalTxStatus,
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
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
