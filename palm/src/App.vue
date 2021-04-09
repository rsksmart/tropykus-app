<template>
  <v-app class="app">
    <navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from '@/components/menu/Navbar.vue';
import * as constants from '@/store/constants';
import { mapActions } from 'vuex';

export default {
  name: 'App',
  methods: {
    ...mapActions({
      getUnitrollerAddress: constants.CONTRACT_GET_UNITROLLER_ADDRESS,
    }),
  },
  components: {
    Navbar,
  },
  async created() {
    this.getUnitrollerAddress();
  },
};
</script>
