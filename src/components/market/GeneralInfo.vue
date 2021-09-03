<template>
  <v-card width="209" height="215"
    @click="redirect(constants.ROUTE_NAMES.DEPOSIT, info.underlyingSymbol)"
    class="card-item d-flex flex-column justify-space-between"
    >
    <div class="">
      <div class="d-flex justify-space-between">
        <div class="h1-title text-info">{{info.underlyingSymbol}}</div>
        <img v-if="symbolImg" :src="symbolImg">
      </div>
      <div class="p1-descriptions ml-1">
        {{textMicro}}
      </div>
    </div>
    <div class="d-flex flex-column justify-space-between">
      <div class="h1-subtitle text-info">
        {{info.rate}}%
      </div>
      <div class="p1-descriptions text-info mt-4" style="width: 119px">
        {{ rateLabel }}
      </div>
    </div>
  </v-card>

</template>

<script>
import { mapState } from 'vuex';
import * as constants from '@/store/constants';
import { addresses } from '@/middleware/contracts/constants';
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
        micro: null,
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
      textMicro() {
        if (this.$route.name === constants.ROUTE_NAMES.DEPOSITS
          && this.marketAddress === addresses[this.chainId].kSAT
        ) {
          return this.$t('market.general.description4');
        }
        if (this.$route.name === constants.ROUTE_NAMES.BORROWS
          && this.marketAddress === addresses[this.chainId].kSAT) {
          return this.$t('market.general.description5');
        }
        return '';
      },
      rateLabel() {
        return this.$route.name === constants.ROUTE_NAMES.DEPOSITS
          ? this.$t('market.general.description1')
          : this.$t('market.general.description2');
      },
    }),
  },
  methods: {
    redirect(routePath) {
      if (this.$route.name === constants.ROUTE_NAMES.DEPOSITS) {
        const to = { name: routePath, params: { id: this.marketAddress } };
        this.$router.push(to);
      }
      if (this.$route.name === constants.ROUTE_NAMES.BORROWS) {
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
      this.info.micro = await Market.isCSat(this.marketAddress);
      this.info.underlyingSymbol = await this.market.underlyingAssetSymbol();
      this.info.rate = this.$route.name === constants.ROUTE_NAMES.BORROWS
        ? await this.market.borrowRateAPY()
        : await this.market.supplyRateAPY();
      this.info.rate = this.info.rate.toFixed(2);
      this.getSymbolImg();
    },
    async isCRbtc() {
      const isCSAT = await Market.isCSat(this.marketAddress);
      const isCRbtc = await Market.isCRbtc(this.marketAddress);
      return isCSAT || isCRbtc;
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
