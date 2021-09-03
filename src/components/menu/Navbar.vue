<template>
  <div class="d-flex justify-end navbar-vue">
    <template v-if="isWalletConnected">
      <v-card flat class="secondary-color rounded-card"
              v-bind:class="[chainId === 31 ? 'secondary-color' : 'warning-color']">
        <v-row class="ma-2">
          <v-col cols="auto" class="pa-0 d-flex justify-center align-center">
            <v-img alt="market icon" :src="avatarImage" :height="35" :width="35" contain/>
          </v-col>
          <v-col class="pa-0 mr-7 ml-2">
            <v-row class="ma-0">
              <div class="b2-secondary text-detail">
                {{ accountCutOff }}
              </div>
            </v-row>
            <v-row class="ma-0">
              <div class="b2-secondary text-detail">
                {{ chainId === 31 ? network : $t('menu.navbar.network') }}
              </div>
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
              <v-tooltip bottom color="#CFE7DA">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn @click="disconnectAccount" color="#196635" rounded
                         outlined width="200" v-bind="attrs" v-on="on">
                    <span class="b2-secondary text-detail">
                      {{ $t('menu.navbar.disconnect') }}
                    </span>
                  </v-btn>
                </template>
                <span class="p1-descriptions text-info">
                  {{ $t('menu.navbar.warning1') }} <br> {{ $t('menu.navbar.warning2') }}
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

import { Market, CRbtc, CToken } from '@/middleware';
import Avatar from '@/assets/avatar.svg';
import Error from '@/assets/icons/error.svg';
import * as constants from '@/store/constants';
import RLogin from '@rsksmart/rlogin';

import WalletConnectProvider from '@walletconnect/web3-provider';
import Portis from '@portis/web3';

export default {
  components: {
    ConnectWallet,
  },
  data() {
    return {
      db: this.$firebase.firestore(),
      showModalConnectWallet: false,
      markets: [],
      rLogin: new RLogin({
        cacheProvider: false,
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              rpc: {
                30: 'https://public-node.rsk.co',
                31: 'https://public-node.testnet.rsk.co',
              },
            },
          },
          portis: {
            package: Portis,
            options: {
              id: '34616571-d57b-4805-868b-2dcc7b7662d7',
              network: {
                nodeUrl: 'https://public-node.testnet.rsk.co',
                chainId: 31,
              },
            },
          },
        },
        supportedChains: [30, 31],
      }),
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
    avatarSize() {
      return this.chainId === 31 ? 35 : 20;
    },
    avatarImage() {
      return this.chainId === 31 ? Avatar : Error;
    },
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
    networkColor() {
      return this.chainId === 31 ? 'transparent' : '#FCDE73';
    },
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
      connectToWeb3: constants.SESSION_CONNECT_WEB3,
    }),

    outsideConnectWallet() {
      this.showModalConnectWallet = false;
    },

    showDialogConnectWallet() {
      this.rLogin
        .connect() // shows rLogin modal
        .then(({ provider }) => this.connectToWeb3(provider));
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
