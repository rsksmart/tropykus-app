<template>
  <div>
    <v-dialog v-model="dialog" width="350">
      <v-card class="modal-borrow d-flex justify-center flex-column">
        <v-row class="ma-0 mt-3 d-flex justify-center justify-space-around">
          <button @click="hidden = true" :class="hidden ? 'button-save' : 'button-save-click'">
            Ahorrar
          </button>
          <button
            @click="hidden = false"
            :class="hidden ? 'button-withdraw' : 'button-withdraw-click'"
          >
            Retirar
          </button>
        </v-row>
        <v-row class="d-flex justify-center ma-0 ">
          <div class="modal-container mt-6 ml-6">
            <img
              src="../assets/icon-borrow.png"
              alt="icon wallet"
              class="wallet-icon mb-1"
              v-if="hidden"
            />
            <img
              src="../assets/icon-pay.png"
              alt="icon pig"
              class="wallet-icon mb-1"
              v-if="!hidden"
            />
            <p class="title-modal-rate ma-0">
              En tu billetera:
            </p>
            <p class="ma-0 p-bold p-name-data"> 0.000000 {{ data.name }} </p>
            <p class="ma-0 mb-6 p-italic">= ${{ data.price }} USD</p>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex flex-column modal-container-img mr-6 mt-6">
            <div :class="hidden ? 'modal-icon' : 'modal-icon-click'">
              <img
              class="mb-2"
                width="30"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
              />
              <div>
                <p class="ma-0 p-bold p-name mt-2">1 {{ data.name }}</p>
                <p class="ma-0 p-italic">= $50.000 USD</p>
              </div>
            </div>
            <p class="ma-0 mb-1" v-if="hidden">Rendimiento Anual</p>
            <p class="ma-0 modal-rate" v-if="hidden">{{ data.rate }} %</p>
          </div>
        </v-row>
        <v-row class="d-flex align-center flex-column ma-0">
          <div class="modal-line" />
          <div class="d-flex justify-start modal-contain-subtitle">
            <p class="ma-0 mt-5 mb-2">Escribe la cantidad que vas a ahorrar</p>
          </div>
          <v-text-field placeholder="Escribe el monto" v-model="amount" solo dense></v-text-field>
          <v-btn v-if="!amount" class="modal-button mb-6" height="42" color="#A3C5AB" width="300">
            Conectar billetera
          </v-btn>
          <v-btn v-if="amount" class="modal-button mb-6" height="42" color="#4CB163" width="300">
            Conectar billetera
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalSave',
  props: {
    showModal: {
      require: true,
      type: Boolean,
    },
    data: {
      type: Object,
    },
  },
  computed: {
    dialog() {
      return this.showModal;
    },
  },
  data() {
    return {
      hidden: true,
      amount: '',
    };
  },
};
</script>
