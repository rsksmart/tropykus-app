<template>
  <v-dialog v-model="dialog" width="350" :persistent="dialog">
    <v-card class="tx-status" height="400">
      <div class="container">
        <v-row class="ma-0 d-flex justify-center">
          <v-progress-circular indeterminate color="#ff9153" :width="10" :size="90"/>
        </v-row>
        <v-row class="ma-0 mt-8 mx-3 d-flex justify-center align-center">
          <h2 class="text-center">Esperando a que las transacciones se minen</h2>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    showModal: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      dialog: this.showModal,
    };
  },
};
</script>%
