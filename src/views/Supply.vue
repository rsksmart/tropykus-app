<template>
  <div class="home">
    <component :is="currentComponent" :inBorrowMenu="inBorrowMenu" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Landing from '@/components/home/Landing.vue';
import UserHome from '@/components/home/UserHome.vue';
import * as constants from '@/store/constants';

export default {
  name: 'Supply',
  data() {
    return {
      inBorrowMenu: false,
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
};
</script>
