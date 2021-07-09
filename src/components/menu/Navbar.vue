<template>
  <div class="d-flex justify-end navbar-vue">
    <!-- <v-app-bar-nav-icon app class="ml-10" @click="setDrawer(true)"></v-app-bar-nav-icon> -->
    <!-- <v-app-bar-nav-icon class="ml-10" @click="setDrawer(false)"></v-app-bar-nav-icon> -->

    <template v-if="isWalletConnected">
      <v-card flat class="secondary-color">
        <v-row class="ma-0">
          <v-col cols="auto" class="pa-0">
            <v-img alt="market icon" src="@/assets/avatar.svg" height="35" width="35" contain/>
          </v-col>
          <v-col class="pa-0 mr-7 ml-4">
            <v-row class="ma-0">
              <div class="b2-secondary text-detail">{{ accountCutOff }}</div>
            </v-row>
            <v-row class="ma-0">
              <div class="b2-secondary text-detail">{{ network }}</div>
            </v-row>
          </v-col>
          <v-col class="pa-0">
            <template v-if="chainId === 31">
              <v-btn text class="btn btn-info" @click="disconnectAccount">
                <span class="b1-main text-detail">
                  {{ buttonLabel }}
                </span>
              </v-btn>
            </template>
            <template v-else>
              <v-tooltip bottom color="#52826E">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click="disconnectAccount" height="45" color="#FFF"
                         outlined width="200" v-bind="attrs" v-on="on">
                    Red incorrecta
                  </v-btn>
                </template>
                <span>
                Asegurate de tener tu billetera<br>conectada a la red RSK.
              </span>
              </v-tooltip>
            </template>
          </v-col>
        </v-row>
      </v-card>
    </template>
    <template v-else>
      <v-btn text @click="showDialogConnectWallet" class="btn btn-primary">
        <span class="b1-main white--text">
          {{ buttonLabel }}
        </span>
      </v-btn>
    </template>
    <template v-if="showModalConnectWallet">
      <connect-wallet
        :showModal="showModalConnectWallet"
        @closed="outsideConnectWallet"
      />
    </template>
  </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import ConnectWallet from '@/components/dialog/ConnectWallet.vue';
import { Market, CRbtc, CToken } from '@/middleware';
import * as constants from '@/store/constants';

export default {
  components: {
    ConnectWallet,
  },
  data() {
    return {
      db: this.$firebase.firestore(),
      showModalConnectWallet: false,
      markets: [],
    };
  },
  watch: {
    marketAddresses() {
      this.marketAddresses.forEach(async (marketAddress) => {
        await this.loadMarketInfo(marketAddress);
      });
    },
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
      wallet: (state) => state.Session.wallet,
      routePath: (state) => state.route.path,
      chainId: (state) => state.Session.chainId,
    }),
    buttonLabel() {
      if (this.chainId === 31 && typeof this
        .walletAddress === 'string') return this.$t('menu.navbar.disconnect');
      if (typeof this.walletAddress !== 'string') return this.$t('menu.navbar.connect');
      return '';
    },
    accountCutOff() {
      return `${this.walletAddress.substr(0, 6)}..${this.walletAddress.substr(-2)}`;
    },
    network() {
      if (this.chainId === 31) return 'Testnet';
      if (this.chainId === 30) return 'Mainnet';
      return '';
    },
    // networkColor() {
    //   return this.chainId === 31 ? '#074335' : '#E55E3C';
    // },
    isWalletConnected() {
      return !!this.walletAddress;
    },
    isTutorial() {
      return this.routePath.substr(1, 10) === 'tutorials/';
    },
  },
  methods: {
    ...mapActions({
      setDrawer: constants.SESSION_DRAWER,
      disconnectWallet: constants.SESSION_DISCONNECT_WALLET,
    }),
    outsideConnectWallet() {
      this.showModalConnectWallet = false;
    },
    showDialogConnectWallet() {
      if (!this.isWalletConnected) this.showModalConnectWallet = true;
    },
    disconnectAccount() {
      this.disconnectWallet();
    },
    async loadMarketInfo(marketAddress) {
      await Market.isCRbtc(marketAddress)
        .then((isCRbtc) => (isCRbtc ? new CRbtc(marketAddress, this.chainId)
          : new CToken(marketAddress, this.chainId)))
        .then(async (market) => {
          const symbol = await market.underlyingAssetSymbol();
          const price = await market.underlyingCurrentPrice(this.chainId);
          const data = {
            symbol,
            price: symbol === constants.RBTC_SYMBOL ? Math.round(price).toLocaleString('es') : price
              .toLocaleString('es', { minimumFractionDigits: 2, maximumFractionDigits: 2 }),
            img: await this.db
              .collection('markets-symbols')
              .doc(symbol)
              .get()
              .then((response) => response.data().imageURL),
          };
          this.markets.push(data);
        });
    },
  },
};
</script>
