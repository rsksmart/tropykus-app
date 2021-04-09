<template>
  <div class="home">
    <div class="container">
      <v-row class="my-5 d-flex justify-center">
        <h1 class="text-center">Saca rendimiento de tus Bitcoins</h1>
      </v-row>
      <v-row class="d-flex justify-center">
        <v-col cols="6" class="button d-flex justify-end">
          <v-btn depressed color="rgba(1, 62, 47, 1)" @click="inBorrowMenu = false"
                 :class="{'menu-selected': !inBorrowMenu}">
            Ahorrar
          </v-btn>
        </v-col>
        <v-col cols="6" class="button d-flex justify-start">
          <v-btn depressed color="rgba(1, 62, 47, 1)" @click="inBorrowMenu = true"
                 :class="{'menu-selected': inBorrowMenu}">
            Pedir prestado
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <component :is="currentComponent" :inBorrowMenu="inBorrowMenu" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Landing from '@/components/home/Landing.vue';
import UserHome from '@/components/home/UserHome.vue';
import * as constants from '@/store/constants';

export default {
  name: 'Home',
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
