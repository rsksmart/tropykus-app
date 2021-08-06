<template>
  <div class="balance-history">
    <div class="d-flex mb-2">
      <!-- <div @click="tabMenu = 'activity'" class="mr-10">
        <span class="b1-main pb-1 tab"
        :class="tabMenu === 'activity' ? 'text-detail text-active' : 'text-inactive'"
        >{{$t('balance.my-activity.activity')}}</span>
      </div> -->
      <div v-if="account" @click="tabMenu = 'deposit'" class="mr-10">
        <span class="b1-main pb-1 tab"
        :class="tabMenu === 'deposit' ? 'text-detail text-active' : 'text-inactive'"
        >{{$t('balance.my-activity.deposits')}}</span>
      </div>
      <div v-if="account" @click="tabMenu = 'debts'">
        <span class="b1-main pb-1 tab"
        :class="tabMenu === 'debts' ? 'text-detail text-active' : 'text-inactive'"
        >{{$t('balance.my-activity.debts')}}</span>
      </div>
    </div>

    <div class="results">
      <!-- <div class="d-flex justify-center flex-column align-center"> -->
        <!-- <div class="p1-descriptions mb-5">
          No tienes fondos  aún. Compra Bitcoin (BTC) o transfierelos desde plataformas como Binance
        </div>
        <v-btn @click="openTransfer"
          text class="btn btn-primary"
          ><span class="white--text">Transferir BTC a mi billetera</span></v-btn>
      </div> -->
      <div v-if="validate_MM_NT" class="d-flex justify-center flex-column align-center">
        <div class="p1-descriptions mb-5">
          {{$t('balance.my-activity.validations.description1')}}
          // validate_MM_NT
        </div>
        <v-btn @click="openTutorial"
          text class="btn btn-secondary"
          ><span>{{$t('balance.my-activity.validations.btn1')}}</span></v-btn>
      </div>

      <div v-if="addDepositAll" class="d-flex justify-center flex-column align-center">
        <div class="p1-descriptions mb-5">
          {{$t('balance.my-activity.validations.description2')}}
        </div>
        <v-btn @click="redirect(constants.ROUTE_NAMES.DEPOSITS)"
          text class="btn btn-primary"
          ><span class="white--text">{{$t('balance.my-activity.validations.btn2')}}</span>
        </v-btn>
      </div>

      <div v-if="validate_LQ" class="d-flex justify-center flex-column align-center">
        <div class="p1-descriptions mb-5">
          {{$t('balance.my-activity.validations.description3')}}
          // validate_LQ
        </div>
        <div class="d-flex">
          <v-btn @click="openTutorial" text class="btn btn-secondary mr-6">
            <span>{{$t('balance.my-activity.validations.btn3')}}</span>
          </v-btn>
          <v-btn @click="openTutorial" text class="btn btn-primary">
            <span class="white--text">{{$t('balance.my-activity.validations.btn4')}}</span>
          </v-btn>
        </div>
      </div>

      <div v-if="borrowAll" class="d-flex justify-center flex-column align-center">
        <div class="p1-descriptions mb-5">
          {{$t('balance.my-activity.validations.description4')}}
          // borrowAll
        </div>
        <v-btn @click="redirect(constants.ROUTE_NAMES.BORROWS)" text class="btn btn-primary">
          <span class="white--text">{{$t('balance.my-activity.validations.btn5')}}</span>
        </v-btn>
      </div>

      <template v-for="(market, i) in getMarkets" >
        <!-- Depositos -->
        <div class="d-flex justify-space-between activity mt-8" :key="i"
          v-if="market.supplyBalance > 0 && tabMenu === 'deposit'">
          <div class="d-flex">
            <img :src="market.img">
            <div class="h2-heading">
              <span class="text-uppercase">{{market.symbol}}</span>
            </div>
          </div>
          <div class="p7-graphics">
            {{$t('balance.table.deposit.description1')}} <br />
            <div class="p6-reading-values">
              {{market.supplyBalance | formatDecimals(market.symbol)}}
              <span class="text-uppercase">{{market.symbol}}</span>
            </div>
            <div class="p3-USD-value">
              {{market.blanceUsd | formatPrice(market.symbol)}}
            </div>
          </div>
          <div class="p7-graphics">
            {{$t('balance.table.deposit.description2')}} <br />
            <div class="p6-reading-values">
              {{market.interestBalance | formatDecimals(market.symbol)}}
              <span class="text-uppercase">{{market.symbol}}</span>
            </div>
            <div class="p3-USD-value">
              {{market.interesUsd | formatPrice}}
            </div>
          </div>
          <div class="p7-graphics interes">
            {{$t('balance.table.deposit.description3')}}
            <br />
            <div class="p6-reading-values">
              {{market.rateSupply}}%
            </div>
          </div>
          <div class="mt-2 actions">
            <v-btn text class="btn1 mr-1"
              @click="redirect(constants.ROUTE_NAMES.DEPOSIT, market.marketAddress)">
              <span class="text-primary">{{$t('balance.table.deposit.btn1')}}</span>
            </v-btn>
            <v-btn text class="btn2"
              @click="redirect(constants.ROUTE_NAMES.DEPOSIT, market.marketAddress, false)">
              <span class="text-primary">{{$t('balance.table.deposit.btn2')}}</span>
            </v-btn>
          </div>
        </div>

        <!-- Deudas -->
        <div class="d-flex justify-space-between activity mt-8" :key="i"
        v-if="market.borrowBalance > 0 && tabMenu === 'debts'"
        >
          <div class="d-flex">
            <img :src="market.img">
            <div class="h2-heading">
              <span class="text-uppercase">{{market.symbol}}</span>
            </div>
          </div>
          <div class="p7-graphics">
            {{$t('balance.table.debts.description1')}}<br />
            <div class="p6-reading-values">
              {{market.borrowBalance | formatDecimals(market.symbol)}}
              <span class="text-uppercase">{{market.symbol}}</span>
            </div>
            <div class="p3-USD-value">
              {{market.borrowUsd | formatPrice}}
            </div>
          </div>
          <div class="p7-graphics">
            {{$t('balance.table.debts.description2')}}<br />
            <div class="p6-reading-values">
              {{market.interestBorrow | formatDecimals(market.symbol)}}
              <span class="text-uppercase">{{market.symbol}}</span>
            </div>
            <div class="p3-USD-value">
              {{market.interestBorrowUsd | formatPrice}}
            </div>
          </div>
          <div class="p7-graphics interes">
            {{$t('balance.table.debts.description3')}}<br />
            <div class="p6-reading-values">
              {{market.rateBorrow}}%
            </div>
          </div>
          <div class="mt-2 actions">
            <v-btn text class="btn1 mr-1"
              @click="redirect(constants.ROUTE_NAMES.BORROW, market.marketAddress)">
              <span class="text-primary">{{$t('balance.table.debts.btn1')}}</span>
            </v-btn>
            <v-btn text class="btn2"
              @click="redirect(constants.ROUTE_NAMES.BORROW, market.marketAddress, false)">
              <span class="text-primary">{{$t('balance.table.debts.btn2')}}</span>
            </v-btn>
          </div>
        </div>
      </template>

    </div>

     <template v-if="tutorial">
      <tutorial :showModal="tutorial" @closed="closeModal"></tutorial>
    </template>

    <template v-if="transfer">
      <transfer :showModal="transfer" @closed="closeModal"></transfer>
    </template>

  </div>
