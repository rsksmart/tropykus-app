<template>
  <v-dialog v-model="dialog" width="538px">
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
          <div v-else-if="stage === 'success'">
            <v-img width="180" src="@/assets/Check.svg" alt="Check icon" class="mx-auto" />
          </div>
          <div v-else-if="stage === 'error'">
            <v-img width="180" src="@/assets/Error.svg" alt="Error icon" class="mx-auto" />
          </div>
        </div>
        <h2 v-if="stage !== 'success'" class="text-center px-10">{{ dialogText }}</h2>
        <h2 v-else v-html="dialogText" class="text-center px-10"></h2>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showModal: {
      require: true,
      type: Boolean,
      default: false,
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
    dialogText() {
      let dialogText = '';
      if (this.stage === 'error') {
        // eslint-disable-next-line operator-linebreak
        dialogText =
          'No tienes fondos ahorrados. Necesitas tener fondos ahorrados como  garantia para el préstamo.';
      } else if (this.stage === 'success') {
        dialogText = `Has pedido prestado <br> ${this.txAmount} ${this.txCryptocurrency}`;
      } else if (this.stage === 'in-progress') {
        dialogText = 'Esperando la autorización de la transacción en tu billetera';
      }

      return dialogText;
    },
  },
};
</script>
