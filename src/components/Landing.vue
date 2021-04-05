<template>
  <div class="landing container">
    <v-row class="my-5 d-flex justify-center">
      <h1 class="text-center">Saca rendimiento de tus Bitcoins</h1>
    </v-row>
    <v-row class="d-flex justify-center">
      <v-col cols="6" class="button d-flex justify-end">
        <v-btn depressed color="rgba(1, 62, 47, 1)" @click="inBorrowMenu = false"
               :class="{'menu-selected': !inBorrowMenu}">
          Ahorrar
        </v-btn>
      </v-col>
      <v-col cols="6" class="button d-flex justify-start">
        <v-btn depressed color="rgba(1, 62, 47, 1)" @click="inBorrowMenu = true"
               :class="{'menu-selected': inBorrowMenu}">
          Pedir prestado
        </v-btn>
      </v-col>
    </v-row>
    <v-container class="mt-8">
      <v-row class="mx-0 pl-3">
        <v-card class="crop-card">
          <v-card-title class="pa-0">
            <v-img class="px-2" src="@/assets/logo.png" height="23" contain/>
            <h1 class="text-left">Mercados de cryptos</h1>
          </v-card-title>
        </v-card>
      </v-row>
      <template v-if="marketsLoaded">
        <v-row class="mx-0 mt-4">
          <v-col cols="4" v-for="(market, idx) in markets"
                 :key="`market-${idx}`">
            <template v-if="isLoggedIn">
              <general-info :inBorrowMenu="inBorrowMenu" :marketAddress="market" />
            </template>
            <template v-else>
              <debt-savings :inBorrowMenu="inBorrowMenu" :marketAddress="market" />
            </template>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row class="mx-0 mt-4">
          <v-col cols="4" v-for="index in 6" :key="index">
            <v-skeleton-loader type="image" height="158" />
          </v-col>
        </v-row>
      </template>
    </v-container>
    <v-dialog v-model="showModalConvertBtn" width="350">
      <v-card class="modal-convert-btn d-flex justify-center align-center flex-column"
              v-click-outside="outsideConvertBtn">
        <h1 class="mt-8 mb-2">Convierte de BTC a RBTC</h1>
        <p class="mb-8">
          Ten en cuenta que las comisones para realizar cualquier transacción deben ser pagadas en
          RBTC, por lo tanto debes convertir tus BTC a RBTC para poder usar Tropyco.
        </p>
        <v-img height="180" alt="BTN icon" contain
               src="@/assets/tutorials/btc-to-rbtc/BtcToRbtc.svg"/>
        <div>
          <v-btn @click="outsideConvertBtn" width="100"
                 color="rgba(0,0,0,0.0)" class="ma-2 my-8 button-continue">
            Continuar
          </v-btn>
          <v-btn @click="redirectToTutorials" width="160" color="#4CB163" class="ma-2 my-8">
            Conviertir BTC a RBTC
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { Unitroller, Comptroller } from '@/middleware';
import GeneralInfo from '@/components/market/GeneralInfo.vue';
import DebtSavings from '@/components/market/DebtSavings.vue';

export default {
  name: 'Landing',
  data() {
    return {
      inBorrowMenu: false,
      showModalConvertBtn: true,
      markets: [],
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
      unitrollerAddress: (state) => state.Contracts.unitrollerAddress,
    }),
    isLoggedIn() {
      console.log(!!this.account);
      return !!this.account;
    },
    marketsLoaded() {
      return this.markets.length > 0;
    },
  },
  watch: {
    async unitrollerAddress(val) {
      if (val) {
        const unitroller = new Unitroller(this.unitrollerAddress);
        const comptroller = new Comptroller(await unitroller.comptrollerImplementation);
        this.markets = await comptroller.allMarkets;
      }
    },
  },
  methods: {
    redirectToTutorials() {
      this.$router.push('/tutorials/btc-to-rbtc');
    },
    outsideConvertBtn() {
      this.showModalConvertBtn = false;
    },
    onBorrow() {
      this.hidden = false;
    },
    onSaving() {
      this.hidden = true;
    },
  },
  components: {
    GeneralInfo,
    DebtSavings,
  },
};
</script>
