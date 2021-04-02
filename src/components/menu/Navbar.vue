<template>
  <v-app-bar class="navbar" color="rgba(1, 62, 47, 0.85)" flat height="70" absolute>
    <v-img height="48" position="left center" src="@/assets/titulo.png"
           @click="redirectToHome" contain/>
    <router-link class="mx-10" :to="{ name: 'Home' }">
      Inicio
    </router-link>
    <router-link class="mx-10" :to="{ name: 'Balance' }">
      Mi Balance
    </router-link>
    <v-btn @click="ShowDialogConnectWallet" class="wallet-button" width="230"
           v-bind:class="{'wallet-button-connected': isWalletConnected}">
      {{ accountCutOff }}
    </v-btn>
    <template v-if="showModalConnectWallet">
      <connect-wallet :showModalConnectWallet="showModalConnectWallet"
                            @closed="outsideConnectWallet"/>
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
      account: (state) => state.Session.account,
      wallet: (state) => state.Session.wallet,
    }),
    accountCutOff() {
      return typeof this.account === 'string' ? `${this.account.substring(0, 7)}...${this.account
        .substring(this.account.length - 4, this.account.length)}` : 'Conectar billetera';
    },
    isWalletConnected() {
      return !!this.wallet;
    },
  },
  methods: {
    redirectToBalance() {
      this.$router.push('/balance');
    },
    redirectToHome() {
      this.$router.push('/');
    },
    redirectToTutorials() {
      this.$router.push('/Tutorials/rbtc-to-btc');
    },
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
