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
            <img class="tutorial-left-arrow" src="@/assets/left-arrow.svg" alt="Left arrow" />
          </router-link>
        </span>
        Transfiere tus BTC desde
        <span><img src="@/assets/ledn-logo.svg" alt="Ledn Logo"/></span>
      </h1>

      <v-row class="tutorial-steps" v-for="elements in this.groupedElements" :key="elements.id">
        <v-col v-for="element in elements" :key="element.id" cols="12" md="6">
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
          image: '/img/tutorials/ledn-to-liquality/step01.png',
        },
        {
          number: 2,
          title: 'Inicia sesión en ledn con tu cuenta',
          image: '/img/tutorials/ledn-to-liquality/step02.png',
        },
        {
          number: 3,
          title:
            'Presiona la opción de “Wallet” ubicada en la esquina superior derecha y selecciona la opción “Fiat and spot”',
          image: '/img/tutorials/ledn-to-liquality/step03.png',
        },
        {
          number: 4,
          title: 'Busca la opción de “Withdraw” que aparece en el lado derecho del menú  “Bitcoin”',
          image: '/img/tutorials/ledn-to-liquality/step04.png',
        },
      ],
    };
  },
  computed: {
    groupedElements() {
      return _.chunk(this.steps, 2);
    },
  },
};
</script>
<style scoped>
.tutorial-step-number {
  background-color: #4696a6;
}
</style>

<style>
body {
  background-color: #013e2f !important;
}
</style>
