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
      <v-col cols="5" class="pa-0 d-flex align-start">
        <v-btn depressed :color="buttonColor" width="100%" height="30"
               :disabled="!inBorrowMenu" @click="repayOrDetails">
          {{ buttonName }}
        </v-btn>
      </v-col>
    </v-row>
    <v-row class="mx-0 container">
      <v-divider color="#BEBEBE"/>
    </v-row>
    <v-row class="mx-0 mb-1 container">
      <v-col cols="6">
        <div>
          <v-row class="mx-0">
            <p>{{ borrowSupplyBalanceLabel }}</p>
          </v-row>
          <v-row class="mx-0">
            <v-tooltip top color="#52826E">
              <template v-slot:activator="{ on, attrs }">
                <p class="boldie" v-bind="attrs" v-on="on">
                  {{ info.initialBalance | formatDecimals }}
                  {{ info.underlyingSymbol }}
                  <span class="italique"> = {{ tokenPrice | formatPrice }} USD</span>
                </p>
              </template>
              <span>{{ info.initialBalance }}</span>
            </v-tooltip>
          </v-row>
        </div>
      </v-col>
      <v-col cols="6">
        <div>
          <v-row class="mx-0">
            <p>{{ payRedeemBalanceLabel }}</p>
          </v-row>
          <v-row class="mx-0">
            <v-tooltip top color="#52826E">
              <template v-slot:activator="{ on, attrs }">
                <p class="boldie" v-bind="attrs" v-on="on">
                  {{ info.interestBalance | formatDecimals }}
                  {{ info.underlyingSymbol }}
                  <span class="italique"> = {{ tokenInterestPrice | formatPrice }} USD</span>
                </p>
              </template>
              <span>{{ info.interestBalance }}</span>
            </v-tooltip>
          </v-row>
        </div>
      </v-col>
    </v-row>
    <template v-if="borrowRepayDialog">
      <borrow-repay :showModal="borrowRepayDialog" :inBorrowMenu="false"
                    :info="info"  @action="repay" @closed="borrowRepayDialog = false" />
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
import Loading from '@/components/dialog/Loading.vue';
import BorrowRepay from '@/components/dialog/BorrowRepay.vue';
import TxSummary from '@/components/dialog/TxSummary.vue';
import SuccessDialog from '@/components/dialog/SuccessDialog.vue';
import ErrorDialog from '@/components/dialog/ErrorDialog.vue';
import {
  CRbtc,
  CToken,
  Market,
  Comptroller,
} from '@/middleware';
import { mapState } from 'vuex';

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
        interestBalance: null,
        initialBalance: null,
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
      borrowRepayDialog: false,
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
      return this.inBorrowMenu ? 'Pediste prestado' : 'Tienes depositado';
    },
    payRedeemBalanceLabel() {
      return this.inBorrowMenu ? 'Debes pagar' : 'Has ganado';
    },
    tokenPrice() {
      return this.info.initialBalance * this.info.underlyingPrice;
    },
    tokenInterestPrice() {
      return this.info.interestBalance * this.info.underlyingPrice;
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
    repayOrDetails() {
      if (this.inBorrowMenu) {
        this.borrowRepayDialog = true;
      }
    },
    reset() {
      this.waitingDialog = false;
      this.successDialog = false;
      this.errorDialog = false;
      this.txSummaryDialog = false;
      this.borrowRepayDialog = false;
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
    repay({ amountIntended, action }) {
      this.amount = amountIntended;
      this.currentAction = action;
      this.reset();
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
      this.getSymbolImg();
      if (this.chainId) {
        this.info.underlyingPrice = await this.market.underlyingCurrentPrice(this.chainId);
      }
      if (this.walletAddress) {
        this.info.balance = await this.market.balanceOf(this.walletAddress);
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        this.info.interestBalance = this.inBorrowMenu
          ? await this.market.borrowBalanceCurrent(this.walletAddress)
          : await this.market.getEarnings(this.walletAddress);
        this.info.initialBalance = this.inBorrowMenu
          ? await this.market.getInitialBorrow(this.walletAddress)
          : await this.market.getInitialSupply(this.walletAddress);
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        this.info.liquidity = await this.comptroller.getAccountLiquidity(this.walletAddress);
        this.info.borrowBalance = await this.market
          .borrowBalanceCurrent(this.walletAddress);
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
