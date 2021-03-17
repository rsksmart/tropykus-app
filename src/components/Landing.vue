<template>
  <div class="landing-contain">
    <h1 class="landing-title">Saca rendimiento de tus Bitcoins</h1>
    <button
      class="landing-save"
      :class="{ 'landing-save-click': !hidden }"
      @click="onSaving"
    >
      Ahorrar
    </button>
    <button
      class="landing-borrow"
      :class="{ 'landing-borrow-click': !hidden }"
      @click="onBorrow"
    >
      Pedir prestado
    </button>
    <h2 class="landing-title-card">Mercados de cryptos</h2>
    <div v-if="hidden" class="landing-saving">
      <Card
        v-for="data in saving"
        :key="data.id"
        :data="data"
        :hidden="hidden"
      />
    </div>
    <div v-if="!hidden" class="landing-borrowing">
      <Card
        v-for="data in borrow"
        :key="data.id"
        :data="data"
      />
    </div>
  </div>
</template>
<script>
import Card from './Card.vue';

export default {
  components: {
    Card,
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
          rate: 9.01,
          price: 300,
        },
        {
          id: 3,
          name: 'BPRO',
          rate: 9.01,
          price: 300,
        },
      ],
      borrow: [
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
