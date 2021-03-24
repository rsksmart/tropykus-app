<template>
  <v-card width="30%" class="card mb-6 mx-3" color="rgba(1, 62, 47, 0.85)">
    <v-row class="ma-0">
      <span class="mt-3 mx-2 ml-3">
        <img
          width="30"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
        />
      </span>
      <h1>
        {{ data.name }}
      </h1>
      <v-spacer></v-spacer>
      <div class="anual-rate">
        <h2 class="mt-3 ml-10">{{ data.rate }}%</h2>
        <p class="ma-0" v-if="hiddenButton">Rendimiento anual</p>
        <p class="ma-0 d-flex justify-end" v-if="!hiddenButton">Interés anual</p>
      </div>
      <div class="ma-auto card-line"></div>
    </v-row>
    <v-row class="ma-0">
      <div class="ma-4 ">
        <p>Precio actual</p>
        <p>1 {{ data.name }} = ${{ data.price }} USD</p>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        v-if="hiddenButton"
        @click="makeModalSaveVisible"
        class="mt-5"
        depressed
        color="#51C1AF"
        width="35%"
      >
        Ahorrar
      </v-btn>
      <v-btn
        v-if="!hiddenButton"
        @click="showModalBorrow = true"
        class="mt-5"
        depressed
        color="#FF9153"
        width="38%"
      >
        Pedir prestado
      </v-btn>
    </v-row>
    <modal-save :showModal="showModalSave" :data="data" @closed="onClickOutside"/>
    <modal-borrow :showModal="showModalBorrow" :data="data"/>
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
      type: Boolean,
    },
  },
  methods: {
    makeModalSaveVisible() {
      this.showModalSave = true;
    },
    onClickOutside() {
      this.showModalSave = false;
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
