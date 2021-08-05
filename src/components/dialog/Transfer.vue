<template>
  <div>
    <v-dialog v-model="dialog" persistent content-class="d-transfer"
      overlay-opacity="0.6" overlay-color="#000">
      <v-card class="dialog-transfer ma-0 secondary-color p1-descriptions text-info">
        <v-icon class="btn-close-dialog" @click="closeDialog">mdi-close</v-icon>
          <div class="content-transfer">
            <div class="h2-heading mb-4">
              Transfiere tus fondos desde
            </div>

            <div class="transfer-img">
                <img src="@/assets/dialog/binance.png" />
                <img src="@/assets/dialog/ledn.png" />
                <img src="@/assets/dialog/blockfi.svg" />
                <img src="@/assets/dialog/coinbase.png" />
                <img src="@/assets/dialog/kraken.png" />
            </div>

            <v-divider class="divider"></v-divider>

            <div class="transfer-description">
              <div class="d-flex">
                <img src="@/assets/dialog/1.svg" />
                <div class="ml-3">
                  Inicia sesión en la plataforma donde tienes tus fondos.
                </div>
              </div>
              <div class="d-flex">
                <img src="@/assets/dialog/2.svg" />
                <div class="ml-3">
                  Busca la criptomoneda que quieres transferir.
                </div>
              </div>
              <div class="d-flex align-start">
                <img src="@/assets/dialog/3.svg" />
                <div class="ml-3">
                  Selecciona la opción de “retirar”.
                </div>
              </div>
              <div class="d-flex align-start">
                <img src="@/assets/dialog/4.svg" />
                <div class="ml-3">
                  A continuación, debes copiar tu dirección de la billetera
                  (Liquality, Metamask ó Defiant )
                  y colocarla en el campo de la plataforma que indica la dirección de recepción.
                </div>
              </div>
              <div class="d-flex align-start">
                <img src="@/assets/dialog/5.svg" />
                <div class="ml-3">
                  Escribe el monto que quieres transferir a tu billetera y selecciona la red RSK.
                  Si no aparece la red especificada deberás seleccionar la que diga “ERC20”.
                  Ten mucha precaución, pues si seleccionas la red incorrecta perderás tus fondos.
                </div>
              </div>
              <div class="d-flex align-start">
                <img src="@/assets/dialog/6.svg" />
                <div class="ml-3">
                  Revisa que hayan sido enviados correctamente tus fondos a tu billetera.
                </div>
              </div>
            </div>
          </div>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

export default {
  name: 'Tutorial',
  data() {
    return {
      dialog: this.showModal,
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
      this.$emit('closed');
    },
  },
};
</script>
