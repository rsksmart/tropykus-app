<template>
  <div>
    <v-btn @click="openEmpty">
      Empty
    </v-btn>
    <v-btn @click="openChange">
      Change
    </v-btn>
    <v-btn @click="openLoading">
      Loading
    </v-btn>
    <template v-if="emptyDialog">
      <dialog-empty :showModal="emptyDialog" @closed="closeModal"></dialog-empty>
    </template>
     <template v-if="changeBtc">
      <change-btc :showModal="changeBtc" @closed="closeModal"></change-btc>
    </template>
     <template v-if="loading">
      <loading :showModal="loading" @closed="closeModal"></loading>
    </template>
  </div>
</template>
<script>
import DialogEmpty from '@/components/modals/EmptyModal.vue';
import ChangeBtc from '@/components/modals/ChangeBtcModal.vue';
import Loading from '@/components/modals/Loading.vue';

export default {
  name: 'Dia',
  components: {
    DialogEmpty,
    ChangeBtc,
    Loading,
  },
  data() {
    return {
      emptyDialog: false,
      changeBtc: false,
      loading: false,
      data: [],
      name: 'Hola',
    };
  },
  methods: {
    openEmpty() {
      this.emptyDialog = true;
    },
    openChange() {
      this.changeBtc = true;
    },
    openLoading() {
      this.loading = true;
    },
    closeModal() {
      this.emptyDialog = false;
      this.changeBtc = false;
      this.loading = false;
    },
  },
};
</script>
