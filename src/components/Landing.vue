<template>
  <div class="landing">
    <v-row>
      <v-col cols="3" />
      <v-col cols="6" class="d-flex justify-center mt-6">
        <h1>Saca rendimiento de tus Bitcoins</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" />
      <v-col cols="6" class="button d-flex justify-center">
        <v-btn depressed color="rgba(1, 62, 47, 1)" @click="onSaving"
               :class="hidden ? 'button-save mr-4' : 'button-save-click mr-4'">
          Ahorrar
        </v-btn>
        <v-btn depressed color="rgba(1, 62, 47, 1)" @click="onBorrow"
               :class="hidden ? 'button-borrow ml-9' : 'button-borrow-click ml-9'">
          Pedir prestado
        </v-btn>
      </v-col>
    </v-row>
    <v-container>
      <v-row>
        <v-card class="crop-card">
          <v-card-title class="pa-0">
            <v-img class="px-2" src="@/assets/logo.png" height="23" contain/>
            <h1 class="text-left">Mercados de cryptos</h1>
          </v-card-title>
        </v-card>
      </v-row>
      <v-row v-if="markets">
        <v-col cols="4" class="ma-0 mt-4 pa-0" v-for="(market, idx) in markets"
               :key="`market-${idx}`">
          <card :hiddenButton="hidden" :marketAddress="market" />
        </v-col>
      </v-row>
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
import Card from '@/components/market/Card.vue';

export default {
  name: 'Landing',
  data() {
    return {
      showModalConvertBtn: true,
      hidden: true,
      markets: [],
      saving: [
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 2,
          name: 'BTCx',
          rate: 6.02,
          price: 50,
        },
        {
          id: 3,
          name: 'BPRO',
          rate: 7.04,
          price: 400,
        },
        {
          id: 4,
          name: 'BPRO',
          rate: 7.04,
          price: 400,
        },
      ],
      borrow: [
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
      ],
    };
  },
  computed: {
    ...mapState({
      unitrollerAddress: (state) => state.Contracts.unitrollerAddress,
    }),
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
    Card,
  },
};
</script>
