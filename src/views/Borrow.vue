<template>
  <div class="secondary-color borrow-deposit-view" style="flex: 1;">
    <div class="d-flex flex-column align-center">
      <h2 class="h2-heading mb-7 text-primary">
        Pide prestado y multiplica tus ganancias

      </h2>
      <p class="p1-descriptions text-info text-center">
        Si no tienes depositos, realiza un depósito en cualquiera de nuestros mercados. <br/>
        Si quieres pedir prestado, pero no sabes cuánto tendrás que pagar usa nuestro
        simulador de pago de interés.
      </p>
    </div>
    <div class="d-flex justify-center actions-bottons">
      <v-btn
        class="btn btn-secondary mr-9"
        text
      >
        <span class="b1-main">
          Simular pago de interés
        </span>
      </v-btn>
      <v-btn
        class="btn btn-primary"
        text
      >
        <span class="b1-main white--text">
          Depositar
        </span>
      </v-btn>
    </div>

    <v-row>
      <p class="h3-sections-heading text-info">
        Criptos que puedes pedir prestadas
      </p>
    </v-row>

    <landing :inBorrowMenu="inBorrowMenu" :key="key" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Landing from '@/components/home/Landing.vue';
// import UserHome from '@/components/home/UserHome.vue';
import * as constants from '@/store/constants';

export default {
  name: 'Borrow',
  data() {
    return {
      inBorrowMenu: true,
      key: 0,
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: constants.SESSION_IS_CONNECTED,
    }),
    // currentComponent() {
    //   return this.isLoggedIn ? 'UserHome' : 'Landing';
    // },
  },
  components: {
    Landing,
    // UserHome
  },
  created() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        this.key += 1;
      });
      window.ethereum.on('chainChanged', () => {
        this.key += 1;
      });
    }
  },
};
</script>
