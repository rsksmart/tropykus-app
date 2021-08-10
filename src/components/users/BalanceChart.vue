<template>
  <v-card class="container" color="#013E2F" style="padding:30px;" height="496">
    <v-row class="ma-0 container">
      <v-col class="pa-0">
        <v-img class="px-2" src="@/assets/icons/dollar.svg" height="64" width="64"
               position="center center" contain/>
      </v-col>
      <v-col cols="8" class="pa-0">
        <v-row class="ma-0">
          <h2 class="boldie">{{ userCashUSD }} USD</h2>
        </v-row>
        <v-row class="ma-0">
          <p class="ma-0">Balance neto</p>
        </v-row>
      </v-col>
      <v-col>
        <v-tooltip right max-width="178">
          <template v-slot:activator="{ on, attrs }">
            <v-icon class="align-start ml-4 mt-1" small color="#FFFFFF"
                    v-bind="attrs" v-on="on">
              mdi-information
            </v-icon>
          </template>
          <span class="p5-feedback">
            {{ $t('balance.tooltip1') }}
          </span>
        </v-tooltip>
      </v-col>
    </v-row>
    <v-divider color="#BEBEBE"/>
    <div class="container">
      <v-col cols="6">

      </v-col>
      <v-col cols="6">
        <v-row class="ma-0">
          <h3>Depósitos</h3>
        </v-row>
        <v-row>
          <h3>Deudas</h3>
        </v-row>
      </v-col>
      <v-row class="ma-0">
        <GChart type="PieChart" :data="chartData" :options="chartOptions"/>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import {
  CRbtc,
  CToken,
  Market,
  Comptroller,
} from '@/middleware';
import { mapState } from 'vuex';

export default {
  name: 'BalanceChart',
  data() {
    return {
      userCashUSD: 0,
      chartData: [
        ['Balance', 'Cryptos'],
        [`RBTC | ${0.097}`, 0.097869],
        [`BPRO | ${0.097869}`, 0.0978698],
        [`DOC | ${0.0978698}`, 0.0978698],
        [`BTCx | ${0.978698}`, 0.978698],
      ],
      chartOptions: {
        pieHole: 0.7,
        chartArea: {
          top: 1,
          left: 1,
          width: '90%',
          height: '100%',
        },
        backgroundColor: 'transparent',
        pieSliceBorderColor: 'transparent',
        pieSliceText: 'none',
        pieSliceTextStyle: {
          color: 'black',
        },
        pieResidueSliceColor: '#CFC2AC',
        slices: [
          { color: '#E65D3D' },
          { color: '#DBD332' },
          { color: '#4CB163' },
          { color: '#FF9153' },
        ],
        legend: {
          position: 'left',
          alignment: 'center',
          textStyle: { color: '#FFF' },
        },
      },
      comptroller: null,
      marketAddresses: [],
      markets: [],
    };
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
      chainId: (state) => state.Session.chainId,
    }),
  },
  methods: {
    async getMarkets() {
      return new Promise((resolve, reject) => {
        let counter = 0;
        this.marketAddresses.forEach(async (marketAddress) => {
          await Market.isCRbtc(marketAddress)
            .then((isCRbtc) => {
              counter += 1;
              if (isCRbtc) {
                this.markets.push(new CRbtc(marketAddress, this.chainId));
              } else {
                this.markets.push(new CToken(marketAddress, this.chainId));
              }
              if (counter === this.marketAddresses.length) resolve(this.markets);
            })
            .catch(reject);
        });
      });
    },
    async getData() {
      this.marketAddresses = await this.comptroller.allMarkets();
      await this.getMarkets();
      this.userCashUSD = await this.comptroller
        .totalBalanceInUSD(this.markets, this.walletAddress, this.chainId);
      this.userCashUSD = this.userCashUSD.toFixed(4);
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getData();
  },
};
</script>
