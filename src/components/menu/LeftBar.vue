<template>
  <div class="left-bar">
    <v-navigation-drawer class="primary-color pl-3 left-bar-content"
      absolute permanent
      mobile-breakpoint="960"
      >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <img class="mr-4 logo-tropykus"
              src="@/assets/icons/tropykus.svg"
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
          <router-link :to="{name: constants.ROUTE_NAMES.DEPOSITS}"
            class="d-flex align-center active">
            <img class="ml-4 mr-5" src="@/assets/icons/home.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.deposit') }}</div>
          </router-link>
        </v-list-item>

        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <router-link :to="{name: constants.ROUTE_NAMES.BALANCE}"
            class="d-flex align-center">
            <img class="ml-4 mr-5" src="@/assets/icons/dollar.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.balance') }}</div>
          </router-link>
        </v-list-item>

        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <router-link :to="{name: constants.ROUTE_NAMES.BORROWS}"
            class="d-flex align-center active">
            <img class="ml-4 mr-5" src="@/assets/icons/borrow.svg"/>
            <div class="white--text b2-secondary">{{ $t('menu.sidebar.borrow') }}</div>
          </router-link>
        </v-list-item>

        <v-list-item class="left-list-item pa-0 ml-1" @click="() => null">
          <router-link :to="{name: 'ShowDialog'}"
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
            <img class="ml-4 mr-5" src="@/assets/icons/protocol.svg"/>
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

        <div class="d-flex pl-6 price-btc">
          <img src="https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/markets%2FRBTC.svg?alt=media&token=65f6dd30-5bcc-42c1-bbda-7795c64cccdd" />
          <div class="ml-4 d-flex">
            <div class="p3-USD-values white--text align-self-center">$54.000 USD</div>
          </div>
        </div>

        <div class="d-flex justify-space-between contact-tropykus">
            <v-img contain height="43" src="@/assets/icons/github.svg"/>
            <v-img contain height="43" src="@/assets/icons/twitter.svg"/>
            <v-img contain height="43" src="@/assets/icons/telegram.svg"/>
        </div>

    </v-navigation-drawer>

  </div>
</template>
<script>
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
  },
  created() {
    console.log(this.drawer);
  },
  methods: {
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
  },
  watch: {
    setGroupDrawer() {
      if (window.innerWidth <= 768) {
        this.setDrawer(false);
        this.showDrawer = false;
      } else {
        this.showDrawer = true;
        this.setDrawer(true);
      }
    },
  },
};
</script>
