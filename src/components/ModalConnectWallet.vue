<template>
  <div>
    <v-dialog v-model="dialog" width="350">
      <v-card
        class="modal-connect-wallet d-flex justify-center align-center flex-column"
        v-click-outside="outsideConnectWallet"
      >
        <v-row class="ma-0" width="100%">
          <h1 class="mt-6 mb-4">Conecta tu billetera</h1>
        </v-row>
        <v-row class="ma-0 first-row">
          <v-col cols="4" class="pa-0">
            <v-btn disabled>
              <div class="d-flex align-center flex-column">
                <img width="30" class="mt-4" src="../assets/ledger-icon.png" alt="Ledger icon" />
                <p>Ledger</p>
                <p class="subtitle">(Pronto)</p>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="4" class="pa-0">
            <v-btn disabled>
              <div class="d-flex align-center flex-column">
                <img width="20" class="mt-4" src="../assets/trezor-icon.png" alt="Trezor icon" />
                <p>Trezor</p>
                <p class="subtitle">(Pronto)</p>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="4" class="pa-0">
            <v-btn @click="redirectToHome" class="button-liquality">
              <div class="d-flex align-center flex-column">
                <img
                  width="40"
                  class="mb-3 mt-2"
                  src="../assets/liquality-icon.png"
                  alt="Trezor icon"
                />
                <p>Liquality</p>
              </div>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="second-row ma-0 mb-4">
          <v-col cols="6" class="pa-0">
            <v-btn disabled>
              <div class="d-flex align-center flex-column">
                <img width="38" src="../assets/metamask-icon.png" alt="Trezor icon" />
                <p>Metamask</p>
                <p class="subtitle">(Pronto)</p>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="6" class="pa-0">
            <v-btn disabled>
              <div class="d-flex align-center flex-column">
                <img width="45" src="../assets/movil-wallet-icon.png" alt="Trezor icon" />
                <p>Billetera móvil</p>
                <p class="subtitle">(Pronto)</p>
              </div>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="ma-0 mb-3">
          <h3 class="footer mr-1">¿No tienes billetera?</h3>
          <h3 class="footer-download">Descargala</h3>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as constants from '@/store/constants';
import { mapActions } from 'vuex';

export default {
  name: 'ModalConnectWallet',
  props: {
    showModalConnectWallet: {
      require: true,
      type: Boolean,
    },
  },
  methods: {
    ...mapActions({
      connectToWeb3: constants.SESSION_CONNECT_WEB3,
    }),
    redirectToHome() {
      this.connectToWeb3();
      this.$router.push('/home');
      this.dialog = false;
    },
    outsideConnectWallet() {
      this.dialog = false;
      this.$emit('closed');
    },
  },
  data() {
    return {
      dialog: this.showModalConnectWallet,
    };
  },
};
</script>