</template>
<script>
import { mapState } from 'vuex';
import * as constants from '@/store/constants';
import {
  CRbtc,
} from '@/middleware';
import Tutorial from '@/components/dialog/Tutorial.vue';
import Transfer from '@/components/dialog/Transfer.vue';

export default {
  name: 'HistoryBalance',
  components: {
    Tutorial,
    Transfer,
  },
  props: {
    dataMarkets: {
      type: Array,
      require: true,
    },
    infoDeposits: {
      type: Object,
      require: true,
    },
    infoBorrows: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      constants,
      tabMenu: 'deposit',
      getMarkets: [],
      rbtc: '0xE47b7c669F96B1E0Bf537bB27fF5C6264fe0d380',
      tutorial: false,
      transfer: false,
      amountRbtc: 0,
      MM: 'WALLET_METAMASK',
      LQ: 'WALLET_LIQUALITY',
      NT: 'WALLET_NIFTY',
      WC: 'WALLET_CONNECT',
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
      chainId: (state) => state.Session.chainId,
      wallet: (state) => state.Session.wallet,
    }),
    totalDeposits() {
      return Object.entries(this.infoDeposits).length > 0
        ? Number(this.infoDeposits.totalDeposits).toFixed(2) : 0;
    },
    totalBorrows() {
      return Object.entries(this.infoBorrows).length > 0
        ? Number(this.infoBorrows.totalBorrows).toFixed(2) : 0;
    },
    validate_MM_NT() {
      return (this.wallet === this.MM || this.wallet === this.NT)
        && !Number(this.totalDeposits) && !Number(this.totalBorrows) && !this.amountRbtc;
    },
    deposit_MM_NT() {
      return (this.wallet === this.MM || this.wallet === this.NT)
        && !Number(this.totalDeposits) && this.amountRbtc;
    },
    validate_LQ() {
      return this.wallet === this.LQ && !this.amountRbtc && !Number(this.totalDeposits);
    },
    addDepositAll() {
      return this.amountRbtc && !Number(this.totalDeposits);
    },
    borrowAll() {
      return !Number(this.totalBorrows) && Number(this.totalDeposits) && this.amountRbtc
        && this.tabMenu === 'debts';
    },
  },
  watch: {
    dataMarkets() {
      this.getMarkets = this.dataMarkets;
    },
  },
  methods: {
    redirect(routePath, marketAddress = '', menu = 'true') {
      if (marketAddress === '') {
        const to = { name: routePath };
        this.$router.push(to);
      } else {
        const to = { name: routePath, params: { id: marketAddress, menu } };
        this.$router.push(to);
      }
    },
    async isRbtc() {
      // if (!this.account) return;
      this.getMarkets = this.dataMarkets;
      const market = new CRbtc(this.rbtc, this.chainId);
      this.amountRbtc = await market.balanceOfUnderlyingInWallet(this.account);
    },
    openTutorial() {
      this.tutorial = true;
    },
    openTransfer() {
      this.transfer = true;
    },
    closeModal() {
      this.tutorial = false;
      this.transfer = false;
    },
  },
  created() {
    this.isRbtc();
  },
};
</script>
