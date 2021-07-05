<template>
  <div class="home">
    <component :is="currentComponent" :inBorrowMenu="inBorrowMenu" :key="key" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Landing from '@/components/home/Landing.vue';
import UserHome from '@/components/home/UserHome.vue';
import * as constants from '@/store/constants';

export default {
  name: 'Borrow',
  data() {
    return {
      inBorrowMenu: true,
      key: 0,
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: constants.SESSION_IS_CONNECTED,
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
  },
};
</script>
