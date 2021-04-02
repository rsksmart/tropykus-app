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
        <img src="@/assets/ledn-logo.svg" alt="Ledn Logo" />
      </div>

      <v-row class="tutorial-steps" v-for="elements in this.groupedElements" :key="elements.id">
        <v-col v-for="element in elements" :key="element.id" cols="12" md="6">
          <div class="d-flex align-center tutorial-step-title justify-sm-center justify-md-start">
            <div class="tutorial-step-number flex-shrink-0 d-flex align-center justify-center">
              <h2>{{ element.number }}.</h2>
            </div>
            <div class="d-flex align-center">
              <h2 class="tutorial-step-description">{{ element.title }}</h2>
            </div>
          </div>

          <v-img
            :src="element.image"
            alt="Tutorial step"
            class="mx-auto tutorial-step-image"
            :max-width="element.number === 1 ? '307px' : '80%'"
          />
        </v-col>
      </v-row>
    </v-container>

    <div class="frog-container" style="position: relative">
      <img src="@/assets/frog.svg" alt="" class="tutorial-frog" />
    </div>
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

.tutorial-step-title {
  height: 90px;
}

@media screen and (max-width: 1365px) {
  .tutorial-step-title {
    height: 150px;
  }
}
</style>

<style>
body {
  background-color: #013e2f !important;
}
</style>
