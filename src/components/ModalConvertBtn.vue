<template>
  <div>
    <v-dialog v-model="dialog" width="350">
      <v-card
        class="modal-convert-btn d-flex justify-center align-center flex-column"
        v-click-outside="outsideConvertBtn"
      >
        <h1 class="mt-8 mb-2">Convierte de BTC a RBTC</h1>
        <p class="mb-8">
          Ten en cuenta que las comisones para realizar cualquier transacción deben ser pagadas en
          RBTC, por lo tanto debes convertir tus BTC a RBTC para poder usar Tropyco.
        </p>
        <img width="180" src="../assets/btn-icon.png" alt=""/>
        <div>
            <v-btn width="100"  color="rgba(0,0,0,0.0)"
             class="ma-2 my-8 button-continue">Continuar</v-btn>
            <v-btn width="160" color="#4CB163" class="ma-2 my-8">Conviertir BTC a RBTC</v-btn>
        </div>
     </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModalConvertBtn',
  props: {
    showModalConvertBtn: {
      require: true,
      type: Boolean,
    },
  },
  methods: {
    outsideConvertBtn() {
      this.dialog = false;
      this.$emit('closed');
    },
  },
  data() {
    return {
      dialog: this.showModalConvertBtn,
    };
  },
};
</script>
