<template>
  <div class="d-flex justify-space-between micro-savings">
      <v-btn class="btn-micro"
      :class="micro === 'micro' ? 'active' : 'inactive'"
      @click="updateRoute(addresses[chainId].kSAT)">
        <div class="p4-values-filled mr-3">
          {{ info.rateSat }}%
        </div>
        <div class="h3-sections-heading mt-2 mr-1">
          Microahorro <br />
          <div class="p1-descriptions">
            Hasta 0.1 rBTC
          </div>
        </div>
      </v-btn>
      <v-btn class="btn-micro standar"
        :class="micro === 'standar' ? 'active' : 'inactive'"
        @click="updateRoute(addresses[chainId].kRBTC)">
        <div class="p4-values-filled mr-2">
          {{ info.rateRbtc }}%
        </div>
        <div class="h3-sections-heading mt-2 mr-1">
          Estándar<br />
          <div class="p1-descriptions">
            Sin límite de depósito
          </div>
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
  data() {
    return {
      micro: '',
      info: {},
      addresses,
    };
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
    }),
  },
  watch: {
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
    this.isRBTC();
  },
};
</script>
