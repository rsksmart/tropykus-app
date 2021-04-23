<template>
  <v-app-bar color="transparent" flat height="70" absolute
             v-bind:class="{ 'tutorial-navbar': isTutorial }" class="navbar">
    <router-link :to="{ name: 'Supply' }">
      <v-img height="48" width="372" position="left center" src="@/assets/tropykus.svg" contain />
    </router-link>
    <v-spacer />
    <v-btn @click="ShowDialogConnectWallet" class="wallet-button" width="230"
           :class="{'wallet-button-connected': isWalletConnected}">
      {{ accountCutOff }}
    </v-btn>
    <template v-if="showModalConnectWallet">
      <connect-wallet
        :showModal="showModalConnectWallet"
        @closed="outsideConnectWallet"
      />
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import ConnectWallet from '@/components/dialog/ConnectWallet.vue';

export default {
  name: 'Navbar',
  props: {
    msg: String,
  },
  data() {
    return {
      showModalConnectWallet: false,
    };
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
      wallet: (state) => state.Session.wallet,
      routePath: (state) => state.route.path,
    }),
    accountCutOff() {
      return typeof this.walletAddress === 'string'
        ? `${this.walletAddress.substr(0, 7)}...${this.walletAddress.substr(-4)}`
        : 'Conectar billetera';
    },
    isWalletConnected() {
      return !!this.wallet;
    },
    isTutorial() {
      return this.routePath.substr(1, 10) === 'tutorials/';
    },
  },
  methods: {
    outsideConnectWallet() {
      this.showModalConnectWallet = false;
    },
    ShowDialogConnectWallet() {
      if (!this.isWalletConnected) this.showModalConnectWallet = true;
    },
  },
  components: {
    ConnectWallet,
  },
};
</script>
