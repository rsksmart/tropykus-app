<template>
  <!-- <div class="container"> -->
    <!-- <v-container> -->
      <!-- <v-row class="ma-0 mb-5 pl-3"> -->
        <!-- <h3 class="text-left h3-sections-heading">{{ $t('market.title') }}</h3> -->
      <!-- </v-row> -->
    <div>
      <template v-if="marketsLoaded">
        <v-row class=" d-flex justify-center flex-wrap">
          <!-- <template cols="4" > -->
            <general-info
              v-for="(market, idx) in markets" :key="`market-${idx}`"
              :inBorrowMenu="inBorrowMenu" :marketAddress="market"
            />
          <!-- </template> -->
        </v-row>
      </template>
      <template v-else>
        <v-row class="mx-0 mt-4">
          <v-col cols="3" v-for="index in 4" :key="index">
            <v-skeleton-loader type="image" height="158"/>
          </v-col>
        </v-row>
      </template>
    </div>
    <!-- </v-container> -->
  <!-- </div> -->
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
  props: {
    inBorrowMenu: {
      required: true,
      type: Boolean,
    },
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
  methods: {
    async load() {
      this.markets = await this.comptroller.allMarkets;
    },
  },
  components: {
    GeneralInfo,
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.load();
  },
  updated() {
    this.load();
  },
};
</script>
