<template>
  <div>
    <v-dialog v-model="dialog" width="350">
      <v-card
        class="modal-borrow d-flex justify-center flex-column"
        v-click-outside="onClickOutside"
      >
        <v-row class="button ma-0 my-2 d-flex justify-center justify-space-around">
          <v-btn
            depressed
            color="transparent"
            @click="hidden = true"
            :class="hidden ? 'button-save' : 'button-save-click'"
          >
            Pedir prestado
          </v-btn>
          <v-btn
            depressed
            color="transparent"
            @click="hidden = false"
            :class="hidden ? 'button-withdraw' : 'button-withdraw-click'"
          >
            Pagar
          </v-btn>
        </v-row>
        <v-row v-if="!hidden" class="space ma-0"></v-row>
        <v-row class="d-flex justify-center ma-0 ">
          <div class="modal-container ml-6">
            <img
              src="../assets/icon-borrow.png"
              alt="icon borrow"
              class="icon-borrow mb-1"
              v-if="hidden"
            />
            <img
              src="../assets/icon-pay.png"
              alt="icon pig"
              class="wallet-icon mb-1"
              v-if="!hidden"
            />
            <p v-if="hidden" class="title-modal-rate ma-0">
              En tu billetera:
            </p>
            <p v-if="!hidden" class="title-modal-rate ma-0 mb-2">
              Debes pagar:
            </p>
            <p v-if="hidden" class="ma-0 p-bold p-name-data">0.000000 {{ data.name }}</p>
            <p v-if="hidden" class="ma-0 p-italic">= ${{ data.price }} USD</p>
            <p v-if="!hidden" class="ma-0 p-bold p-name-data mb-2">0.000000 {{ data.name }}</p>
            <p v-if="!hidden" class="ma-0 p-italic">= ${{ data.price }} USD</p>
          </div>
          <v-spacer></v-spacer>
          <div v-if="hidden" class="d-flex flex-column modal-container-img mr-6">
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
            <p class="ma-0" v-if="hidden">Interés Anual</p>
            <p class="ma-0 mb-2 modal-rate" v-if="hidden">{{ data.rate }} %</p>
          </div>
          <div v-if="!hidden" class="d-flex flex-column modal-container-img mr-6">
            <div class="d-flex">
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
            <p class="title-modal-rate ma-0 mb-2">
              Pediste prestado:
            </p>
            <p class="ma-0 p-bold p-name-data mb-2">0.000000 {{ data.name }}</p>
            <p class="ma-0 p-italic mb-10">= ${{ data.price }} USD</p>
          </div>
        </v-row>
        <v-row class="d-flex align-center flex-column ma-0">
          <div class="d-flex flex-column align-center warning-contain">
            <div class="modal-line" />
            <div v-if="hidden" class="d-flex my-4 mx-5">
              <img class="ml-8" src="../assets/icon-warning.png" alt="Icon Warning" />
              <p class="ma-0 mt-1 p-warning">
                Necesitas tener ahorros en otras cryptos para respaldar tu prestámo
              </p>
            </div>
            <div v-if="hidden" class="modal-line" />
          </div>
          <div class="d-flex justify-start modal-contain-subtitle">
            <p v-if="hidden" class="ma-0 mt-5 mb-2">Escribe la cantidad que vas a pedir prestada</p>
            <p v-if="!hidden" class="ma-0 mt-5 mb-2">Escribe la cantidad que vas a pagar</p>
          </div>
          <v-text-field placeholder="Escribe el monto" v-model="amount" solo dense></v-text-field>
          <v-btn v-if="!amount" class="modal-button mb-6" height="42" color="#A3C5AB" width="300">
            Conectar billetera
          </v-btn>
          <v-btn
            v-else
            @click="showModalConnectWallet = true"
            class="modal-button mb-6"
            height="42"
            color="#FF9153"
            width="300"
          >
            Conectar billetera
          </v-btn>
          <template v-if="showModalConnectWallet">
            <modal-connect-wallet
              :showModalConnectWallet="showModalConnectWallet"
              @closed="outsideConnectWallet"
            />
          </template>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ModalConnectWallet from './ModalConnectWallet.vue';

export default {
  name: 'ModalBorrow',
  components: {
    ModalConnectWallet,
  },
  props: {
    showModal: {
      require: true,
      type: Boolean,
    },
    data: {
      type: Object,
    },
  },
  methods: {
    outsideConnectWallet() {
      this.showModalConnectWallet = false;
    },
    onClickOutside() {
      this.dialog = false;
      this.$emit('closed');
    },
  },
  data() {
    return {
      showModalConnectWallet: false,
      dialog: this.showModal,
      hidden: true,
      amount: '',
    };
  },
};
</script>
