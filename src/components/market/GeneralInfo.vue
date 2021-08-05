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
        {{ rateLabel }}
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
      info: {
        underlyingSymbol: null,
        rate: null,
        symbol: null,
      },
      market: null,
      comptroller: null,
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
      rateLabel() {
        return this.$route.name === 'Deposits' ? this.$t('market.deposits.description1') : this.$t('market.borrow.description1');
      },
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
      this.info.symbol = await this.market.symbol;
      this.info.rate = this.$route.name === 'Borrows'
        ? await this.market.borrowRateAPY()
        : await this.market.supplyRateAPY();
      this.info.rate = this.info.rate.toFixed(2);
      this.getSymbolImg();
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
