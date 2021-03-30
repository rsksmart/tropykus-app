/* eslint-disable linebreak-style */
<template>
  <div class="tutorials">
    <div>
      <div class="tutorial-navbar">
        <Navbar />
      </div>
    </div>

    <v-container class="landing tutorial-container">
      <h1>
        <span>
          <router-link to="/Tutorials">
            <img class="tutorial-left-arrow" src="@/assets/left-arrow.svg" alt="" />
          </router-link>
        </span>
        Cómo convertir mis BTC a rBTC
      </h1>

      <v-row class="tutorial-steps" v-for="elements in this.groupedElements" :key="elements.id">
        <v-col v-for="element in elements" :key="element.id" cols="12" md="4">
          <h3 class="tutorial-step-title">
            <span class="tutorial-step-number">{{ element.number }}</span>
            <p class="tutorial-step-description">{{ element.title }}</p>
          </h3>
          <v-img
            :src="element.image"
            alt="Tutorial step"
            max-width="310px"
            class="mx-auto tutorial-step-image"
          />
        </v-col>
      </v-row>
      <img src="@/assets/frog.svg" alt="" class="tutorial-frog" />
    </v-container>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

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
          image: '/img/tutorials/rbtc-to-btc/step01.png',
        },
        {
          number: 2,
          title: 'Selecciona la red de Bitcoin',
          image: '/img/tutorials/rbtc-to-btc/step02.png',
        },
        {
          number: 3,
          title: 'Transfiere tus fondos a tu billetera Liquality',
          image: '/img/tutorials/rbtc-to-btc/step03.png',
        },
        {
          number: 4,
          title: 'Copia la dirección de destino para recibir tus Bitcoins      ',
          image: '/img/tutorials/rbtc-to-btc/step04.png',
        },
        {
          number: 5,
          title: 'Presiona la opción de “swap”',
          image: '/img/tutorials/rbtc-to-btc/step05.png',
        },
        {
          number: 6,
          title: 'Convierte BTC a RBTC',
          image: '/img/tutorials/rbtc-to-btc/step06.png',
        },
        {
          number: 7,
          title: 'Confirma la transacción',
          image: '/img/tutorials/rbtc-to-btc/step07.png',
        },
        {
          number: 8,
          title: 'Recibe tus BTC y ahorra en Tropyco',
          image: '/img/tutorials/rbtc-to-btc/step08.png',
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
  background-color: #0083ff;
}
</style>

<style>
body {
  background-color: #013e2f !important;
}
</style>
