<template>
  <div class="tutorials tutorial-background">
    <v-container class="tutorial-container">
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Tutorials' }" class="mr-3">
          <v-img height="28" src="@/assets/left-arrow.svg" alt="Left arrow" contain/>
        </router-link>
        <h1>
          Cómo convertir mis BTC a rBTC
        </h1>
      </div>

      <v-row class="tutorial-steps" v-for="elements in this.groupedElements" :key="elements.id">
        <v-col v-for="element in elements" :key="element.id" cols="12" md="4">
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
              max-width="310px"
              class="mx-auto tutorial-step-image"
          />
        </v-col>
      </v-row>
    </v-container>

    <div class="frog-container" style="position: relative">
      <img src="@/assets/frog.svg" alt="" class="tutorial-frog"/>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Step01 from '@/assets/tutorials/btc-to-rbtc/step01.png';
import Step02 from '@/assets/tutorials/btc-to-rbtc/step02.png';
import Step03 from '@/assets/tutorials/btc-to-rbtc/step03.png';
import Step04 from '@/assets/tutorials/btc-to-rbtc/step04.png';
import Step05 from '@/assets/tutorials/btc-to-rbtc/step05.png';
import Step06 from '@/assets/tutorials/btc-to-rbtc/step06.png';
import Step07 from '@/assets/tutorials/btc-to-rbtc/step07.png';
import Step08 from '@/assets/tutorials/btc-to-rbtc/step08.png';

export default {
  data() {
    return {
      steps: [
        {
          number: 1,
          title: 'Instala liquality en tu navegador',
          image: Step01,
        },
        {
          number: 2,
          title: 'Selecciona la red de Bitcoin',
          image: Step02,
        },
        {
          number: 3,
          title: 'Transfiere tus fondos a tu billetera Liquality',
          image: Step03,
        },
        {
          number: 4,
          title: 'Copia la dirección de destino para recibir tus Bitcoins      ',
          image: Step04,
        },
        {
          number: 5,
          title: 'Presiona la opción de “swap”',
          image: Step05,
        },
        {
          number: 6,
          title: 'Convierte BTC a RBTC',
          image: Step06,
        },
        {
          number: 7,
          title: 'Confirma la transacción',
          image: Step07,
        },
        {
          number: 8,
          title: 'Recibe tus BTC y ahorra en Tropyco',
          image: Step08,
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

.tutorial-step-title {
  height: 60px;
}

@media screen and (max-width: 1365px) {
  .tutorial-step-title {
    height: 90px;
  }
}
</style>
