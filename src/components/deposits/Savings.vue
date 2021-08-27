<template>
  <div class="d-flex justify-space-between micro-savings">
      <v-btn class="btn-micro"
      :class="typeMarket === 'micro' ? 'active' : 'inactive'"
      @click="updateRoute(addresses[chainId].kSAT)">
        <div class="h3-sections-heading">
          {{$t('deposit.microsavings.description1')}}
        </div>
        <div class="h1-title mt-2"
          :class="typeMarket === 'micro' ? '' : 'text-bg'"
        >
          {{ info.rateSat }}%
        </div>
        <div class="p1-descriptions mt-1">
          {{$t('deposit.microsavings.description2')}}
        </div>
      </v-btn>
      <v-btn class="btn-micro"
        :class="typeMarket === 'standar' ? 'active' : 'inactive'"
        @click="updateRoute(addresses[chainId].kRBTC)">
        <div class="h3-sections-heading">
          {{$t('deposit.microsavings.description3')}}
        </div>
        <div class="h1-title mt-2"
          :class="typeMarket === 'standar' ? '' : 'text-bg'"
        >
          {{ info.rateRbtc }}%
        </div>
        <div class="p1-descriptions mt-1">
          {{$t('deposit.microsavings.description4')}}
        </div>
      </v-btn>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { addresses } from '@/middleware/contracts/constants';
import {
  CRbtc,
} from '@/middleware';

export default {
  props: {
    microMarket: {
      type: String,
    },
  },
  data() {
    return {
      micro: '',
      info: {},
      addresses,
      typeMarket: '',
    };
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
    }),
  },
  watch: {
    microMarket() {
      this.typeMarket = this.microMarket;
    },
  },
  methods: {
    async isRBTC() {
      const info = {};
      const rtbc = addresses[this.chainId].kRBTC;
      const ksat = addresses[this.chainId].kSAT;
      const marketRbtc = new CRbtc(rtbc, this.chainId);
      const marketSat = new CRbtc(ksat, this.chainId);

      info.rateRbtc = await marketRbtc.supplyRateAPY();
      info.rateSat = await marketSat.supplyRateAPY();

      info.rateRbtc = info.rateRbtc.toFixed(1);
      info.rateSat = info.rateSat.toFixed(1);
      this.info = info;
    },
    updateRoute(marketAddress) {
      if (marketAddress === addresses[this.chainId].kRBTC) {
        this.micro = 'standar';
      } else {
        this.micro = 'micro';
      }
      this.$emit('updateRoute', marketAddress, this.micro);
    },
  },
  created() {
    this.micro = '';
    this.isRBTC();
  },
};
</script>
