<template>
  <div class="validation-dialog">
    <v-dialog v-model="dialog" hide-overlay persistent width="400">
      <v-card id="modal-error">
        <span class="">
         <v-img  v-if="!type"  src="@/assets/error.png" width="40" contain/>
         <v-img v-if="type"  src="@/assets/success.png" width="40" contain />
        </span>

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
  props: {
    showModal: {
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
