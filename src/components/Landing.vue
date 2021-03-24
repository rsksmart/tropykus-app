<template>
  <div class="landing">
    <v-row>
      <v-col cols="3" />
      <v-col cols="6" class="d-flex justify-center mt-6">
        <h1>Saca rendimiento de tus Bitcoins</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" />
      <v-col cols="6" class="d-flex justify-center mt-4 justify-space-around">
        <button :class="hidden ? 'button-save' : 'button-save-click'" @click="onSaving">
          Ahorrar
        </button>
        <button :class="hidden ? 'button-borrow' : 'button-borrow-click'" @click="onBorrow">
          Pedir prestado
        </button>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" />
      <v-col cols="2" class="pa-0 mt-6 mr-16 ml-3 d-flex align-center landing-subtitle">
        <img src="@/assets/logo.png" class="landing-img" width="23" />
        <h2 class="landing-title-card ">Mercados de cryptos</h2>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2" />
      <v-col cols="3" class="ma-0 mt-4 pa-0" v-for="data in saving" :key="data.id">
        <template v-if="hidden">
          <card :data="data" :hiddenButton="hidden"/>
        </template>
        <template v-else class="d-flex flex-wrap">
          <card v-for="data in borrow" :key="data.id" :data="data" :hiddenButton="hidden"/>
        </template>
      </v-col>
      <v-col cols="1"/>
    </v-row>
  </div>
</template>
<script>
import card from './Card.vue';

export default {
  name: 'Landing',
  components: {
    card,
  },
  methods: {
    onBorrow() {
      this.hidden = false;
    },
    onSaving() {
      this.hidden = true;
    },
  },
  data() {
    return {
      hidden: true,
      saving: [
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 2,
          name: 'BTCx',
          rate: 6.02,
          price: 50,
        },
        {
          id: 3,
          name: 'BPRO',
          rate: 7.04,
          price: 400,
        },
        {
          id: 3,
          name: 'BPRO',
          rate: 7.04,
          price: 400,
        },
        {
          id: 3,
          name: 'BPRO',
          rate: 7.04,
          price: 400,
        },
        {
          id: 3,
          name: 'BPRO',
          rate: 7.04,
          price: 400,
        },
        {
          id: 3,
          name: 'BPRO',
          rate: 7.04,
          price: 400,
        },
        {
          id: 3,
          name: 'BPRO',
          rate: 7.04,
          price: 400,
        },
        {
          id: 3,
          name: 'BPRO',
          rate: 7.04,
          price: 400,
        },
      ],
      borrow: [
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
      ],
    };
  },
};
</script>
