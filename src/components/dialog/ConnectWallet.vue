<template>
  <div>
    <v-dialog v-model="dialog" width="500" overlay-opacity="0.8" overlay-color="#000">
      <v-card class="modal-connect-wallet container" v-click-outside="closeDialog">
        <v-row class="ma-0 mb-8 d-flex justify-center">
          <h1 class="h3-sections-heading text-center">Conecta tu billetera</h1>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="6" class="pa-0">
            <v-btn @click="connectWeb3Wallet(constants.WALLET_LIQUALITY)" class="mx-0">
              <div class="d-flex align-center flex-column">
                <v-img height="40" width="40" src="@/assets/wallets/liquality.svg"
                       alt="Liquality icon" contain position="center center" />
                <span class="b2-secondary">Liquality</span>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="6" class="pa-0 pl-3">
            <v-btn @click="connectWeb3Wallet(constants.WALLET_METAMASK)" class="mx-0">
              <div class="d-flex align-center flex-column">
                <v-img height="40" width="40" src="@/assets/wallets/metamask.svg"
                       alt="MetaMask icon" contain position="center center" />
                <span class="b2-secondary">Metamask</span>
              </div>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="mb-8 d-flex justify-space-between">
          <v-col cols="4" class="pa-0 d-flex justify-start">
            <v-btn disabled class="mx-0" width="120">
              <div class="d-flex align-center flex-column">
                <v-img height="40" width="40" src="@/assets/wallets/ledger.svg"
                       alt="Ledger icon" contain position="center center" />
                <span class="b2-secondary disabled">Ledger</span>
                <span class="b2-secondary disabled">(Pronto)</span>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="4" class="pa-0 d-flex justify-center">
            <v-btn disabled class="mx-0" width="120">
              <div class="d-flex align-center flex-column">
                <v-img height="40" width="40" src="@/assets/wallets/trezor.svg"
                       alt="Trezor icon" contain position="center center"  />
                <span class="b2-secondary disabled">Trezor</span>
                <span class="b2-secondary disabled">(Pronto)</span>
              </div>
            </v-btn>
          </v-col>
          <v-col cols="4" class="pa-0 d-flex justify-end">
            <v-btn  class="mx-0" @click="connectWeb3Wallet(constants.WALLET_CONNECT)"  width="120">
              <div class="d-flex align-center flex-column">
                <v-img height="40" width="40" src="@/assets/wallets/wallet-connect.svg"
                       alt="Wallet connect icon" contain position="center center" />
                <span class="b2-secondary">Billetera móvil</span>
              </div>
            </v-btn>
          </v-col>
        </v-row>
        <v-row class="ma-0 d-flex justify-center">
          <p class="p1-descriptions text-center mr-1">
            ¿No tienes billetera?
            <a class="p1-descriptions" href="https://liquality.io/" target="_blank" rel="noopener">
              Descargala
            </a>
          </p>
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
