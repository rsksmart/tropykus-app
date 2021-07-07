<template>
  <div>
    <v-dialog  v-model="dialog" width="414" overlay-opacity="0.6" overlay-color="#000">
      <v-card class="dialog-change-btc ma-0" v-click-outside="closeDialog">
      <v-icon class="btn-close-dialog" @click="closeDialog">mdi-close</v-icon>
        <v-row class="d-flex justify-center text-center ma-0">
          <h3 class="h3-sections-heading text-detail">
            Convierte tus BTC a RBTC
          </h3>
        </v-row>
        <div class="d-flex justify-center subtitle-1">
          <div class="p1-descriptions text-info ">
            Ten en cuenta que las comisiones para realizar cualquier transacción deben
            ser pagadas en RBTC, por lo tanto debes convertir tus BTC a RBTC
            para poder usar Tropykus.
          </div>
        </div>

        <v-divider class="divider"></v-divider>

        <v-row class="d-flex justify-center ma-0 mb-5">
          <div class="p1-descriptions text-info">
            Selecciona una de las opciones para
            convertir tus BTC a RBTC.
          </div>
        </v-row>

        <div class="d-flex justify-center mb-5">
          <v-btn text
          class="btn-wallet d-flex justify-center">
            <img class="ml-5 mr-6" src="@/assets/wallets/exchange.svg"
              alt="Wallet connect icon" />
            <span class="b2-secondary">FastBTC</span>
          </v-btn>
        </div>

        <div class="d-flex justify-center mb-3">
          <v-btn text
          class="btn-wallet d-flex justify-center">
            <img class="ml-5 mr-6" src="@/assets/wallets/liquality.svg"
              alt="Wallet connect icon" />
            <span class="b2-secondary">Liquality</span>
          </v-btn>
        </div>

        <div class="d-flex justify-center mt-10">
          <v-checkbox
            color="#47B25F"
            v-model="checkbox"
            :label="`No volver a mostrar`"
          ></v-checkbox>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

export default {
  name: 'ChangeBtc',
  data() {
    return {
      dialog: this.showModal,
      checkbox: false,
    };
  },
  props: {
    showModal: {
      type: Boolean,
    },
  },
  watch: {
    showModal() {
      this.dialog = this.showModal;
    },
  },
  methods: {
    closeDialog() {
      // this.dialog = false;
      this.$emit('closed');
    },
  },
};
</script>
