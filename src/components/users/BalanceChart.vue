<template>
  <v-card class="container" color="#013E2F">
    <v-row class="ma-0 container">
      <v-col class="pa-0">
        <v-img class="px-2" src="@/assets/icons/dollar.svg" height="64" width="64"
               position="center center" contain/>
      </v-col>
      <v-col cols="9" class="pa-0">
        <v-row class="ma-0">
          <h2 class="boldie">{{ userCashUSD | formatPrice }} USD</h2>
        </v-row>
        <v-row class="ma-0">
          <p class="ma-0">Balance neto</p>
        </v-row>
      </v-col>
    </v-row>
    <v-divider color="#BEBEBE" />
    <div class="container">
      <v-row class="ma-0">
        <h3>Mis cryptos</h3>
      </v-row>
      <v-row class="ma-0">
        <GChart type="PieChart" :data="chartData" :options="chartOptions" />
      </v-row>
    </div>
  </v-card>
</template>

<script>
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
    };
  },
};
</script>
