<template>
  <v-dialog v-model="dialog" width="538p">
    <v-card class="modal-transaction-status">
      <div class="card-content mx-auto">
        <div class="mb-5">
          <div v-if="stage === 'in-progress'">
            <div class="text-center">
              <v-progress-circular
                indeterminate
                color="#ff9153"
                :width="15"
                :size="180"
              ></v-progress-circular>
            </div>
          </div>
          <div v-else>
            <v-img width="180" :src="dialogImg"
                   class="mx-auto" alt="action icon" />
          </div>
        </div>
        <h2 class="text-center px-10">{{ dialogText }}</h2>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import Success from '@/assets/Check.svg';
import Error from '@/assets/Error.svg';

export default {
  name: 'ModalTxStatus',
  props: {
    showModal: {
      require: true,
      type: Boolean,
    },
    inBorrowMenu: {
      require: true,
      type: Boolean,
    },
    stage: {
      require: true,
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
          return this.inBorrowMenu ? 'No tienes fondos ahorrados. Necesitas tener fondos'
            + 'ahorrados como  garantia para el préstamo.' : 'No tienes fondos suficientes'
            + ' en tu billetera';
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
</script>
