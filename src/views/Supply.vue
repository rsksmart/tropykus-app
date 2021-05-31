<template>
  <div class="home">
    <component :is="currentComponent" :inBorrowMenu="inBorrowMenu" :key="key" />
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Landing from '@/components/home/Landing.vue';
import UserHome from '@/components/home/UserHome.vue';
import * as constants from '@/store/constants';

export default {
  name: 'Supply',
  data() {
    return {
      inBorrowMenu: false,
      key: 0,
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: constants.SESSION_IS_CONNECTED,
    }),
    ...mapState({
      routePath: (state) => state.route.path,
    }),
    currentComponent() {
      return this.isLoggedIn ? 'UserHome' : 'Landing';
    },
  },
  components: {
    Landing,
    UserHome,
  },
  created() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', () => {
        this.key += 1;
      });
      window.ethereum.on('chainChanged', () => {
        this.key += 1;
      });
    }
    if (this.routePath === '/en') {
      this.$i18n.locale = 'en';
    }
  },
};
</script>
