<template>
  <div>
    <v-dialog  v-model="dialog" width="414" overlay-opacity="0.6" overlay-color="#000">
      <v-card class="dialog-empty ma-0" v-click-outside="closeDialog">
        <v-icon class="btn-close-dialog" @click="closeDialog">mdi-close</v-icon>
        <v-row class="d-flex justify-center text-center ma-0">
          <h3 class="h3-sections-heading text-detail">No tienes fondos en tu billetera</h3>
        </v-row>
        <v-row class="d-flex justify-center ma-0">
          <div class="p1-descriptions">
            Puedes comprar rBTC en KriptonMarket y
            disfrutar los beneficios del Tropykus.
          </div>
        </v-row>

        <div class="d-flex justify-center">
          <v-btn text class="btn btn-primary">
            <span class="b1-main white--text">Comprar rBTC</span>
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
