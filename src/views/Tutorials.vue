/* eslint-disable linebreak-style */
<template>
  <div class="tutorials">
    <Navbar />
    <div class="landing">
      <h1>* Cómo convertir mis BTC a rBTC</h1>

      <v-row v-for="elements in this.groupedElements" :key="elements.id">
        <v-col v-for="element in elements" :key="element.id" cols="12" md="4">
          <div class="circle">
            <h3>{{ element.number }}.</h3>
          </div>
          <div>
            <p>{{ element.title }}</p>
          </div>
          <img :src="element.image" alt="Tutorial step" />
        </v-col>
      </v-row>
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
          image: '/img/tutorials/liquality-tutorial/step01.svg',
        },
        {
          number: 2,
          title: 'Selecciona la red de Bitcoin',
          image: '/img/tutorials/liquality-tutorial/step02.svg',
        },
        {
          number: 3,
          title: 'Transfiere tus fondos a tu billetera Liquality',
          image: '/img/tutorials/liquality-tutorial/step03.svg',
        },
        {
          number: 4,
          title: 'Copia la dirección de destino para recibir tus Bitcoins      ',
          image: '/img/tutorials/liquality-tutorial/step04.svg',
        },
        {
          number: 5,
          title: 'Presiona la opción de “swap”',
          image: '/img/tutorials/liquality-tutorial/step05.svg',
        },
        {
          number: 6,
          title: 'Convierte BTC a RBTC',
          image: '/img/tutorials/liquality-tutorial/step06.svg',
        },
        {
          number: 7,
          title: 'Confirma la transacción',
          image: '/img/tutorials/liquality-tutorial/step07.svg',
        },
        {
          number: 8,
          title: 'Recibe tus BTC y ahorra en Tropyco',
          image: '/img/tutorials/liquality-tutorial/step08.svg',
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
<style>
.circle {
  width: 50px;
  height: 50px;
  line-height: 50px;
  border-radius: 50%;
  font-size: 1em;
  color: #fff;
  text-align: center;
  background: #0083ff;
}

.inline {
  display: inline;
}
</style>
