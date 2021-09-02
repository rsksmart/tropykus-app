<template>
  <div class="secondary-color borrow-deposit-view">
    <div class="d-flex flex-column align-center">
      <h2 class="h2-heading mb-7 text-primary">
        {{ $t('deposits.title') }}
      </h2>
      <p class="p1-descriptions text-info">
        {{ $t('deposits.description') }}
      </p>
    </div>
    <div class="d-flex justify-center actions-bottons">
      <v-btn
        class="btn mr-9"
        text
      >
        <span class="b1-main text-primary">
          {{ $t('deposits.btn1') }}
        </span>
      </v-btn>
      <v-btn
        class="btn btn-secondary"
        text
      >
        <span class="b1-main text-primary">
          {{ $t('deposits.btn2') }}
        </span>
      </v-btn>
    </div>

    <v-row class="ma-0">
      <p class="h3-sections-heading text-info">
        {{ $t('deposits.subtitle') }}
      </p>
    </v-row>

    <landing :inBorrowMenu="inBorrowMenu" :key="key"/>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import Landing from '@/components/home/Landing.vue';
// import UserHome from '@/components/home/UserHome.vue';
import * as constants from '@/store/constants';

export default {
  components: {
    Landing,
    // UserHome
  },
  data() {
    return {
      markets: [
        {
          id: 1,
          name: 'RBTC',
          img: 'https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/markets%2FRBTC.svg?alt=media&token=65f6dd30-5bcc-42c1-bbda-7795c64cccdd',
          percent: '4,1%',
          description: 'Tasa de interés anual dinámica actual',
        },
        {
          id: 2,
          name: 'USDT',
          img: 'https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/markets%2FrUSDT.svg?alt=media&token=3891051f-7e12-42ce-9c9a-d10aba745717',
          percent: '11,2%',
          description: 'Tasa de interés anual dinámica actual',
        },
        {
          id: 3,
          name: 'DOC',
          img: 'https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/markets%2FDOC.svg?alt=media&token=9e33e1d7-8631-47a6-8b34-02503cc438ae',
          percent: '10,21%',
          description: 'Tasa de interés anual dinámica actual',
        },
        {
          id: 4,
          name: 'RIF',
          img: 'https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/markets%2FRIF.svg?alt=media&token=f8bb86a4-2fa5-40d1-aec6-5aa402fcb067',
          percent: '1,4%',
          description: 'Tasa de interés anual dinámica actual',
        },
      ],
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
    // currentComponent() {
    //   return this.isLoggedIn ? 'UserHome' : 'Landing';
    // },
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
    if (this.routePath === '/es') {
      this.$i18n.locale = 'es';
    }
  },
};
</script>
