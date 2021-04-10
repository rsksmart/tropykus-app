<template>
  <div>
    <v-dialog v-model="dialog" hide-overlay persistent width="350">
      <v-card class="validation-dialog d-flex justify-center flex-column">
        <v-row class="ma-0 mb-1 mt-12 d-flex align-end">
          <v-img v-if="!type" src="@/assets/error.png" height="100" contain />
          <v-img v-if="type" src="@/assets/success.png" height="100" contain />
        </v-row>
        <v-row
          v-if="!type"
          class="d-flex justify-center align-end ma-0 mt- mb-2"
        >
          <h1>Ha habido un error en el registro.</h1>
        </v-row>
        <v-row
          v-if="type"
          class="d-flex justify-center align-end ma-0 mt- mb-2"
        >
          <h1>Te has registrado correctamente.</h1>
        </v-row>
        <v-row
          v-if="!type"
          class="d-flex justify-center align-start ma-0 mb-15"
        >
          <p>Escribenos a diego@tugroup.tech y te ayudaremos en el proceso.</p>
        </v-row>
        <v-row v-if="type" class="d-flex justify-center align-start ma-0 mb-15">
          <p>Muy pronto podrás empezar a vivir la buena vida en Tropyco.</p>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'ModalValidationForm',
  props: {
    type: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      dialog: true,
    };
  },
};
</script>
