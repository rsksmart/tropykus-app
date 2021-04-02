<template>
  <v-app class="app">
    <navbar/>
    <router-view/>
  </v-app>
</template>

<script>
import Navbar from '@/components/menu/Navbar.vue';
import * as constants from '@/store/constants';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapState({
      unitrollerAddress: (state) => state.Contracts.unitrollerAddress,
    }),
  },
  methods: {
    ...mapActions({
      getUnitrollerAddress: constants.CONTRACT_GET_UNITROLLER_ADDRESS,
    }),
  },
  components: {
    Navbar,
  },
  created() {
    this.getUnitrollerAddress();
  },
};
</script>
