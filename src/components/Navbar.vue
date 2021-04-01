<template>
  <div class="navbar">
    <v-row>
      <v-col cols="6">
        <a href="/">
        <img width="250" class="mt-4 ml-5" src="../assets/titulo.png"/>
        </a>
      </v-col>
      <v-col cols="6" class="mt-2 d-flex align-center justify-space-around">
        <v-btn depressed color="transparent" @click="redirectToHome">Inicio</v-btn>
        <v-btn depressed color="transparent" @click="redirectToTutorials">Tutorial</v-btn>
        <v-btn depressed color="transparent" @click="redirectToBalance">Mi balance</v-btn>
        <v-btn depressed color="transparent">Sobre Tropyco</v-btn>
        <v-btn
          @click="ShowDialogConnectWallet"
          depressed
          color="#4CB163"
          class="ma-auto mx-6 navbar-button"
          width="230"
        >
          {{ accountCutOff }}
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
import { mapState } from 'vuex';
import ModalConnectWallet from './ModalConnectWallet.vue';

export default {
  name: 'Navbar',
  props: {
    msg: String,
  },
  components: {
    ModalConnectWallet,
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
    }),
    accountCutOff() {
      return typeof this.account === 'string' ? `${this.account.substring(0, 7)}...${this.account
        .substring(this.account.length - 4, this.account.length)}` : 'Conectar billetera';
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
