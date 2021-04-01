<template>
  <v-dialog v-model="dialog" width="538px">
    <v-card class="modal-transfer-funds" v-click-outside="onClickOutside">
      <div class="card-content mx-auto">
        <div class="pt-4 float-right">
          <v-img
            @click="dialog = false"
            src="@/assets/close-dialog.svg"
            alt="Close dialog"
            width="32"
          />
        </div>
        <br />
        <div class="mt-7">
          <h1 class="text-center mb-2">Transfiere tus fondos desde</h1>
          <v-row class="d-flex align-center">
            <v-col cols="6" class="pt-6">
              <v-img width="235" class="mx-auto" src="@/assets/buda-logo.svg" alt="Buda Logo" />
            </v-col>
            <v-col cols="6">
              <v-img
                width="174"
                class="mx-auto"
                src="@/assets/coinbase-logo.svg"
                alt="Coinbase Logo"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="pt-2">
              <v-img width="214" class="mx-auto" src="@/assets/kraken-logo.svg" alt="Kraken Logo" />
            </v-col>
          </v-row>
        </div>
        <v-divider class="my-5" dark></v-divider>
        <div v-for="step in steps" :key="step.id" class="d-flex mb-1">
          <div class="step-number flex-shrink-0 d-flex justify-center">
            <p>{{ step.number }}</p>
          </div>
          <div class="d-flex-align-center">
            <p class="step-description">{{ step.text }}</p>
          </div>
        </div>
        <v-btn
          height="62"
          @click="dialog = false"
          block
          class="continue-button px-10 mt-5"
          color="#4cb163"
          >Continuar</v-btn
        >
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
.modal-transfer-funds {
  background-color: #013e2f !important;
  height: 812px;
  color: #fff;
}

.card-content {
  width: 80%;
}

.card-content p {
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

.continue-button {
  font-size: 25px;
  font-family: Lato;
  font-weight: 700;
  text-transform: capitalize;
  color: #fff;
}
</style>
