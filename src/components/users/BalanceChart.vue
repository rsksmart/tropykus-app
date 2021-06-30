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
    <div class="container d-flex justify-center align-center" style="
      height: 83%;">
      <v-row class="ma-0">
        <v-col class="d-flex flex-column justify-center" style="
          width: 50%;">
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
          <v-row class="d-flex flex-column justify-space-around">
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
        <v-col style="width: 50%;">
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
        ['', 0],
        ['', 0],
        ['', 0],
        ['', 0],
        ['', 0],
        ['', 0],
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
          { color: '#368348' },
          { color: '#4CB163' },
          { color: '#6DCD83' },
          { color: '#C4DBC8' },
          { color: '#F66514' },
          { color: '#FF9153' },
          { color: '#FFBD98' },
          { color: '#F5D6C4' },
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
  computed: {
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
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
      chainId: (state) => state.Session.chainId,
      markets: (state) => state.Session.markets,
    }),
  },
  methods: {
    async getData() {
      this.userCashUSD = await this.comptroller
        .totalBalanceInUSD(this.markets, this.walletAddress, this.chainId);
      this.userCashUSD = this.userCashUSD.toFixed(4);
    },
    async updateMarketInfo() {
      let depositsCount = 1;
      let debtsCount = 5;
      const temp = [...this.chartData];
      // eslint-disable-next-line
      for await (const market of this.markets){
        const obj = {};
        obj.symbol = await market.underlyingAssetSymbol();
        obj.balance = await market
          .currentBalanceOfCTokenInUnderlying(this.walletAddress)
          * await market.underlyingCurrentPrice(this.chainId);
        obj.borrow = await market.borrowBalanceCurrent(this.walletAddress)
          * await market.underlyingCurrentPrice(this.chainId);
        if (obj.balance > 0) {
          temp[depositsCount] = [`${this
            .$t('balance.balance-chart.title1')} ${obj.symbol}`, obj.balance];
          depositsCount += 1;
        }
        if (obj.borrow > 0) {
          temp[debtsCount] = [`${this
            .$t('balance.balance-chart.title2')} ${obj.symbol}`, obj.borrow];
          debtsCount += 1;
        }
        this.balanceInfo.push(obj);
      }
      this.chartData = temp;
    },
  },
  watch: {
    chartData() {
      this.getData();
    },
    markets() {
      this.getData();
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getData();
    this.updateMarketInfo();
  },
};
</script>
