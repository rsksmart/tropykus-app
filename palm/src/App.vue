<template>
  <v-app class="app">
    <navbar/>
    <router-view/>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';
import Navbar from '@/components/menu/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
    }),
  },
  watch: {
    chainId(val) {
      if (val) {
        this.$forceUpdate();
      }
    },
  },
  created() {
    if (window.ethereum) {
      console.log('Is connected??', window.ethereum.isConnected());
    }
  },
};
</script>
