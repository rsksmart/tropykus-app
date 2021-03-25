<template>
  <v-card width="94%" class="card mx-3" color="rgba(1, 62, 47, 0.85)">
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
      <template v-if="hiddenButton">
        <v-btn
          @click="showModalSave = true"
          class="mt-5"
          depressed
          color="#51C1AF"
          width="35%"
        >
          Ahorrar
        </v-btn>
        <template v-if="showModalSave">
          <modal-save :showModal="showModalSave" :data="data" @closed="onClickOutside"/>
        </template>
      </template>
      <template v-else>
        <v-btn
          @click="showModalBorrow = true"
          class="mt-5"
          depressed
          color="#FF9153"
          width="38%"
        >
          Pedir prestado
        </v-btn>
        <template v-if="showModalBorrow">
          <modal-borrow :showModal="showModalBorrow" :data="data" @closed="onClickOutside"/>
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
  mounted() {
    console.log(`Card show modal: ${this.showModal}`);
  },
};
</script>
