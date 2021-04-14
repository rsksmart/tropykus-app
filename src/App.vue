<template>
  <v-app class="app">
    <navbar/>
    <left-bar />
    <router-view/>
    <v-dialog v-model="btcToRbtcDialog" width="350"
              overlay-opacity="0.8" overlay-color="#000">
      <v-card class="modal-convert-btn container" color="#013E2F">
        <v-row class="mx-0 pt-5 mb-3 d-flex justify-center">
          <h1 class="text-center">
            Convierte de BTC a RBTC
          </h1>
        </v-row>
        <v-row class="mx-0 my-5 d-flex justify-center">
          <p class="text-center ma-0">
            Ten en cuenta que las comisones para realizar cualquier transacción deben ser pagadas en
            RBTC, por lo tanto debes convertir tus BTC a RBTC para poder usar Tropykus.
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
              Continuar
            </v-btn>
          </v-col>
          <v-col class="d-flex justify-center">
            <v-btn @click="closeAndRedirect"
                   width="95%" color="#4CB163">
              Convertir BTC a RBTC
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from '@/components/menu/Navbar.vue';
import LeftBar from '@/components/menu/LeftBar.vue';

export default {
  name: 'App',
  data() {
    return {
      btcToRbtcDialog: true,
    };
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
    }),
  },
  methods: {
    closeAndRedirect() {
      this.$router.push({ name: 'BtcToRbtc' });
      this.btcToRbtcDialog = false;
    },
  },
  watch: {
    chainId(val) {
      if (val) {
        this.$forceUpdate();
      }
    },
  },
  components: {
    Navbar,
    LeftBar,
  },
};
</script>
