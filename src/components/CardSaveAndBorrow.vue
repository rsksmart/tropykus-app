<template>
  <v-card width="94%" class="card-save-and-borrow mx-3" color="rgba(1, 62, 47, 1)">
    <v-row class="ma-0">
      <span class="mt-3 mx-2 ml-3">
        <img
          width="40"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
        />
      </span>
      <h1>
        {{ data.name }}
      </h1>
      <a href="" class="mt-4 ml-2">
        <img width="12" src="../assets/icon-link.svg" />
      </a>
      <v-spacer></v-spacer>
      <template v-if="hiddenButton">
        <v-btn @click="showModalSave = true" class="mt-5" depressed color="#4696A6" width="35%">
          Ahorrar
        </v-btn>
        <template v-if="showModalSave">
          <modal-save :showModal="showModalSave" :data="data" @closed="onClickOutside" />
        </template>
      </template>
      <template v-else>
        <v-btn @click="showModalBorrow = true" class="mt-5" depressed color="#E65D3D" width="34%">
          Pagar
        </v-btn>
        <template v-if="showModalBorrow">
          <modal-borrow :showModal="showModalBorrow" :data="data" @closed="onClickOutside" />
        </template>
      </template>
      <div class="ma-auto card-line"></div>
    </v-row>
    <v-row class="ma-0">
      <template v-if="hiddenButton">
        <div class="mx-4 my-2 ml-5">
          <p>Tienes depositado</p>
          <p class="p-bold">{{ data.savings }} {{ data.name }}</p>
          <p class="p-italic">= $ {{ this.data.price * this.data.savings }} USD</p>
        </div>
        <v-spacer></v-spacer>
        <div class="mr-14 my-2">
          <p>Has ganado</p>
          <p class="p-bold">{{ data.earnings }} {{ data.name }}</p>
          <p class="p-italic">= $ {{ this.data.price * this.data.earnings }} USD</p>
        </div>
      </template>
      <template v-else>
        <div class="mx-4 my-2">
          <p>Pediste prestado</p>
          <p class="p-bold">{{ data.borrowing }} {{ data.name }}</p>
          <p class="p-italic">= $ {{ this.data.price * this.data.borrowing }} USD</p>
        </div>
        <v-spacer></v-spacer>
        <div class="mr-15 my-2">
          <p>Debes pagar</p>
          <p class="p-bold">{{ data.debts }} {{ data.name }}</p>
          <p class="p-italic">= $ {{ this.data.price * this.data.debts }} USD</p>
        </div>
      </template>
    </v-row>
  </v-card>
</template>

<script>
import ModalBorrow from './ModalBorrow.vue';
import ModalSave from './market/ModalSave.vue';

export default {
  name: 'CardSaveAndBorrow',
  components: {
    ModalBorrow,
    ModalSave,
  },
  data() {
    return {
      showModalBorrow: false,
      showModalSave: false,
    };
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
  },
  methods: {
    onClickOutside() {
      this.showModalBorrow = false;
    },
  },
};
</script>
