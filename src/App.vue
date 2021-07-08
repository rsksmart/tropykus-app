<template>
  <v-app class="app secondary-color">
    <div class="d-flex">
      <left-bar :drawer="drawer"/>
      <div class="container-app secondary-color">
        <navbar :marketAddresses="marketAddresses" />
        <router-view />
      </div>
    </div>
    <!-- <v-dialog v-model="btcToRbtcDialog" width="350"
              overlay-opacity="0.8" overlay-color="#000">
      <v-card class="modal-convert-btn container" color="#013E2F">
        <v-row class="mx-0 pt-5 mb-3 d-flex justify-center">
          <h1 class="text-center">
            {{ $t('app.popup.title1') }}
          </h1>
        </v-row>
        <v-row class="mx-0 my-5 d-flex justify-center">
          <p class="text-center ma-0">
             {{ $t('app.popup.description1') }}
          </p>
        </v-row>
        <v-row class="mx-0 mt-8 mb-6 d-flex justify-center">
          <v-img height="60" alt="BTN icon" contain
                 src="@/assets/tutorials/btc-to-rbtc/BtcToRbtc.svg"/>
        </v-row>
        <v-row class="ma-0">
          <v-col class="d-flex justify-center">
            <v-btn @click="btcToRbtcDialog = false" width="95%"
                   outlined color="#fff">
              {{ $t('app.popup.button1') }}
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-btn @click="closeAndRedirect"
                   width="95%" color="#4CB163">
              {{ $t('app.popup.button2') }}
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="ma-0 d-flex justify-center">
          <v-checkbox hide-details dark v-model="dontShowWelcomeModal"
            :label="$t('app.popup.description2')" class="mt-0" />
        </v-row>
      </v-card>
    </v-dialog> -->
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
    };
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
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
    async loadMarkets() {
      this.marketAddresses = await this.comptroller.allMarkets;
      let counter = 0;
      await this.marketAddresses.forEach(async (marketAddress) => {
        await Market.isCRbtc(marketAddress)
          .then((isCRbtc) => {
            this.markets.push(isCRbtc ? new CRbtc(marketAddress, this.chainId)
              : new CToken(marketAddress, this.chainId));
            counter += 1;
          });
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
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.loadMarkets();
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
