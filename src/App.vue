<template>
  <v-app class="app">
    <navbar />
    <router-view />
  </v-app>
</template>

<script>
import { Unitroller } from '@/middleware';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  data() {
    return {
      comptrollerAddress: null,
    };
  },
  components: {
    Navbar,
  },
  async created() {
    const unitroller = new Unitroller('0x0165878A594ca255338adfa4d48449f69242Eb8F');
    this.comptrollerAddress = await unitroller.comptrollerImplementation;
  },
};
</script>
