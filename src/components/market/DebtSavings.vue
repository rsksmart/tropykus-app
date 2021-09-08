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
          <v-tooltip top color="#52826E">
            <template v-slot:activator="{ on, attrs }">
              <p class="p2-reading-values" v-bind="attrs" v-on="on">
                {{
                  info.totalBalance | formatDecimals(info
                    .underlyingSymbol)
                }} {{ info.underlyingSymbol }}
              </p>
            </template>
            <span>{{ info.totalBalance }}</span>
          </v-tooltip>
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
          <v-tooltip top color="#52826E">
            <template v-slot:activator="{ on, attrs }">
              <p class="p2-reading-values" v-bind="attrs" v-on="on">
                {{
                  info.interestBalance | formatDecimals(info
                    .underlyingSymbol)
                }} {{ info.underlyingSymbol }}
              </p>
            </template>
            <span>{{ info.interestBalance }}</span>
          </v-tooltip>
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
          {{ $t('market.general.description1') }}
          {{ rateLabel }}
          {{ $t('market.general.description2') }}
        </p>
      </v-col>
      <v-col cols="4" class="pa-0 d-flex justify-end">
        <p class="text-right p2-reading-values">{{ info.rate }}%</p>
      </v-col>
    </v-row>
    <v-row class="ma-0 container">
      <v-col class="pa-0 pr-1" cols="6">
        <v-btn depressed :color="buttonColor" width="100%" height="44"
               @click="repayOrSupply(true)">
          <span class="b1-main">{{ supplyBorrowLabel }}</span>
        </v-btn>
      </v-col>
      <v-col class="pa-0 pl-1" cols="6">
        <v-btn depressed outlined color="#FFF" width="100%" height="44"
               @click="repayOrSupply(false)">
          <span class="b1-main">{{ redeemRepayLabel }}</span>
        </v-btn>
      </v-col>
    </v-row>
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
      db: {},
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
      market: null,
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
    marketOnExplorer() {
      return `${this.baseExplorerURL}/${this.marketAddress}`;
    },
    rateLabel() {
      return this.inBorrowMenu ? this.$t('market.borrow.description1') : this.$t('market.deposits.description1');
    },
    supplyBorrowLabel() {
      return this.inBorrowMenu ? this.$t('market.my-debts.button1') : this.$t('market.my-deposits.button1');
    },
    redeemRepayLabel() {
      return this.inBorrowMenu ? this.$t('market.my-debts.button2') : this.$t('market.my-deposits.button2');
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
          if (assetsIn.indexOf(this.marketAddress) === -1) {
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
              this.showSuccess();
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
    isCRbtc() {
      return Market.isCRbtc(this.marketAddress);
    },
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
