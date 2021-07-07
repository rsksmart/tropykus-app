<template>
  <div class="secondary-color borrow-deposit-view">
    <div class="d-flex flex-column align-center">
      <h2 class="h2-heading mb-7 text-primary">
        {{ $t('borrow.title') }}
      </h2>
      <p class="p1-descriptions text-info text-description">
        {{ $t('borrow.description') }}
      </p>
    </div>
    <div class="d-flex justify-center actions-bottons">
      <v-btn
        class="btn btn-secondary mr-9"
        text
      >
        <span class="b1-main">
          {{ $t('borrow.btn1') }}
        </span>
      </v-btn>
      <v-btn
        class="btn btn-primary"
        text
      >
        <span class="b1-main white--text">
          {{ $t('borrow.btn2') }}
        </span>
      </v-btn>
    </div>

    <v-row>
      <p class="h3-sections-heading text-info">
          {{ $t('borrow.subtitle') }}
      </p>
    </v-row>

    <landing :inBorrowMenu="inBorrowMenu" :key="key" />

  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Landing from '@/components/home/Landing.vue';
// import UserHome from '@/components/home/UserHome.vue';
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
    // currentComponent() {
    //   return this.isLoggedIn ? 'UserHome' : 'Landing';
    // },
  },
  components: {
    Landing,
    // UserHome
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
