<template>
  <v-row>
    <v-col class="d-flex justify-center">
      <v-col class="pa-0 text-center">
        <v-img class="mx-auto" position="center center" height="40"
          width="40" :src="symbolImg" contain/>
        <h2 class="h2-heading ml-2">{{ info.underlyingSymbol }}</h2>
      </v-col>
    </v-col>
    <v-col>
      <p class="text-center p2-reading-values">
        {{ info.totalBalance | formatDecimals(info
          .underlyingSymbol) }} {{ info.underlyingSymbol }}
      </p>
      <p class=" text-center p3-USD-values">{{ tokenPrice | formatPrice }} USD</p>
    </v-col>
    <v-col>
      <p class="text-center p2-reading-values">
        {{ info.interestBalance | formatDecimals(info
          .underlyingSymbol) }} {{ info.underlyingSymbol }}
      </p>
      <p class="p3-USD-values text-center">{{ tokenInterestPrice | formatPrice }} USD</p>
    </v-col>
    <v-col>
      <p class="text-center p2-reading-values">{{ info.rate }}%</p>
    </v-col>
    <v-col>
      <v-row class="mx-auto">
        <v-col class="pa-0 pr-1" cols="6">
          <v-btn depressed :color="buttonColor" width="100%" height="36"
                 @click="repayOrSupply(true)">
            <span class="b1-main">{{ supplyBorrowLabel }}</span>
          </v-btn>
        </v-col>
        <v-col class="pa-0 pl-1" cols="6">
          <v-btn depressed outlined color="#FFF" width="100%" height="36"
                 @click="repayOrSupply(false)">
            <span class="b1-main">{{ redeemRepayLabel }}</span>
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
    <template v-if="supplyRepayDialog">
      <component :is="supplyRepayComponent" :showModal="supplyRepayDialog"
                 :inBorrowMenu="buttonAction" :info="{ market, ...info }" @action="menuAction"
                 @closed="supplyRepayDialog = false"/>
    </template>
    <template v-if="waitingDialog">
      <loading :showModal="waitingDialog"/>
    </template>
    <template v-if="successDialog">
      <success-dialog :showModal="successDialog" :amount="amount"
                      :underlyingSymbol="info.underlyingSymbol" :action="currentAction"
                      @close="actionSucceed"/>
    </template>
    <template v-if="errorDialog">
      <error-dialog :showModal="errorDialog" :action="currentAction"
                    @close="errorDialog = false"/>
    </template>
    <template v-if="txSummaryDialog">
      <tx-summary :showModal="txSummaryDialog" :action="currentAction"/>
    </template>
  </v-row>
</template>

<script>
import * as constants from '@/store/constants';
import Loading from '@/components/dialog/Loading.vue';
import BorrowRepay from '@/components/dialog/BorrowRepay.vue';
import SupplyRedeem from '@/components/dialog/SupplyRedeem.vue';
import TxSummary from '@/components/dialog/TxSummary.vue';
import SuccessDialog from '@/components/dialog/SuccessDialog.vue';
import ErrorDialog from '@/components/dialog/ErrorDialog.vue';
import { mapState } from 'vuex';
import { Comptroller } from '@/middleware';

export default {
  name: 'DebtSavingsRow',
  data() {
    return {
      db: this.$firebase.firestore(),
      symbolImg: null,
      baseExplorerURL: 'https://explorer.testnet.rsk.co/address/',
      comptroller: null,
      info: {
        underlyingSymbol: null,
        cash: null,
        rate: null,
        underlyingPrice: null,
        underlyingBalance: null,
        liquidity: null,
        interestBalance: null,
        supplyBalance: null,
        borrowBalance: null,
        totalBalance: null,
      },
      supplyRepayDialog: false,
      supplyRepayComponent: 'SupplyRedeem',
      waitingDialog: false,
      successDialog: false,
      errorDialog: false,
      txSummaryDialog: false,
      amount: null,
      currentAction: null,
      earnings: null,
      interest: null,
      buttonAction: null,
    };
  },
  props: {
    market: {
      type: Object,
      required: false,
    },
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
      chainId: (state) => state.Session.chainId,
      account: (state) => state.Session.account,
    }),
    borrowSupplyBalanceLabel() {
      return this.inBorrowMenu ? this.$t('market.my-debts.subtitle1') : this.$t('market.my-deposits.subtitle1');
    },
    payRedeemBalanceLabel() {
      return this.inBorrowMenu ? this.$t('market.my-debts.subtitle2') : this.$t('market.my-deposits.subtitle2');
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
    supplyBorrowLabel() {
      return this.inBorrowMenu ? this.$t('market.my-debts.button1') : this.$t('market.my-deposits.button1');
    },
    redeemRepayLabel() {
      return this.inBorrowMenu ? this.$t('market.my-debts.button2') : this.$t('market.my-deposits.button2');
    },
  },
  methods: {
    repayOrSupply(buttonAction) {
      this.supplyRepayDialog = true;
      this.buttonAction = buttonAction;
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
          if (assetsIn.indexOf(this.market.marketAddress) === -1) {
            await this.comptroller.enterMarkets(this.account, this.allMarkets);
          }
          // this.txSummaryDialog = true; // TODO
          this.showWaiting();
          await this.market.supply(this.account, this.amount)
            .then(() => {
              this.market.wsInstance.on('Mint', (from) => {
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
              this.market.wsInstance.on('Borrow', (from) => {
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
              this.market.wsInstance.on('Redeem', (from) => {
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
              this.market.wsInstance.on('RepayBorrow', (from) => {
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
      this.market.wsInstance.on('Failure', (from, to, amount, event) => {
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
        .collection('markets-symbols')
        .doc(this.info.underlyingSymbol)
        .get().then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
    },
    actionSucceed() {
      this.successDialog = false;
      this.$emit('success');
    },
    async updateMarketInfo() {
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
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        this.info.liquidity = await this.comptroller.getAccountLiquidity(this.walletAddress);
        this.info.interestBalance = this.inBorrowMenu
          ? await this.market.getDebtInterest(this.walletAddress)
          : await this.market.getEarnings(this.walletAddress);
        this.info.supplyBalance = await this.market
          .currentBalanceOfCTokenInUnderlying(this.walletAddress);
        this.info.borrowBalance = await this.market
          .borrowBalanceCurrent(this.walletAddress);
        this.info.totalBalance = this.inBorrowMenu
          ? this.info.borrowBalance
          : await this.market.currentBalanceOfCTokenInUnderlying(this.walletAddress);
      }
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
    this.updateMarketInfo();
  },
};
</script>
