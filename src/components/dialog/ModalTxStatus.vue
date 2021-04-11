<template>
  <v-dialog v-model="dialog" width="350">
    <v-card class="modal-transaction-status" height="400">
      <div class="container">
        <v-row class="ma-0 d-flex justify-center">
          <template v-if="stage === 'in-progress'">
            <v-progress-circular indeterminate color="#ff9153" :width="10" :size="90" />
          </template>
          <template v-else>
            <v-img height="90" :src="dialogImg" position="center center"
                   alt="action icon" contain />
          </template>
        </v-row>
        <v-row class="ma-0 mt-8 mx-3 d-flex justify-center align-center">
          <h2 class="text-center">{{ dialogText }}</h2>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Success from '@/assets/dialog/success.svg';
import Error from '@/assets/dialog/error.svg';

export default {
  name: 'ModalTxStatus',
  props: {
    showModal: {
      required: true,
      type: Boolean,
    },
    inBorrowMenu: {
      required: true,
      type: Boolean,
    },
    stage: {
      required: true,
      type: String,
    },
    txAmount: {
      type: String,
    },
    txCryptocurrency: {
      type: String,
    },
  },
  data() {
    return {
      dialog: this.showModal,
    };
  },
  computed: {
    dialogImg() {
      if (this.stage === 'error') return Error;
      return Success;
    },
    dialogText() {
      switch (this.stage) {
        case 'error':
          return this.inBorrowMenu ? 'No tienes fondos ahorrados. Necesitas tener fondos '
              + 'ahorrados como  garantía para el préstamo.' : 'No se pudo completar el depósito '
              + 'necesitas tener fondos suficientes';
        case 'success':
          return this.inBorrowMenu ? `Has pedido prestado ${this
            .txAmount} ${this.txCryptocurrency}` : `Has depositado ${this
            .txAmount} ${this.txCryptocurrency}`;
        case 'in-progress':
          return 'Esperando la autorización de la transacción en tu billetera';
        default:
          return '';
      }
    },
  },
};
</script>%
