<template>
  <div class="text-center">
    <v-dialog v-model="dialog" hide-overlay persistent width="543">
      <v-card id="modal-error">
        <v-img  v-if="!type" class="modalError-img" src="@/assets/error.png"></v-img>
        <v-img v-if="type" class="modalError-img" src="@/assets/success.png"></v-img>
        <v-card-title v-if="!type" class="modalError-title">
          Ha habido un error en el registro.
        </v-card-title>
        <v-card-title v-if="type" class="modalSuccess-title">
          Te has registrado correctamente.
        </v-card-title>
        <v-card-text v-if="!type" class="modalError-text">
          Escribenos a diego@tugroup.tech y te ayudaremos en el proceso.
        </v-card-text>
        <v-card-text v-if="type" class="modalError-text">
          Muy pronto podrás empezar a vivir la buena vida en Tropyco.
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  props: ['type'],
  data() {
    return {
      dialog: true,
    };
  },
};
</script>
