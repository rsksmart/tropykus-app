<template>
  <v-dialog v-model="dialog" width="600" :persistent="dialog">
    <v-card color="#013E2F" class="tx-summary container">
      <div class="container border">
        <v-container class="container">
          <v-row class="ma-0">
            <h1>Resumen del {{ actionTitle }}</h1>
          </v-row>
          <v-row class="ma-0 mt-5">
            <v-col class="pa-0">
              <v-row class="ma-0">
                <h2>Monto a {{ actionLabel }}</h2>
              </v-row>
              <v-row class="ma-0">
                <p>1,000000 RBTC</p>
              </v-row>
            </v-col>
            <v-col class="pa-0">
              <v-row class="ma-0">
                <h2>Costo de la transacción</h2>
              </v-row>
              <v-row class="ma-0">
                <p>0,0001000 RBTC</p>
              </v-row>
            </v-col>
          </v-row>
          <v-divider class="my-5" color="#FFFFFF" />
          <v-row class="ma-0">
            <h2>Velocidad de la transacción</h2>
          </v-row>
          <v-row class="ma-0">
            <p>Rápida | 30 s - 1 min</p>
          </v-row>
          <v-divider class="my-5" color="#FFFFFF" />
          <v-row class="ma-0">
            <h2>Monto total</h2>
          </v-row>
          <v-row class="ma-0">
            <p>1,00001000000 RBTC</p>
          </v-row>
        </v-container>
      </div>
      <v-row class="ma-0 mt-15 d-flex justify-center">
        <v-img src="@/assets/dialog/sign.svg" height="75" contain />
      </v-row>
      <v-row class="ma-0 mb-5 d-flex justify-center">
        <h1>Presiona el botón Sign en tu billetera para autorizar la transacción</h1>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import * as constants from '@/store/constants';

export default {
  name: 'TxSummary',
  data() {
    return {
      dialog: this.showModal,
      fee: 0.0006,
    };
  },
  props: {
    showModal: {
      required: true,
      type: Boolean,
    },
    action: {
      required: true,
      type: String,
    },
  },
  computed: {
    actionTitle() {
      if (this.action === constants.USER_ACTION_MINT) return 'depósito';
      if (this.action === constants.USER_ACTION_REDEEM) return 'retiro';
      if (this.action === constants.USER_ACTION_BORROW) return 'préstamo';
      if (this.action === constants.USER_ACTION_REPAY) return 'pago';
      return '';
    },
    actionLabel() {
      if (this.action === constants.USER_ACTION_MINT) return 'depósitar';
      if (this.action === constants.USER_ACTION_REDEEM) return 'retirar';
      if (this.action === constants.USER_ACTION_BORROW) return 'pedido en prestado';
      if (this.action === constants.USER_ACTION_REPAY) return 'pagar de la deuda';
      return '';
    },
  },
  methods: {
    close() {
      this.dialog = false;
      this.$emit('closeTxSummary');
    },
  },
};
</script>
