<template>
  <div class="left-bar">
    <v-navigation-drawer class="primary-color pl-3 left-bar-content"
      absolute permanent
      >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 d-flex justify-center">
            <v-img
              class="mr-4 logo-tropykus"
              width="165"
              height="39"
              src="@/assets/icons/tropykus.svg"
              contain
            />
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list class="list-left-bar" dense nav
        >
        <!-- <v-list-item-group
          v-model="setGroupDrawer"
        > -->
        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <router-link :to="{name: constants.ROUTE_NAMES.BALANCE}"
            class="d-flex align-center">
            <img class="ml-4 mr-5" src="@/assets/icons/home.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.balance') }}</div>
          </router-link>
        </v-list-item>

        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <router-link :to="{name: constants.ROUTE_NAMES.DEPOSITS}"
            class="d-flex align-center">
            <img class="ml-4 mr-5" src="@/assets/icons/pig.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.deposit') }}</div>
          </router-link>
        </v-list-item>

        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <router-link :to="{name: constants.ROUTE_NAMES.BORROW}"
            class="d-flex align-center">
            <img class="ml-4 mr-5" src="@/assets/icons/borrow.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.borrow') }}</div>
          </router-link>
        </v-list-item>

        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <router-link :to="{name: constants.ROUTE_NAMES.EXCHANGES}"
            class="d-flex align-center">
            <img class="ml-4 mr-5" src="@/assets/icons/exchanges.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.exchanges') }}</div>
          </router-link>
        </v-list-item>

        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <router-link :to="{name: constants.ROUTE_NAMES.SCHOOL}"
            class="d-flex align-center">
            <img class="ml-4 mr-5" src="@/assets/icons/tutorials.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.school') }}</div>
          </router-link>
        </v-list-item>

        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <router-link :to="{name: constants.ROUTE_NAMES.MARKETS}"
            class="d-flex align-center">
            <img class="ml-4 mr-5" src="@/assets/icons/markets.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.markets') }}</div>
          </router-link>
        </v-list-item>

        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <router-link :to="{name: constants.ROUTE_NAMES.PROTOCOL}"
            class="d-flex align-center">
            <img class="ml-4 mr-5" src="@/assets/icons/info.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.protocol') }}</div>
          </router-link>
        </v-list-item>

        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <v-btn block class="btn-primary d-flex justify-start pa-0" @click="changeLanguage"
           width="50" height="48" depressed>
            <img class="ml-4 mr-5" src="@/assets/icons/idiom.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.language') }}</div>
          </v-btn>
        </v-list-item>

        <!-- </v-list-item-group> -->

        </v-list>

        <v-divider class="divider"></v-divider>

        <div class="d-flex pl-10 price-btc">
          <img src="https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/markets%2FRBTC.svg?alt=media&token=65f6dd30-5bcc-42c1-bbda-7795c64cccdd" />
          <div class="ml-4">
            <div class="b1-main white--text">RBTC</div>
            <div class="p3-USD-values white--text">$54.000 USD</div>
          </div>
        </div>

        <div class="mx-5 d-flex justify-space-between contact-tropykus">
            <v-img contain height="43" src="@/assets/icons/github.svg"/>
            <v-img contain height="43" src="@/assets/icons/twitter.svg"/>
            <v-img contain height="43" src="@/assets/icons/telegram.svg"/>
        </div>

    </v-navigation-drawer>

  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'LeftBar',
  data() {
    return {
      constants,
      setGroupDrawer: null,
      showDrawer: true,
      views: {
        inBalance: false,
        inDeposit: false,
        inDebts: false,
        inTutorials: false,
        inOverview: false,
      },
    };
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
    }),
    lang() {
      return this.$i18n.locale === 'en' ? 'ES' : 'EN';
    },
  },
  created() {
    console.log(this.drawer);
  },
  methods: {
    ...mapActions({
      setDrawer: constants.SESSION_DRAWER,
    }),
    changeLanguage() {
      if (this.$i18n.locale === 'es') {
        this.$i18n.locale = 'en';
        this.lang = 'ES';
      } else {
        this.$i18n.locale = 'es';
        this.lang = 'EN';
      }
    },
    getSymbolImg() {
      this.db
        .collection('markets-symbols')
        .doc(this.info.symbol)
        .get()
        .then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
    },
    reset() {
      this.views.inBalance = false;
      this.views.inDeposit = false;
      this.views.inDebts = false;
      this.views.inTutorials = false;
      this.views.inOverview = false;
    },
    highlightRoute(routePath) {
      switch (routePath) {
        case constants.ROUTE_NAMES.BALANCE:
          this.views.inBalance = true;
          break;
        case constants.ROUTE_NAMES.DEPOSITS:
          this.views.inDeposits = true;
          break;
        case constants.ROUTE_NAMES.DEBTS:
          this.views.inDebts = true;
          break;
        case constants.ROUTE_NAMES.TUTORIALS:
          this.views.inTutorials = true;
          break;
        case constants.ROUTE_NAMES.OVERVIEW:
          this.views.inOverview = true;
          break;
        default:
          this.views.inDeposits = true;
          break;
      }
    },
    redirect(routePath) {
      console.log('page', routePath);
      this.reset();
      this.highlightRoute(routePath);
      this.$router.push({ name: routePath });
    },
  },
  watch: {
    walletAddress() {
      if (this.walletAddress) return 'UserHome';
      return 'Home';
    },
    setGroupDrawer() {
      if (window.innerWidth <= 768) {
        this.setDrawer(false);
        console.log(window.innerWidth, 'hey');
        this.showDrawer = false;
      } else {
        this.showDrawer = true;
        this.setDrawer(true);
      }
    },
  },
};
</script>
