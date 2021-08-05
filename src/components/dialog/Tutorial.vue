<template>
  <div>
    <v-dialog v-model="dialog" persistent content-class="d-tutorial"
      overlay-opacity="0.6" overlay-color="#000">
      <v-card class="dialog-tutorial ma-0 secondary-color">
        <v-icon class="btn-close-dialog" @click="closeDialog">mdi-close</v-icon>
          <iframe src="https://www.youtube.com/watch?v=V9Kr2SujqHw&t=1s">
          </iframe>
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
