n/* eslint-disable linebreak-style */
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
        <img src="@/assets/binance-logo.svg" alt="Binance Logo" />
      </div>

      <v-row class="tutorial-steps" v-for="elements in this.groupedElements" :key="elements.id">
        <v-col
          v-for="element in elements"
          :key="element.id"
          cols="12"
          :md="element.number === 4 ? 8 : 4"
        >
          <div class="d-flex align-center tutorial-step-title justify-sm-center justify-md-start">
            <div class="tutorial-step-number flex-shrink-0 d-flex align-center justify-center">
              <h2>{{ element.number }}.</h2>
            </div>
            <div class="d-flex align-center">
              <h2 class="tutorial-step-description">{{ element.title }}</h2>
            </div>
          </div>

          <v-img :src="element.image" alt="Tutorial step" class="mx-auto tutorial-step-image" />
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
          image: '/img/tutorials/binance-to-liquality/step01.png',
        },
        {
          number: 2,
          title: 'Inicia sesión en Binance con tu cuenta',
          image: '/img/tutorials/binance-to-liquality/step02.png',
        },
        {
          number: 3,
          title:
            'Presiona la opción de “Wallet” ubicada en la esquina superior derecha y selecciona la opción “Fiat and spot”',
          image: '/img/tutorials/binance-to-liquality/step03.png',
        },
        {
          number: 4,
          title: 'Busca la opción de “Withdraw” que aparece en el lado derecho del menú  “Bitcoin”',
          image: '/img/tutorials/binance-to-liquality/step04.png',
        },
        {
          number: 5,
          title:
            'Selecciona la red Bitcoin y copia y pega tu dirección de Bitcoin de tu billetera Liquality.',
          image: '/img/tutorials/binance-to-liquality/step05.png',
        },
        {
          number: 6,
          title: 'Escribe el monto de BTC que quieres retirar y presiona el botón “Submit”.',
          image: '/img/tutorials/binance-to-liquality/step06.png',
        },
        {
          number: 7,
          title: 'Escribe el monto de BTC que quieres retirar y presiona el botón “Submit”.',
          image: '/img/tutorials/binance-to-liquality/step07.png',
        },
      ],
    };
  },
  computed: {
    groupedElements() {
      return [
        [this.steps[0], this.steps[1], this.steps[2]],
        [this.steps[3], this.steps[4]],
        [this.steps[5], this.steps[6]],
      ];
    },
  },
};
</script>
<style scoped>
.tutorial-step-number {
  background-color: #ff9153;
}

.tutorial-step-description {
  line-height: 28px;
}

@media screen and (max-width: 1365px) {
  .tutorial-step-title {
    height: 224px;
  }
}
@media screen and (min-width: 1366px) {
  .tutorial-step-title {
    height: 122px;
  }
}
</style>

<style>
body {
  background-color: #013e2f !important;
}
</style>
