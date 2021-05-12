<template>
  <v-card width="100%" class="market-card container" color="#013E2F">
    <v-row class="ma-0 container">
      <v-col cols="auto" class="pa-0 pr-2 d-flex align-center">
        <v-img position="left center" height="40" width="40" :src="symbolImg" contain/>
      </v-col>
      <v-col class="pa-0 d-flex align-center">
        <h2 class="h2-heading">{{ info.underlyingSymbol }}</h2>
      </v-col>
      <v-col cols="auto" class="pa-0 d-flex justify-center align-center">
        <a :href="marketOnExplorer" target="_blank">
          <v-img height="16" src="@/assets/icons/link.svg" contain/>
        </a>
      </v-col>
    </v-row>
    <v-row class="ma-0 mx-3">
      <v-divider color="#BEBEBE"/>
    </v-row>
    <div>
      <div class="container">
        <v-row class="ma-0">
          <p class="p1-descriptions">Total {{ borrowSupplyBalanceLabel }}</p>
        </v-row>
        <v-row class="ma-0">
          <p class="p2-reading-values">{{ info.totalBalance | formatDecimals(info
            .underlyingSymbol ) }} {{ info.underlyingSymbol }}</p>
        </v-row>
        <v-row class="ma-0">
          <p class="p3-USD-values">{{ tokenPrice | formatPrice }} USD</p>
        </v-row>
      </div>
      <div class="container">
        <v-row class="ma-0">
          <p class="p1-descriptions">{{ payRedeemBalanceLabel }}</p>
        </v-row>
        <v-row class="ma-0">
          <p class="p2-reading-values">{{ info.interestBalance | formatDecimals(info
            .underlyingSymbol ) }} {{ info.underlyingSymbol }}</p>
        </v-row>
        <v-row class="ma-0">
          <p class="p3-USD-values">{{ tokenInterestPrice | formatPrice }} USD</p>
        </v-row>
      </div>
    </div>
    <v-row class="ma-0 mx-3">
      <v-divider color="#BEBEBE"/>
    </v-row>
    <v-row class="ma-0 container">
      <v-col cols="8" class="pa-0">
        <p class="p1-descriptions">
          Tasa de {{ rateLabel }} <br> dinámica actual
        </p>
      </v-col>
      <v-col cols="4" class="pa-0 d-flex justify-end">
        <p class="text-right p2-reading-values">{{ info.rate }}%</p>
      </v-col>
    </v-row>
    <v-row class="ma-0 container">
      <v-btn depressed :color="buttonColor" width="100%" height="44"
             @click="repayOrSupply">
        <span class="b1-main">{{ buttonName }}</span>
      </v-btn>
    </v-row>
    <template v-if="supplyRepayDialog">
      <component :is="supplyRepayComponent" :showModal="supplyRepayDialog" :inBorrowMenu="false"
                 :info="info" @action="menuAction" @closed="supplyRepayDialog = false" />
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
import { mapState } from 'vuex';
import * as constants from '@/store/constants';
import Loading from '@/components/dialog/Loading.vue';
import BorrowRepay from '@/components/dialog/BorrowRepay.vue';
import SupplyRedeem from '@/components/dialog/SupplyRedeem.vue';
import TxSummary from '@/components/dialog/TxSummary.vue';
import SuccessDialog from '@/components/dialog/SuccessDialog.vue';
import ErrorDialog from '@/components/dialog/ErrorDialog.vue';
import {
  CRbtc,
  CToken,
  Market,
  Comptroller,
} from '@/middleware';

export default {
  name: 'DebtSavings',
  data() {
    return {
      db: this.$firebase.firestore(),
      symbolImg: null,
      baseExplorerURL: 'https://explorer.testnet.rsk.co/address/',
      comptroller: null,
      info: {
        name: null,
        symbol: null,
        balance: null,
        rate: null,
        interestBalance: null,
        totalBalance: null,
        underlyingBalance: null,
        exchangeRate: null,
        savings: null,
        price: null,
        underlyingPrice: null,
        available: null,
        underlying: null,
        cash: null,
        liquidity: null,
        borrowBalance: null,
      },
      supplyRepayDialog: false,
      supplyRepayComponent: 'SupplyRedeem',
      waitingDialog: false,
      successDialog: false,
      errorDialog: false,
      txSummaryDialog: false,
      amount: null,
      currentAction: null,
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
    borrowSupplyBalanceLabel() {
      return this.inBorrowMenu ? 'a pagar' : 'depositado';
    },
    payRedeemBalanceLabel() {
      return this.inBorrowMenu ? 'Intereses acumulados' : 'Ganancias históricas';
    },
    tokenPrice() {
      return this.info.totalBalance * this.info.underlyingPrice;
    },
    tokenInterestPrice() {
      return this.info.interestBalance * this.info.underlyingPrice;
    },
    buttonColor() {
      return this.inBorrowMenu ? '#FF9153' : '#4CB163';
    },
    buttonName() {
      return this.inBorrowMenu ? 'Pagar' : 'Depositar';
    },
    marketOnExplorer() {
      return `${this.baseExplorerURL}/${this.marketAddress}`;
    },
    rateLabel() {
      return this.inBorrowMenu ? 'interés anual' : 'rendimiento anual';
    },
  },
  methods: {
    repayOrSupply() {
      this.supplyRepayDialog = true;
      this.supplyRepayComponent = this.inBorrowMenu ? 'BorrowRepay' : 'SupplyRedeem';
    },
    reset() {
      this.waitingDialog = false;
      this.successDialog = false;
      this.errorDialog = false;
      this.txSummaryDialog = false;
      this.supplyRepayDialog = false;
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
    getSymbolImg() {
      this.db
        .collection('markets-symbols').doc(this.info.symbol).get().then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
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
      this.info.exchangeRate = await this.market.exchangeRateCurrent();
      this.info.underlyingSymbol = await this.market.underlyingAssetSymbol();
      this.info.cash = await this.market.getCash();
      this.info.rate = this.inBorrowMenu
        ? await this.market.borrowRateAPY()
        : await this.market.supplyRateAPY();
      this.info.rate = this.info.rate.toFixed(3);
      this.getSymbolImg();
      if (this.chainId) {
        this.info.underlyingPrice = await this.market.underlyingCurrentPrice(this.chainId);
      }
      if (this.walletAddress) {
        this.info.balance = await this.market.balanceOf(this.walletAddress);
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        this.info.liquidity = await this.comptroller.getAccountLiquidity(this.walletAddress);
        this.info.borrowBalance = await this.market
          .borrowBalanceCurrent(this.walletAddress);
        this.info.totalBalance = this.inBorrowMenu
          ? this.info.borrowBalance
          : await this.market.currentBalanceOfCTokenInUnderlying(this.walletAddress);
        this.info.interestBalance = this.inBorrowMenu
          ? await this.market.getDebtInterest(this.walletAddress)
          : await this.market.getEarnings(this.walletAddress);
      }
    },
    isCRbtc() {
      return Market.isCRbtc(this.marketAddress);
    },
  },
  components: {
    BorrowRepay,
    Loading,
    TxSummary,
    SuccessDialog,
    ErrorDialog,
    SupplyRedeem,
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
