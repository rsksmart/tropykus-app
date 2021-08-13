<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent content-class="d-pioneer"
      overlay-opacity="0.6" overlay-color="#000">
      <v-card class="dialog-pioneer">
        <img v-if="authorized" src="@/assets/dialog/fondo1.png" alt="">
        <img v-else src="@/assets/dialog/fondo2.png" alt="">
        <div v-if="authorized" class="pioneer-content">
          <div>
            <div class="h1-title">
              {{$t('dialog.pioneer.description1')}}
            </div>
            <div class="p1-descriptions mt-4">
              {{$t('dialog.pioneer.description2')}}
            </div>
            <v-btn class="btn primary-color mt-6" @click="closeDialog">
              <span class="b2-secondary white--text">
                {{$t('dialog.pioneer.btn1')}}
              </span>
            </v-btn>
          </div>
          <v-checkbox
              v-model="checkPioneer"
              label="No volver a mostrar"
              color="white"
              class="checkbox"
            ></v-checkbox>
        </div>
        <div v-else class="pioneer-content v2">
          <div>
            <div class="h1-title">
              {{$t('dialog.pioneer.description3')}}
            </div>
            <div class="p1-descriptions mt-3">
              {{$t('dialog.pioneer.description4')}}
            </div>
          </div>
          <a class="btn2 primary-color mt-6 b2-secondary white--text" href="https://test.tropykus.finance/">
            {{$t('dialog.pioneer.btn2')}}
          </a>
        </div>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>

export default {
  name: 'Loading',
  data() {
    return {
      dialog: this.showModal,
      checkPioneer: false,
    };
  },
  props: {
    showModal: {
      type: Boolean,
    },
    authorized: {
      type: Boolean,
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
      if (this.checkPioneer) {
        localStorage.setItem('tropykus-pioneer', this.checkPioneer);
      }
    },
  },
};
</script>
