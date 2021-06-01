<template>
  <v-dialog v-model="dialog" width="500" overlay-color="#000" overlay-opacity="0.8">
    <v-card class="container" v-click-outside="onClickOutside" color="#013E2F">
      <v-row class="ma-0 float-right">
        <v-img @click="onClickOutside" src="@/assets/dialog/close.svg"
               alt="Close dialog" width="24" />
      </v-row>
      <v-row class="ma-0 d-flex justify-center">
        <h1 class="text-center whiteish">Transfiere tus fondos desde</h1>
      </v-row>
      <v-row class="pt-2 d-flex align-center">
        <v-col cols="6" class="d-flex justify-end">
          <v-img height="32" src="@/assets/wallets/buda.svg"
                 alt="Buda Logo" position="center right" contain />
        </v-col>
        <v-col cols="6" class="d-flex justify-start">
          <v-img height="32" class="mx-auto" src="@/assets/wallets/coinbase.svg"
                 alt="Coinbase Logo" position="center left" contain />
        </v-col>
      </v-row>
      <v-row class="ma-0 pb-2 d-flex justify-center">
        <v-img position="center center" height="32" class="mx-auto"
               src="@/assets/wallets/kraken.svg" alt="Kraken Logo" contain />
      </v-row>
      <v-container>
        <v-divider class="my-5" color="#51C1AF" />
        <div v-for="step in steps" :key="step.id" class="d-flex mb-1">
          <div class="step-number flex-shrink-0 d-flex justify-center">
            <p>{{ step.number }}</p>
          </div>
          <div class="d-flex-align-center">
            <p class="step-description">{{ step.text }}</p>
          </div>
        </div>
        <v-row class="ma-0">
          <v-btn @click="dialog = false" block color="#4cb163">
            <span class="whiteish">{{ $t('dialog.button') }}</span>
          </v-btn>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    showModal: {
      required: true,
      type: Boolean,
    },
  },
  methods: {
    onClickOutside() {
      this.dialog = false;
      this.$emit('closed');
    },
  },
  data() {
    return {
      dialog: this.showModal,
      steps: [
        { number: 1, text: 'Inicia sesión en la plataforma donde tienes tus fondos.' },
        { number: 2, text: 'Busca la criptomoneda que quieres transferir.' },
        { number: 3, text: 'Selecciona la opción de “retirar”' },
        {
          number: 4,
          text:
              'A continuación, debes copiar tu dirección de la billetera y colocarla en el campo de la plataforma que indica la dirección de recepción',
        },
        { number: 5, text: 'Escribe el monto que quieres transferir.' },
        {
          number: 6,
          text: 'Revisa que hayan sido enviados correctamente tus fondos a tu billetera.',
        },
      ],
    };
  },
};
</script>

<style scoped>
p {
  color: #fff;
  font-size: 18px;
  line-height: 25px;
}

.step-number {
  color: #fff;
  background-color: #4cb163;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: inline-block;
  text-align: center;
  margin-right: 1em;
}
</style>
