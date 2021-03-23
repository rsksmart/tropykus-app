<template>
  <div>
    <v-dialog v-model="dialog" width="350">
      <v-card class="modal-save-borrow d-flex justify-center flex-column">
        <v-row class="ma-0 mt-3 d-flex justify-center justify-space-around">
          <button>
            Ahorrar
          </button>
          <button>
            Retirar
          </button>
        </v-row>
        <v-row class="d-flex justify-center ma-0 ">
          <div class="modal-container mt-6 ml-6">
            <img src="../assets/icon-modal.png" class="wallet-icon" />
            <p class="title-modal-rate mb-10">
              En tu billetera: 0.000000 {{ data.name }} = ${{ data.price }} USD
            </p>
          </div>
          <v-spacer></v-spacer>
          <div class="d-flex flex-column modal-container-img mr-6 mt-6">
            <div class="d-flex">
              <img
                width="30"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"
              />
              <div>
                <p class="ma-0">1 {{ data.name }}</p>
                <p class="ma-0">=50.000 USD</p>
              </div>
            </div>
            <p class="ma-0 mb-1 mt-1 ">Rendimiento Anual</p>
            <p class="ma-0 modal-rate">{{ data.rate }} %</p>
          </div>
        </v-row>
        <v-row class="d-flex align-center flex-column ma-0">
          <div class="modal-line" />
          <div class="d-flex justify-start modal-contain-subtitle">
            <p class="ma-0 mt-5 mb-2">Escribe la cantidad que vas a ahorrar</p>
          </div>
          <v-text-field
            placeholder="Escribe el monto          MAX"
            solo
            dense
          ></v-text-field>
          <v-btn
            class="modal-button mb-6"
            height="42"
            color="#A3C5AB"
            @click="redirect"
            width="300"
          >
            Conectar billetera
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
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
    return {};
  },
};
</script>
