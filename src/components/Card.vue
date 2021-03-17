<template>
  <div class="card">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
      alt=""
    />
    <h1 class="card-title">{{ data.name }}</h1>
    <p class="card-rate">{{ data.rate }}%</p>
    <p class="card-description" v-if="hidden">Rendimiento anual</p>
    <p class="card-description-lending" v-if="!hidden">Interés anual</p>
    <div class="card-line"></div>
    <p class="card-price">{{ `1 ${data.name} = $${data.price} USD` }}</p>
    <p class="card-price-description">Precio actual</p>
    <!-- <button class="card-saving" v-if="hidden" @click="onSaving">Ahorrar</button> -->
    <Modal class="card-saving" v-if="hidden" @click="onSaving"/>
    <button class="card-lending" v-if="!hidden" @click="onLending">
      Pedir prestado
    </button>
  </div>
</template>
<script>
import Modal from './Modal.vue';

export default {
  props: ['data', 'hidden'],
  components: {
    Modal,
  },
  methods: {
    onSaving() {
      this.hiddenSave = true;
    },
  },
  data() {
    return {
      hiddenSave: false,
    };
  },
};
</script>
