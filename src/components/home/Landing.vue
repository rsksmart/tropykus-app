<template>
    <div class="d-flex justify-center mt-1">
      <template v-if="marketsLoaded">
        <div class=" d-flex flex-wrap">
            <general-info
              v-for="(market, idx) in markets" :key="`market-${idx}`"
              :marketAddress="market"
            />
        </div>
      </template>
      <template v-else>
        <v-row class="mx-0 mt-4">
          <v-col cols="3" v-for="index in 4" :key="index">
            <v-skeleton-loader type="image" height="158"/>
          </v-col>
        </v-row>
      </template>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { Comptroller } from '@/middleware';
import GeneralInfo from '@/components/market/GeneralInfo.vue';

export default {
  name: 'Landing',
  data() {
    return {
      comptroller: undefined,
      markets: [],
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
      chainId: (state) => state.Session.chainId,
    }),
    marketsLoaded() {
      return this.markets.length > 0;
    },
  },
  watch: {
    chainId() {
      this.load();
    },
  },
  methods: {
    async load() {
      this.comptroller = new Comptroller(this.chainId);
      this.markets = await this.comptroller.allMarkets(false);
    },
  },
  components: {
    GeneralInfo,
  },
  created() {
    this.load();
  },
  updated() {
    this.load();
  },
};
</script>
