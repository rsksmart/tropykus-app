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
          <p class="ma-0">{{ $t('balance.my-balance.title') }}</p>
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
    <div class="container d-flex justify-center align-center">
      <v-row class="ma-0">
        <v-col class="d-flex flex-column justify-center">
          <v-row>
            <h2 class="s1-popup">{{ $t('balance.balance-chart.title1') }}</h2>
            <div v-for="(item, index) in balanceInfo" :key="index">
              <div v-if="item.balance !== 0" class="d-flex">
                <div class="bullet-point mr-4 mb-2"
                  :style="{ backgroundColor: bulletColorBalance[index] }" />
                <p class="p1-descriptions">{{ item.symbol }}  |</p>
                <p class="p1-descriptions ml-2">{{ item.balance}}</p>
              </div>
            </div>
          </v-row>
          <v-row>
            <h2 class="s1-popup">{{ $t('balance.balance-chart.title2') }}</h2>
            <div v-for="(item, index) in balanceInfo" :key="index">
              <div v-if="item.borrow !== 0" class="d-flex">
                <div class="bullet-point mr-4 mb-2"
                  :style="{ backgroundColor: bulletColorBorrow[index] }" />
                <p class="p1-descriptions">{{ item.symbol }}  |</p>
                <p class="p1-descriptions ml-2">{{ item.borrow }}</p>
              </div>
            </div>
          </v-row>
        </v-col>
        <v-col>
          <GChart type="PieChart" :data="chartData" :options="chartOptions"/>
        </v-col>
      </v-row>
    </div>
  </v-card>
</template>

<script>
import {
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
        ['', 0],
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
          position: 'none',
          // alignment: 'center',
          // textStyle: { color: '#FFF' },
        },
      },
      comptroller: null,
      balanceInfo: [],
      tokenBorrowPrice: null,
      tokenSuppliedPrice: null,
    };
  },
  props: {
    markets: {
      type: Array,
      required: false,
    },
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
      chainId: (state) => state.Session.chainId,
    }),
    bulletColorBalance() {
      const bulletBalance = [
        '#368348',
        '#4CB163',
        '#6DCD83',
        '#C4DBC8',
      ];
      return bulletBalance;
    },
    bulletColorBorrow() {
      const bulletBorrow = [
        '#F66514',
        '#FF9153',
        '#FFBD98',
        '#F5D6C4',
      ];
      return bulletBorrow;
    },
  },
  methods: {
    async getData() {
      this.userCashUSD = await this.comptroller
        .totalBalanceInUSD(this.markets, this.walletAddress, this.chainId);
      this.userCashUSD = this.userCashUSD.toFixed(4);
    },
    async updateMarketInfo() {
      this.markets.forEach(async (market) => {
        const obj = {};
        obj.symbol = await market.underlyingAssetSymbol();
        obj.balance = await market
          .currentBalanceOfCTokenInUnderlying(this.walletAddress)
          * await market.underlyingCurrentPrice(this.chainId);
        obj.borrow = await market.borrowBalanceCurrent(this.walletAddress)
          * await market.underlyingCurrentPrice(this.chainId);
        this.balanceInfo.push(obj);
        this.chartData.push([obj.symbol, obj.balance]);
      });
    },
    updateChartData() {
      const tmpArray = [['Balance', 'Crypto']];
      this.balanceInfo.forEach((info) => {
        tmpArray.push([info.symbol, info.balance])
      });
      // this.chartData = ;
      
      // [
      //   ['Balance', 'Cryptos'],
      //   ['hola', 0.43],
      //   ['adios', 1890.3],
      //   ['funciona', 1.43],
      //   ['nomas', 30.3],
      // ];
      // Object.keys(this.balanceInfo).forEach((item) => {
      //   if (item.balance !== 0 || item.borrow !== 0) {
      //     console.log(item.balance);
      //     this.chartData = [
      //       ['Balance', 'Cryptos'],
      //       [item.symbol, item.balance],
      //       [item.symbol, item.borrow],
      //     ];
      //   }
      // });
      // Object.values(this.balanceInfo).forEach(item => {
      //   if (item.balance !== 0 || item.borrow !== 0) {
      //     console.log(item.balance);
      //     this.chartData = [
      //       ['Balance', 'Cryptos'],
      //       [item.symbol, item.balance],
      //       [item.symbol, item.borrow],
      //     ];
      //   }
      // });
      // for (const item of Object.values(this.balanceInfo)) {
      //   if (item.balance !== 0 || item.borrow !== 0) {
      //     this.chartData = [
      //       ['Balance', 'Cryptos'],
      //       [item.symbol, item.balance],
      //       [item.symbol, item.borrow],
      //     ];
      //   }
      // }
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getData();
    this.updateMarketInfo();
  },
};
</script>
