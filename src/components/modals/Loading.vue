<template>
  <div>
    <v-dialog v-model="dialog" width="414" overlay-opacity="0.6" overlay-color="#000">
      <v-card class="dialog-loading ma-0 secondary-color d-flex align-center"
        v-click-outside="closeDialog">
        <v-icon class="btn-close-dialog" @click="closeDialog">mdi-close</v-icon>
        <div class="row ma-0 d-flex flex-column align-center">
          <v-progress-circular indeterminate color="#41A255" :width="10" :size="90"/>
          <div class="text-primary s1-pop-ups text-description mt-9">
            Esperando la confirmación de la transacción en tu billetera
          </div>
        </div>
        <!-- <img src="@/assets/dialog/background.svg" alt=""> -->
      </v-card>
    </v-dialog>
  </div>
</template>
<script>

export default {
  name: 'Empty',
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
