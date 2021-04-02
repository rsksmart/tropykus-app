/* eslint-disable linebreak-style */
<template>
  <div class="tutorials">
    <div>
      <div class="tutorial-navbar">
        <Navbar />
      </div>
    </div>

    <v-container class="tutorial-container">
      <div class="d-flex align-center">
        <router-link to="/home">
          <img class="tutorial-left-arrow" src="@/assets/left-arrow.svg" alt="Left arrow" />
        </router-link>
        <h1>
          Transfiere tus BTC desde
        </h1>
        <img src="@/assets/blockfi-logo.svg" alt="Binance Logo" />
      </div>

      <v-row class="tutorial-steps" v-for="elements in this.groupedElements" :key="elements.id">
        <v-col
          v-for="element in elements"
          :key="element.id"
          cols="12"
          :md="element.number === 5 ? 8 : 4"
        >
          <div class="d-flex align-center tutorial-step-title justify-sm-center justify-md-start">
            <div class="tutorial-step-number flex-shrink-0 d-flex align-center justify-center">
              <h2>{{ element.number }}.</h2>
            </div>
            <div class="d-flex align-center">
              <h2 class="tutorial-step-description">{{ element.title }}</h2>
            </div>
          </div>

          <v-img
            :max-width="element.number === 5 ? '80%' : '307px'"
            :src="element.image"
            alt="Tutorial step"
            class="mx-auto tutorial-step-image"
          />
        </v-col>
      </v-row>
    </v-container>

    <div class="frog-container">
      <img src="@/assets/frog.svg" alt="" class="tutorial-frog" />
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/menu/Navbar.vue';

import _ from 'lodash';

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      steps: [
        {
          number: 1,
          title: 'Instala liquality en tu navegador',
          image: '/img/tutorials/blockfi-to-liquality/step01.png',
        },
        {
          number: 2,
          title: 'Inicia sesión en Poloniex con tu cuenta',
          image: '/img/tutorials/blockfi-to-liquality/step02.png',
        },
        {
          number: 3,
          title:
            'Ve al menú “Balances” en la esquina superior derecha y selecciona la opción “Deposits & Withdrawals”.',
          image: '/img/tutorials/blockfi-to-liquality/step03.png',
        },
        {
          number: 4,
          title:
            'Selecciona la opción de “Hide 0 Balances” y luego da click en la opción “Withdraw”.',
          image: '/img/tutorials/blockfi-to-liquality/step04.png',
        },
        {
          number: 5,
          title:
            'Digita la cantidad de BTC que quieres retira y la dirección de liquality a la cual quieres enviar los fondos. Luego presiona “Withdraw” y listo, ya puedes ahorrar y pedir prestado en Tropyco.',
          image: '/img/tutorials/blockfi-to-liquality/step05.png',
        },
      ],
    };
  },
  computed: {
    groupedElements() {
      return _.chunk(this.steps, 3);
    },
  },
};
</script>
<style scoped>
.tutorial-step-number {
  background-color: #ff9153;
}

.tutorial-step-title {
  height: 90px;
}

@media screen and (max-width: 1365px) {
  .tutorial-step-title {
    height: 150px;
  }
}

@media screen and (max-width: 768px) {
  .tutorial-step-title {
    height: 210px;
  }
}
</style>

<style>
body {
  background-color: #013e2f !important;
}
</style>
