<template>
  <v-card width="94%" class="card mx-3" color="rgba(1, 62, 47, 1)">
    <v-row class="ma-0">
      <span class="mt-3 mx-2 ml-5">
        <img
          class="mt-3"
          width="40"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
        />
      </span>
      <h1 class="mt-4">
        {{ data.name }}
      </h1>
      <a href="" class="mt-8 ml-2">
        <img width="12" src="../assets/icon-link.svg" />
      </a>
      <v-spacer></v-spacer>
      <div class="anual-rate">
        <h2 class="mt-5 ml-10 anual-rate-title" v-if="hiddenButton">{{ data.rate }}%</h2>
        <h2 class="mt-5 ml-3 anual-rate-title" v-else>{{ data.rate }}%</h2>
        <p class="ma-0 mr-2 mb-3" v-if="hiddenButton">Rendimiento anual</p>
        <p class="ma-0 mr-2 d-flex justify-end" v-else>Interés anual</p>
      </div>
      <div class="ma-auto card-line"></div>
    </v-row>
    <v-row class="ma-0">
      <template v-if="showInfoMyWallet">
        <div class="ma-4 ml-5">
          <p>Precio actual</p>
          <p>1 {{ data.name }} = ${{ data.price }} USD</p>
        </div>
      </template>
      <template v-else>
        <div class=" mt-1 ml-5">
          <p>Tienes en tu billetera</p>
          <p class="p-bold">{{ data.savings }} {{ data.name }}</p>
          <p class="p-italic">= $ {{ this.data.price * this.data.savings }} USD</p>
        </div>
      </template>
      <v-spacer></v-spacer>
      <template v-if="hiddenButton">
        <v-btn
          @click="showModalSave = true"
          class="mt-5 mb-6"
          depressed
          color="#51C1AF"
          width="35%"
        >
          Ahorrar
        </v-btn>
        <template v-if="showModalSave">
          <modal-save :showModal="showModalSave" :data="data" @closed="onClickOutside" />
        </template>
      </template>
      <template v-else>
        <v-btn @click="showModalBorrow = true" class="mt-5 mb-6"
        depressed color="#FF9153" width="38%">
          Pedir prestado
        </v-btn>
        <template v-if="showModalBorrow">
          <modal-borrow :showModal="showModalBorrow" :data="data" @closed="onClickOutside" />
        </template>
      </template>
    </v-row>
  </v-card>
</template>
<script>
import ModalBorrow from './ModalBorrow.vue';
import ModalSave from './ModalSave.vue';

export default {
  name: 'Card',
  components: {
    ModalSave,
    ModalBorrow,
  },
  props: {
    data: {
      require: true,
      type: Object,
    },
    hiddenButton: {
      require: true,
      type: Boolean,
    },
    showInfoMyWallet: {
      require: true,
      type: Boolean,
    },
  },
  methods: {
    onClickOutside() {
      this.showModalSave = false;
      this.showModalBorrow = false;
    },
  },
  data() {
    return {
      showModalSave: false,
      showModalBorrow: false,
    };
  },
};
</script>
