<template>
  <div>
    <v-dialog v-model="dialog" persistent content-class="d-transfer"
      overlay-opacity="0.6" overlay-color="#000">
      <v-card class="dialog-transfer ma-0 secondary-color p1-descriptions text-info">
        <v-icon class="btn-close-dialog" @click="closeDialog">mdi-close</v-icon>
          <div class="content-transfer">
            <div class="h2-heading mb-4">
              {{$t('dialog.transfer-funds.title')}}
            </div>

            <div class="transfer-img">
                <img src="@/assets/dialog/binance.png" />
                <img src="@/assets/dialog/ledn.png" />
                <img src="@/assets/dialog/blockfi.svg" />
                <img src="@/assets/dialog/coinbase.png" />
                <img src="@/assets/dialog/kraken.png" />
            </div>

            <v-divider class="divider"></v-divider>

            <div class="transfer-description">
              <div class="d-flex">
                <img src="@/assets/dialog/1.svg" />
                <div class="ml-3">
                  {{$t('dialog.transfer-funds.number1')}}
                </div>
              </div>
              <div class="d-flex">
                <img src="@/assets/dialog/2.svg" />
                <div class="ml-3">
                  {{$t('dialog.transfer-funds.number2')}}
                </div>
              </div>
              <div class="d-flex align-start">
                <img src="@/assets/dialog/3.svg" />
                <div class="ml-3">
                  {{$t('dialog.transfer-funds.number3')}}
                </div>
              </div>
              <div class="d-flex align-start">
                <img src="@/assets/dialog/4.svg" />
                <div class="ml-3">
                  {{$t('dialog.transfer-funds.number4')}}
                </div>
              </div>
              <div class="d-flex align-start">
                <img src="@/assets/dialog/5.svg" />
                <div class="ml-3">
                  {{$t('dialog.transfer-funds.number5')}}
                </div>
              </div>
              <div class="d-flex align-start">
                <img src="@/assets/dialog/6.svg" />
                <div class="ml-3">
                  {{$t('dialog.transfer-funds.number6')}}
                </div>
              </div>
            </div>
          </div>
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
