<template>
  <div class="aqui">
    <v-dialog v-model="dialog" content-class="d-loading" overlay-opacity="0.6" overlay-color="#000">
      <v-card class="dialog-loading ma-0 secondary-color d-flex align-center"
        v-click-outside="closeDialog">
        <v-icon class="btn-close-dialog" @click="closeDialog">mdi-close</v-icon>
        <div v-if="data.loading" class="row ma-0 d-flex flex-column align-center">
          <v-progress-circular class="progress-loading"
            indeterminate color="#41A255" :width="6" :size="80"/>
          <div v-if="data.wallet" class="text-primary s1-pop-ups text-description mt-9">
            Esperando la confirmación de la transacción en tu billetera
          </div>
          <div v-else class="text-primary s1-pop-ups text-description mt-9">
            Esperando la confirmación de la red
          </div>
        </div>
        <div v-else class="row ma-0 d-flex flex-column align-center">
          <v-img width="150" height="150" src="@/assets/dialog/success.svg" alt=""/>
          <div class="text-primary s1-pop-ups text-deposit">
            Has depositado <br />
            {{data.amount | formatDecimals(data.symbol) }}
            {{data.symbol}}
          </div>
          <v-btn @click="closeDialog" class="btn btn-primary">
            <span class="b1-main white--text">Continuar</span>
          </v-btn>
        </div>
        <!-- <img src="@/assets/dialog/background.svg" alt=""> -->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

export default {
  name: 'Loading',
  data() {
    return {
      dialog: this.showModal,
    };
  },
  props: {
    showModal: {
      type: Boolean,
    },
    data: {
      type: Object,
      require: true,
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
