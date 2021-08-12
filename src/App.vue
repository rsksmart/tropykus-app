<template>
  <v-app class="app secondary-color">
    <div class="d-flex">
      <left-bar :drawer="drawer"/>
      <div class="container-app secondary-color">
        <navbar :marketAddresses="marketAddresses" />
        <router-view />
      </div>
    </div>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Navbar from '@/components/menu/Navbar.vue';
// import LeftBar from '@/components/menu/LeftBar.vue';
import LeftBar from '@/components/menu/LeftBar.vue';
import {
  Comptroller,
  Market,
  CRbtc,
  CToken,
  Whitelist,
} from '@/middleware';
import * as constants from '@/store/constants';

export default {
  name: 'App',
  data() {
    return {
      drawer: false,
      btcToRbtcDialog: true,
      comptroller: null,
      marketAddresses: [],
      markets: [],
      dontShowWelcomeModal: false,
      whitelist: null,
    };
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
      walletAddress: (state) => state.Session.walletAddress,
    }),
  },
  methods: {
    ...mapActions({
      addMarkets: constants.SESSION_ADD_MARKETS,
    }),
    closeAndRedirect() {
      this.$router.push({ name: 'BtcToRbtc' });
      this.btcToRbtcDialog = false;
    },
    async activeWhitelist() {
      const active = await this.whitelist.isEnabled();
      console.log('pioneros', active);
    },
    async loadMarkets() {
      this.marketAddresses = await this.comptroller.allMarkets();
      let counter = 0;
      await this.marketAddresses.forEach(async (marketAddress) => {
        const isCRbtc = await Market.isCRbtc(marketAddress);
        const isCSAT = await Market.isCSat(marketAddress);
        const market = isCRbtc || isCSAT ? new CRbtc(marketAddress, this.chainId)
          : new CToken(marketAddress, this.chainId);
        this.markets.push(market);
        counter += 1;
        if (counter === this.marketAddresses.length) this.addMarkets(this.markets);
      });
    },
  },
  watch: {
    chainId(val) {
      if (val) {
        this.$forceUpdate();
      }
    },
    dontShowWelcomeModal() {
      localStorage.flag = !this.dontShowWelcomeModal;
    },
    async walletAddress() {
      if (!this.walletAddress) return;
      const authorized = await this.whitelist.userIsAuthorized(this.walletAddress);
      console.log('authorized', authorized);
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.whitelist = new Whitelist(this.chainId);
    this.loadMarkets();
    this.activeWhitelist();
  },
  mounted() {
    if (localStorage.flag) {
      this.btcToRbtcDialog = localStorage.flag === 'true';
    }
  },
  components: {
    Navbar,
    LeftBar,
  },
};
</script>
