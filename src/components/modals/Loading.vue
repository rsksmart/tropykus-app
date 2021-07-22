<template>
  <div>
    <v-dialog v-model="dialog" persistent content-class="d-loading"
      overlay-opacity="0.6" overlay-color="#000">
      <v-card v-if="data.type === 'deposit'"
        class="dialog-loading ma-0 secondary-color d-flex align-center">
        <v-icon class="btn-close-dialog" @click="closeDialog">mdi-close</v-icon>
        <div v-if="data.loading" class="row ma-0 d-flex flex-column align-center">
          <v-progress-circular class="progress-loading"
            indeterminate color="#41A255" :width="6" :size="80"/>
          <div v-if="data.wallet" class="text-primary s1-pop-ups text-description mt-9">
            {{$t('dialog.loading.description1')}}
          </div>
          <div v-else class="text-primary s1-pop-ups text-description mt-9">
            {{$t('dialog.loading.description2')}}

          </div>
        </div>
        <div v-else class="row ma-0 d-flex flex-column align-center">
          <v-img width="150" height="150" src="@/assets/dialog/success.svg" alt=""/>
          <div class="text-primary s1-pop-ups text-deposit">
            {{ data.deposit
              ? $t('dialog.loading.description3')
              : $t('dialog.loading.description4')
            }} <br />
            {{data.amount | formatDecimals(data.symbol) }}
            <span class="text-uppercase">{{data.symbol}}</span>
          </div>
          <v-btn @click="closeDialog" class="btn btn-primary">
            <span class="b1-main white--text">
             {{$t('dialog.loading.btn')}}
            </span>
          </v-btn>
        </div>
      </v-card>
      <v-card v-else class="dialog-loading ma-0 secondary-color d-flex align-center">
        <v-icon class="btn-close-dialog" @click="closeDialog">mdi-close</v-icon>
        <div v-if="data.loading" class="row ma-0 d-flex flex-column align-center">
          <v-progress-circular class="progress-loading"
            indeterminate color="#41A255" :width="6" :size="80"/>
          <div v-if="data.wallet" class="text-primary s1-pop-ups text-description mt-9">
            {{$t('dialog.loading.description1')}}
          </div>
          <div v-else class="text-primary s1-pop-ups text-description mt-9">
            {{$t('dialog.loading.description2')}}

          </div>
        </div>
        <div v-else class="row ma-0 d-flex flex-column align-center">
          <v-img width="150" height="150" src="@/assets/dialog/success.svg" alt=""/>
          <div class="text-primary s1-pop-ups text-deposit">
            {{ data.borrow
              ? $t('dialog.loading.description5')
              : $t('dialog.loading.description6')
            }} <br />
            {{data.amount | formatDecimals(data.symbol) }}
            <span class="text-uppercase">{{data.symbol}}</span>
          </div>
          <v-btn @click="closeDialog" class="btn btn-primary">
            <span class="b1-main white--text">
             {{$t('dialog.loading.btn')}}
            </span>
          </v-btn>
        </div>
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
