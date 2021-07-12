<template>
  <v-dialog v-model="dialog" width="414" overlay-opacity="0.6" overlay-color="#000"
  >
    <v-card class="modal-connect-wallet pt-9" v-click-outside="closeDialog">
      <v-icon class="btn-close-dialog" @click="closeDialog">mdi-close</v-icon>
      <v-row class="mb-8 ma-0 d-flex justify-center mt-10">
        <h1 class="h3-sections-heading text-detail">{{ $t('dialog.wallet.title1') }}</h1>
      </v-row>
      <div class="d-flex justify-center mb-3">
          <v-btn text @click="connectWeb3Wallet(constants.WALLET_LIQUALITY)"
            class="btn-wallet d-flex justify-start">
              <img class="ml-5 mr-7" src="@/assets/wallets/liquality.svg" alt="Liquality icon" />
              <div class="b2-secondary text-info">Liquality</div>
          </v-btn>
      </div>
      <div class="d-flex justify-center mb-3">
        <v-btn text @click="connectWeb3Wallet(constants.WALLET_METAMASK)"
          class="btn-wallet d-flex justify-start">
          <img class="ml-5 mr-7" src="@/assets/wallets/metamask.svg" alt="MetaMask icon"/>
            <div class="b2-secondary text-info">Metamask</div>
        </v-btn>
      </div>
      <div class="d-flex justify-center mb-3">
        <v-btn text @click="connectWeb3Wallet(constants.WALLET_CONNECT)"
         class="btn-wallet d-flex justify-start">
          <img class="ml-5 mr-7" src="@/assets/wallets/wallet-connect.svg"
            alt="Wallet connect icon" />
          <span class="b2-secondary">{{ $t('dialog.wallet.button2') }}</span>
        </v-btn>
      </div>
      <div class="d-flex justify-center mb-3">
        <v-btn text @click="connectWeb3Wallet(constants.WALLET_NIFTY)"
               class="btn-wallet d-flex justify-start">
          <img class="ml-5 mr-7" src="@/assets/wallets/nifty.svg"
               alt="Wallet connect icon" />
          <span class="b2-secondary">Nifty</span>
        </v-btn>
      </div>
      <div class="d-flex justify-center mb-3">
        <v-btn tetxt disabled class="btn-wallet d-flex justify-start">
          <img class="ml-5 mr-7" src="@/assets/wallets/ledger.svg" alt="Ledger icon" />
          <span class="b2-secondary disabled">Ledger</span>
          <span class="b2-secondary disabled">{{ $t('dialog.wallet.button1') }}</span>
        </v-btn>
      </div>

      <div class="d-flex justify-center mb-7">
        <v-btn tetxt disabled class="btn-wallet d-flex justify-start">
          <img class="ml-5 mr-7" src="@/assets/wallets/trezor.svg" alt="Ledger icon" />
          <span class="b2-secondary disabled">Trezor</span>
          <span class="b2-secondary disabled">{{ $t('dialog.wallet.button1') }}</span>
        </v-btn>
      </div>
      <div class="ma-0 d-flex justify-center">
        <p class="p1-descriptions text-center mr-1 text-detail">
          {{ $t('dialog.wallet.description1') }}
          <a class="p1-descriptions text-detail ml-1" href="https://liquality.io/" target="_blank" rel="noopener">
            {{ $t('dialog.wallet.description2') }}
          </a>
        </p>
      </div>
    </v-card>
  </v-dialog>
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
