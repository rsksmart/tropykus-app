<template>
<div class="balance">
  <template v-if="isLoggedIn">
    <template>
      <v-container class="mt-8 container">
        <div class="container" style="width: 1627px;">
          <v-row class="mx-0 pl-3">
            <h3 class="text-left h3-sections-heading">{{ $t('balance.title') }}</h3>
          </v-row>
          <v-row class="ma-auto mb-16">
            <v-col cols="5" class="pa-0 mt-10">
              <v-row class="ma-0">
                <balance-chart @success="forceReload" :key="key"  />
              </v-row>
            </v-col>
            <v-col cols="7" class="pa-0">
              <v-row class="ma-0">
                <my-balance />
              </v-row>
              <v-row class="ma-0 mt-4">
                <risk-chart :riskRate="riskValue" :inBalance="inBalance"
                  :percentageBalance="percentageBalance" :typeChart="'balance'"
                   @success="forceReload" :key="key"/>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="ma-auto mb-8">
            <v-row class="ma-auto mb-5 pl-3">
              <h3 class="text-left h3-sections-heading">{{ $t('market.my-deposits.title') }}</h3>
            </v-row>
            <debt-savings-balance :inBorrowMenu="false"  @success="forceReload" :key="key"/>
          </v-row>
          <v-row class="ma-auto">
            <v-row class="ma-auto mb-5 pl-3">
              <h3 class="text-left h3-sections-heading">{{ $t('market.my-debts.title') }}</h3>
            </v-row>
            <debt-savings-balance :inBorrowMenu="true" @success="forceReload" :key="key"/>
          </v-row>
        </div>
        <!-- MI ACTIVIDAD -->
        <!-- <div class="container mt-16" style="width: 1627px;">
          <v-row class="mx-0 pl-3">
            <h3 class="text-left h3-sections-heading">{{ $t('balance.subtitle4') }}</h3>
          </v-row>
          <v-row class="pl-3 mt-4" style="width: 1584px;">
            tabla
            <v-simple-table class="mt-2">
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">
                    Crypto
                  </th>
                  <th class="text-left">
                    Actividad
                  </th>
                  <th class="text-left">
                    Monto
                  </th>
                  <th class="text-left">
                    Fecha
                  </th>
                  <th class="text-left">
                    Hash de la transacción
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in tokens" :key="item.hash">
                  <td>{{ item.crypto }}</td>
                  <td class="td-type">{{ item.type }}</td>
                  <td>{{ item.amount }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ item.hash }}</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
            NO HAY DEPOSITOS REALIZADOS
            <v-card class="container d-flex flex-column align-center" color="#013E2F"
              height="493">
              <v-img class="mx-2" src="@/assets/rana.svg" width="275" height="251"
                position="center center" contain/>
              <h3>{{ $t('balance.my-activity.title') }}</h3>
              <v-btn width="340" color="#4CB163">
                <span class="b1-main">{{ $t('balance.my-activity.button') }}</span>
              </v-btn>
            </v-card>
          </v-row>
        </div> -->
      </v-container>
    </template>
  </template>
  <template v-if="walletDialog">
    <connect-wallet :showModal="walletDialog" @closed="walletDialog = false"/>
  </template>
</div>
</template>

<script>
import MyBalance from '@/components/users/MyBalance.vue';
import BalanceChart from '@/components/users/BalanceChart.vue';
import RiskChart from '@/components/users/RiskChart.vue';
import DebtSavingsBalance from '@/components/market/DebtSavingsBalance.vue';
import {
  Comptroller,
  Market,
  CRbtc,
  CToken,
} from '@/middleware';
import { mapGetters, mapState, mapActions } from 'vuex';
import * as constants from '@/store/constants';

export default {
  name: 'Balance',
  data() {
    return {
      walletDialog: false,
      loadingTest: false,
      inBalance: true,
      riskValue: 100,
      marketAddresses: [],
      markets: [],
      percentageBalance: 0,
      key: 0,
      tokens: [
        {
          type: 'Ahorrar',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x00',
        },
        {
          type: 'Pago de rendimiento',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x01',
        },
        {
          type: 'Pedir prestado',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x02',
        },
        {
          type: 'Pedir prestado',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x03',
        },
        {
          type: 'Pedir prestado',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x04',
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      isLoggedIn: constants.SESSION_IS_CONNECTED,
    }),
    ...mapState({
      chainId: (state) => state.Session.chainId,
      address: (state) => state.Session.walletAddress,
    }),
    loadingBalance() {
      return this.riskValue === null;
    },
    balanceLoaded() {
      return this.getData();
    },
  },
  components: {
    MyBalance,
    BalanceChart,
    RiskChart,
    DebtSavingsBalance,
  },
  methods: {
    ...mapActions({
      addMarkets: constants.SESSION_ADD_MARKETS,
    }),
    forceReload() {
      this.key += 1;
    },
    async load() {
      this.marketAddresses = await this.comptroller.allMarkets;
      this.marketAddresses.forEach(async (marketAddress) => {
        const isCRbtc = await Market.isCRbtc(marketAddress);
        const market = isCRbtc ? new CRbtc(marketAddress, this.chainId)
          : new CToken(marketAddress, this.chainId);
        this.markets.push(market);
        if (this.markets.length === this.marketAddresses.length) {
          await this.addMarkets(this.markets);
          await this.getData();
        }
      });
    },
    async getData() {
      this.riskValue = await this.comptroller
        .healthFactor(this.markets, this.chainId,
          this.address) * 100;
      this.percentageBalance = Math.round(100 - this.riskValue);
      return this.percentageBalance;
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.load();
  },
};
</script>
