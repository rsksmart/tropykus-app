/* eslint-disable linebreak-style */
<template>
  <div>
    <h1>Modal Borrow</h1>
    <!-- <ModalTransactionStatus
      style="display: none;"
      showModal
      :stage="currentStage"
      txAmount="100"
      txCryptocurrency="rBTC"
    /> -->
    <ModalTransferFunds showModal />
  </div>
</template>

<script>
// import ModalTransactionStatus from '@/components/ModalTransactionStatus.vue';
import ModalTransferFunds from '@/components/ModalTransferFunds.vue';

export default {
  data() {
    return {
      currentStage: 'success',
      inProgressText: 'Esperando la autorización de la transacción en tu billetera',
      successText: 'Has pedido prestado 0,8932874 BTCx',
      errorText:
        'No tienes fondos ahorrados. Necesitas tener fondos ahorrados como  garantia para el préstamo.',
    };
  },

  components: {
    // ModalTransactionStatus,
    ModalTransferFunds,
  },
};
</script>
