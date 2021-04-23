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
            <p class="italique">{{ info.underlyingPrice | formatPrice }} USD</p>
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
      <connect-wallet :showModal="walletDialog" @closed="walletDialog = false" />
    </template>
    <template v-if="supplyBorrowDialog">
      <component :is="supplyBorrowComponent" :showModal="supplyBorrowDialog"
                 @action="menuAction" :info="info" @closed="supplyBorrowDialog = false"
                 :inBorrowMenu="inBorrowMenu" />
    </template>
    <template v-if="waitingDialog">
      <loading :showModal="waitingDialog" />
    </template>
    <template v-if="successDialog">
      <success-dialog :showModal="successDialog" :amount="amount"
                      :underlyingSymbol="info.underlyingSymbol" :action="currentAction"
                      @close="actionSucceed" />
    </template>
    <template v-if="errorDialog">
      <error-dialog :showModal="errorDialog" :action="currentAction"
                    @close="errorDialog = false" />
    </template>
    <template v-if="txSummaryDialog">
      <tx-summary :showModal="txSummaryDialog" :action="currentAction" />
    </template>
  </v-card>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import * as constants from '@/store/constants';
import {
  CToken,
  CRbtc,
  Market,
  Comptroller,
} from '@/middleware';
import ConnectWallet from '@/components/dialog/ConnectWallet.vue';
import SupplyRedeem from '@/components/dialog/SupplyRedeem.vue';
import Loading from '@/components/dialog/Loading.vue';
import BorrowRepay from '@/components/dialog/BorrowRepay.vue';
import TxSummary from '@/components/dialog/TxSummary.vue';
import SuccessDialog from '@/components/dialog/SuccessDialog.vue';
import ErrorDialog from '@/components/dialog/ErrorDialog.vue';

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
        cash: null,
        liquidity: null,
        supplyBalance: null,
        borrowBalance: null,
      },
      walletDialog: false,
      supplyBorrowDialog: false,
      waitingDialog: false,
      successDialog: false,
      errorDialog: false,
      txSummaryDialog: false,
      market: null,
      amount: null,
      comptroller: null,
      currentAction: null,
      allMarkets: [],
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
      this.txSummaryDialog = false;
    },
    showWaiting() {
      this.reset();
      this.waitingDialog = true;
    },
    showError() {
      this.reset();
      this.errorDialog = true;
    },
    showSuccess() {
      this.reset();
      this.successDialog = true;
    },
    async menuAction({ amountIntended, action }) {
      this.amount = amountIntended;
      this.currentAction = action;
      this.reset();
      const assetsIn = await this.comptroller.getAssetsIn(this.walletAddress);
      switch (action) {
        case constants.USER_ACTION_MINT:
          this.allMarkets = await this.comptroller.allMarkets;
          if (assetsIn.indexOf(this.marketAddress) === -1) {
            await this.comptroller.enterMarkets(this.account, this.allMarkets);
          }
          // this.txSummaryDialog = true; // TODO
          this.showWaiting();
          await this.market.supply(this.account, this.amount)
            .then(() => {
              this.market.instance.on('Mint', (from) => {
                if (from === this.walletAddress) {
                  this.showSuccess();
                  this.updateMarketInfo();
                }
              });
            })
            .catch(this.showError);
          break;
        case constants.USER_ACTION_BORROW:
          // this.txSummaryDialog = true; // TODO
          this.showWaiting();
          await this.market.borrow(this.account, this.amount)
            .then(() => {
              this.market.instance.on('Borrow', (from) => {
                if (from === this.walletAddress) {
                  this.showSuccess();
                  this.updateMarketInfo();
                }
              });
            })
            .catch(this.showError);
          break;
        case constants.USER_ACTION_REDEEM:
          // this.txSummaryDialog = true; // TODO
          this.showWaiting();
          this.market.redeem(this.account, this.amount)
            .then(() => {
              this.market.instance.on('Redeem', (from) => {
                if (from === this.walletAddress) {
                  this.showSuccess();
                  this.updateMarketInfo();
                }
              });
            })
            .catch(this.showError);
          break;
        case constants.USER_ACTION_REPAY:
          this.showWaiting();
          this.market.repay(this.account, this.amount)
            .then(() => {
              this.market.instance.on('RepayBorrow', (from) => {
                if (from === this.walletAddress) {
                  this.showSuccess();
                  this.updateMarketInfo();
                }
              });
            })
            .catch((e) => {
              console.log(e);
              this.showError();
            });
          break;
        default:
          break;
      }
      this.market.instance.on('Failure', (from, to, amount, event) => {
        console.info(`Failure from ${from} Event: ${JSON.stringify(event)}`);
        const { error, detail, info } = event.args;
        console.log(`Error: ${error}, detail: ${detail}, info: ${info}`);
        if (this.walletAddress === from) {
          this.showError();
        }
      });
    },
    actionSucceed() {
      this.successDialog = false;
      this.$emit('success');
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
      this.info.cash = await this.market.getCash();
      this.getSymbolImg();
      if (this.chainId) {
        this.info.underlyingPrice = await this.market.underlyingCurrentPrice(this.chainId);
      }
      if (this.walletAddress) {
        this.info.balance = await this.market.balanceOf(this.walletAddress);
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        this.info.liquidity = await this.comptroller.getAccountLiquidity(this.walletAddress);
        this.info.supplyBalance = await this.market
          .currentBalanceOfCTokenInUnderlying(this.walletAddress);
        this.info.borrowBalance = await this.market
          .borrowBalanceCurrent(this.walletAddress);
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
    Loading,
    TxSummary,
    SuccessDialog,
    ErrorDialog,
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
