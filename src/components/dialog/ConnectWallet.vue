<template>
  <div>
    <v-dialog v-model="dialog" width="350" overlay-opacity="0.8" overlay-color="#000">
      <v-card class="modal-connect-wallet container" v-click-outside="closeDialog">
        <v-row class="ma-0 mt-4 mb-2 d-flex justify-center">
          <h1 class="text-center">Conecta tu billetera</h1>
        </v-row>
        <v-row class="mx-4  d-flex justify-center">
          <v-col cols="6" class="pa-0">
            <v-btn @click="connectWeb3Wallet(constants.WALLET_LIQUALITY)" class="mx-0">
              <div class="d-flex align-center flex-column">
                <v-img height="40" width="40" src="@/assets/wallets/liquality.svg"
                       alt="Liquality icon" contain position="center center" />
                <p>Liquality</p>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="6" class="pa-0 pl-3">
            <v-btn @click="connectWeb3Wallet(constants.WALLET_METAMASK)" class="mx-0">
              <div class="d-flex align-center flex-column">
                <v-img height="40" width="40" src="@/assets/wallets/metamask.svg"
                       alt="MetaMask icon" contain position="center center" />
                <p>Metamask</p>
              </div>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mx-4 mb-4">
          <v-col cols="4" class="pa-0">
            <v-btn disabled class="mx-0">
              <div class="d-flex align-center flex-column">
                <v-img height="40" width="40" src="@/assets/wallets/ledger.svg"
                       alt="Ledger icon" contain position="center center" />
                <p>Ledger</p>
                <p class="subtitle">(Pronto)</p>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="4" class="py-0">
            <v-btn disabled class="mx-0">
              <div class="d-flex align-center flex-column">
                <v-img height="40" width="40" src="@/assets/wallets/trezor.svg"
                       alt="Trezor icon" contain position="center center"  />
                <p>Trezor</p>
                <p class="subtitle">(Pronto)</p>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="4" class="pa-0">
            <v-btn disabled class="mx-0">
              <div class="d-flex align-center flex-column">
                <v-img height="40" width="40" src="@/assets/wallets/wallet-connect.svg"
                       alt="Trezor icon" contain position="center center" />
                <p>Billetera móvil</p>
                <p class="subtitle">(Pronto)</p>
              </div>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="ma-0 mb-3 d-flex justify-center">
          <h3 class="text-center mr-1">
            ¿No tienes billetera?
            <a href="https://liquality.io/" target="_blank" rel="noopener">
              Descargala
            </a>
          </h3>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as constants from '@/store/constants';
import { mapActions } from 'vuex';

export default {
  name: 'ConnectWallet',
  data() {
    return {
      constants,
      dialog: this.showModal,
    };
  },
  props: {
    showModal: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    ...mapActions({
      connectToWeb3: constants.SESSION_CONNECT_WEB3,
    }),
    connectWeb3Wallet(walletType) {
      this.connectToWeb3(walletType);
      this.closeDialog();
    },
    closeDialog() {
      this.dialog = false;
      this.$emit('closed');
    },
  },
};
</script>
