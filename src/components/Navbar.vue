<template>
  <div class="navbar">
    <v-row>
      <v-col cols="6">
        <a href="/">
        <img width="250" class="mt-6 ml-5" src="../assets/titulo.png"/>
        </a>
        <!-- <div class="navbar-title mt-2 ml-10">Tropyco</div> -->
      </v-col>
      <v-col cols="6" class="mt-2 d-flex justify-space-around">
        <button>Inicio</button>
        <button>Tutorial</button>
        <!-- <button class="navbar-balance">Mi balance</button> -->
        <button>Sobre Tropyco</button>
        <v-btn
          @click="ShowDialogConnectWallet"
          depressed
          color="#4CB163"
          class="ma-auto mx-6 navbar-button"
          width="230"
        >
          Conectar billetera
        </v-btn>
         <template v-if="showModalConnectWallet">
            <modal-connect-wallet
              :showModalConnectWallet="showModalConnectWallet"
              @closed="outsideConnectWallet"
            />
          </template>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import ModalConnectWallet from './ModalConnectWallet.vue';

export default {
  name: 'Navbar',
  props: {
    msg: String,
  },
  components: {
    ModalConnectWallet,
  },
  methods: {
    outsideConnectWallet() {
      this.showModalConnectWallet = false;
    },
    ShowDialogConnectWallet() {
      this.showModalConnectWallet = true;
    },
  },
  data() {
    return {
      showModalConnectWallet: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="../styles/main.scss">
</style>
