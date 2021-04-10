<template>
  <div class="container">
    <v-container class="mt-8">
      <v-row class="mx-0 pl-3">
        <v-card class="crop-card">
          <v-card-title class="pa-0">
            <v-img class="px-2" src="@/assets/icon-dollar.png" height="23" contain/>
            <h1 class="text-left">Mercados de cryptos</h1>
          </v-card-title>
        </v-card>
      </v-row>
      <template v-if="marketsLoaded">
        <v-row class="mx-0 mt-4">
          <v-col cols="4" v-for="(market, idx) in markets"
                 :key="`market-${idx}`">
            <general-info :inBorrowMenu="inBorrowMenu" :marketAddress="market"/>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row class="mx-0 mt-4">
          <v-col cols="4" v-for="index in 3" :key="index">
            <v-skeleton-loader type="image" height="158"/>
          </v-col>
        </v-row>
      </template>
    </v-container>
    <v-dialog v-model="showModalConvertBtn" width="350"
              overlay-opacity="0.8" overlay-color="#000">
      <v-card class="modal-convert-btn container" color="#013E2F"
              v-click-outside="outsideConvertBtn">
        <v-row class="mx-0 pt-5 mb-3 d-flex justify-center">
          <h1 class="text-center">
            Convierte de BTC a RBTC
          </h1>
        </v-row>
        <v-row class="mx-0 my-5 d-flex justify-center">
          <p class="text-center ma-0">
            Ten en cuenta que las comisones para realizar cualquier transacción deben ser pagadas en
            RBTC, por lo tanto debes convertir tus BTC a RBTC para poder usar Tropyco.
          </p>
        </v-row>
        <v-row class="mx-0 mt-8 mb-6 d-flex justify-center">
          <v-img height="60" alt="BTN icon" contain
                 src="@/assets/tutorials/btc-to-rbtc/BtcToRbtc.svg"/>
        </v-row>
        <v-row class="ma-0">
          <v-col class="d-flex justify-center">
            <v-btn @click="outsideConvertBtn" width="95%"
                   outlined color="#fff">
              Continuar
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-btn @click="$router.push({ name: 'BtcToRbtc' })"
                   width="95%" color="#4CB163">
              Conviertir BTC a RBTC
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
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
      showModalConvertBtn: true,
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
    outsideConvertBtn() {
      this.showModalConvertBtn = false;
    },
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
