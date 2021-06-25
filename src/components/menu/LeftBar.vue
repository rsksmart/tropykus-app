<template>
  <div class="left-bar">
    <v-row class="ma-0 mt-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <!-- <v-btn @click="redirectBalance()" width="50" -->
          <v-btn @click="redirect(constants.ROUTE_NAMES.BALANCE); redirectBalance()" width="50"
                 v-bind:class="{ selected: views.inBalance }"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/home.svg"/>
          </v-btn>
        </template>
        <span>{{ $t('menu.sidebar.balance') }}</span>
      </v-tooltip>
    </v-row>
    <v-row class="ma-0 mt-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="redirect(constants.ROUTE_NAMES.SAVINGS)" width="50"
                 v-bind:class="{ selected: views.inSavings }"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/pig.svg"/>
          </v-btn>
        </template>
        <span>{{ $t('menu.sidebar.deposit') }}</span>
      </v-tooltip>
    </v-row>
    <v-row class="mx-0 my-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="redirect(constants.ROUTE_NAMES.DEBTS)" width="50"
                 v-bind:class="{ selected: views.inDebts }"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/borrow.svg"/>
          </v-btn>
        </template>
        <span>{{ $t('menu.sidebar.loan') }}</span>
      </v-tooltip>
    </v-row>
    <v-row class="ma-0 mb-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="redirect(constants.ROUTE_NAMES.TUTORIALS)" width="50"
                 v-bind:class="{ selected: views.inTutorials }" color="transparent"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="25" src="@/assets/icons/tutorials.svg"/>
          </v-btn>
        </template>
        <span>{{ $t('menu.sidebar.tutorial') }}</span>
      </v-tooltip>
    </v-row>
    <v-row class="ma-0 mb-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="redirect(constants.ROUTE_NAMES.OVERVIEW)" width="50"
                 v-bind:class="{ selected: views.inOverview }"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="25" src="@/assets/icons/markets.svg"/>
          </v-btn>
        </template>
        <span>{{ $t('menu.sidebar.markets') }}</span>
      </v-tooltip>
    </v-row>
    <div class="custom-spacer"/>
    <v-row class="ma-0 mb-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="changeLanguage" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <h1>{{ lang }}</h1>
          </v-btn>
        </template>
        <span>{{ $t('menu.sidebar.language') }}</span>
      </v-tooltip>
    </v-row>
    <v-divider class="mx-2 mx-2" color="#BEBEBE"/>
    <v-row class="ma-0 mt-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn href="https://github.com/TruStartUp/tropykus-protocol"
                 target="_blank" rel="noopener" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/github.svg"/>
          </v-btn>
        </template>
        <span>{{ $t('menu.sidebar.github') }}</span>
      </v-tooltip>
    </v-row>
    <v-row class="ma-0 my-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn href="https://twitter.com/tropykus"
                 target="_blank" rel="noopener" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/twitter.svg"/>
          </v-btn>
        </template>
        <span>Twitter</span>
      </v-tooltip>
    </v-row>
    <v-row class="ma-0 mb-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn href="https://t.me/tropykus"
                 target="_blank" rel="noopener" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/telegram.svg"/>
          </v-btn>
        </template>
        <span>Telegram</span>
      </v-tooltip>
    </v-row>
    <template v-if="walletDialog">
      <connect-wallet :showModal="walletDialog" @closed="walletDialog = false"/>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex';
import * as constants from '@/store/constants';
import ConnectWallet from '@/components/dialog/ConnectWallet.vue';

export default {
  name: 'LeftBar',
  data() {
    return {
      constants,
      walletDialog: false,
      views: {
        inBalance: false,
        inSavings: false,
        inDebts: false,
        inTutorials: false,
        inOverview: false,
      },
    };
  },
  components: {
    ConnectWallet,
  },
  computed: {
    ...mapGetters({
      isLoggedIn: constants.SESSION_IS_CONNECTED,
    }),
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
    }),
    lang() {
      return this.$i18n.locale === 'en' ? 'ES' : 'EN';
    },
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
    reset() {
      this.walletDialog = false;
      this.views.inBalance = false;
      this.views.inSavings = false;
      this.views.inDebts = false;
      this.views.inTutorials = false;
      this.views.inOverview = false;
    },
    highlightRoute(routePath) {
      switch (routePath) {
        case constants.ROUTE_NAMES.BALANCE:
          this.views.inBalance = true;
          break;
        case constants.ROUTE_NAMES.SAVINGS:
          this.views.inSavings = true;
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
          this.views.inSavings = true;
          break;
      }
    },
    redirect(routePath) {
      this.reset();
      this.highlightRoute(routePath);
      this.$router.push({ name: routePath });
    },
    redirectBalance() {
      if (this.isLoggedIn) {
        this.$router.push({ name: constants.ROUTE_NAMES.BALANCE});
      } else {
        this.walletDialog = true
        this.highlightRoute(constants.ROUTE_NAMES.BALANCE);
        // this.$forceUpdate();
        // this.$router.push({ name: constants.ROUTE_NAMES.BALANCE})
      }
    }
  },
  watch: {
    walletAddress() {
      if (this.walletAddress) return 'UserHome';
      return 'Home';
    },
    // isLoggedIn() {
    //   if (this.walletDialog) this.$router.push({ name: constants.ROUTE_NAMES.BALANCE});
      
    // }
  },
  // created() {
  //   if (!this.isLoggedIn) {
  //     this.walletDialog = true;
  //   }
  // }
};
</script>
