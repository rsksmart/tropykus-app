<template>
  <v-card width="209" height="215"
    @click="redirect(constants.ROUTE_NAMES.DEPOSIT, info.underlyingSymbol)"
    class="card-item d-flex flex-column justify-space-between"
    >
    <div class="d-flex justify-space-between">
      <div class="h1-title text-info text-uppercase">{{info.underlyingSymbol}}</div>
      <img v-if="symbolImg" :src="symbolImg">
    </div>
    <div class="d-flex flex-column justify-space-between">
      <div class="h1-subtitle text-info">
        {{info.rate}}%
      </div>
      <div class="p1-descriptions text-info mt-4" style="width: 119px">
        {{ $t('market.general.description1') }}
        {{ $t('market.borrow.description1') }}
        {{ $t('market.general.description2') }}
        {{ $t('market.general.description3') }}
      </div>
    </div>

  </v-card>

</template>

<script>
import { mapState } from 'vuex';
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
      constants,
      db: this.$firebase.firestore(),
      symbolImg: null,
      baseExplorerURL: 'https://explorer.testnet.rsk.co/address',
      info: {
        underlyingSymbol: null,
        cash: null,
        rate: null,
        totalBorrows: null,
        totalBalance: null,
        underlyingPrice: null,
        underlyingBalance: null,
        liquidity: null,
        interestBalance: null,
        supplyBalance: null,
        borrowBalance: null,
      },
      market: null,
      comptroller: null,
      allMarkets: [],
    };
  },
  props: {
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
  },
  methods: {
    redirect(routePath) {
      if (this.$route.name === 'Deposits') {
        const to = { name: routePath, params: { id: this.marketAddress } };
        this.$router.push(to);
      }
      if (this.$route.name === 'Borrows') {
        const to = { name: constants.ROUTE_NAMES.BORROW, params: { id: this.marketAddress } };
        this.$router.push(to);
      }
    },
    getSymbolImg() {
      this.db
        .collection('markets-symbols')
        .doc(this.info.underlyingSymbol)
        .get()
        .then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
    },
    async updateMarketInfo() {
      this.info.underlyingSymbol = await this.market.underlyingAssetSymbol();
      this.info.cash = await this.market.getCash();
      this.info.symbol = await this.market.symbol;
      this.info.rate = this.inBorrowMenu
        ? await this.market.borrowRateAPY()
        : await this.market.supplyRateAPY();
      this.info.rate = this.info.rate.toFixed(2);
      this.info.totalBorrows = await this.market.totalBorrowsInUnderlying();
      this.getSymbolImg();
      if (this.chainId) {
        this.info.underlyingPrice = await this.market.underlyingCurrentPrice(this.chainId);
      }
      if (this.walletAddress) {
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        this.info.interestBalance = this.inBorrowMenu
          ? await this.market.getDebtInterest(this.walletAddress)
          : await this.market.getEarnings(this.walletAddress);
        this.info.liquidity = await this.comptroller.getAccountLiquidity(this.walletAddress);
        this.info.supplyBalance = await this.market
          .currentBalanceOfCTokenInUnderlying(this.walletAddress);
        this.info.borrowBalance = await this.market
          .borrowBalanceStored(this.walletAddress);
        this.info.interestBalance = this.inBorrowMenu
          ? await this.market.getDebtInterest(this.walletAddress)
          : await this.market.getEarnings(this.walletAddress);
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
