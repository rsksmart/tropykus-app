<template>
  <div class="balance-cripto balance-style">
    <div class="chart d-flex justify-center">
      <img class="risk-img" src="@/assets/icons/dollar2.svg" />
      <!-- <div v-if="!walletAddress" class="risk cripto-chart">
        <v-progress-circular class="risk-graph" :size="125" :width="12" -->
          <!-- :value="0" color="transparent" :rotate="270" /> -->
      <!-- </div> -->
      <GChart class="cripto-chart" type="PieChart"
        :data="chartData" :options="chartOptions"/>
    </div>
    <div class="criptos">
      <div class="p6-reading-values">
        {{$t('balance.criptos.title')}}
      </div>
      <div class="criptos-detail d-flex justify-space-between">
        <div class="cripto-deposit">
          <div class="p1-descriptions mb-2">{{$t('balance.criptos.description1')}}</div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#095223" />
            <div class="p7-graphics ml-2">
              RBTC
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#47B25F" />
            <div class="p7-graphics ml-2">
              USDT
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#8AE39E" />
            <div class="p7-graphics ml-2">
              DOC
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#429A62" />
            <div class="p7-graphics ml-2">
              Otras
            </div>
          </div>
        </div>
        <div class="cripto-debts">
          <div class="p1-descriptions mb-2">{{$t('balance.criptos.description2')}}</div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#EEAF0E" />
            <div class="p7-graphics ml-2">
              RBTC
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#F7C61A" />
            <div class="p7-graphics ml-2">
              USDT
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#D5D77D" />
            <div class="p7-graphics ml-2">
              DOC
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#BCBE34" />
            <div class="p7-graphics ml-2">
              Otras
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  props: {
    chartInfo: {
      type: Array,
      require: true,
    },
  },
  data() {
    return {
      slices: [
        { color: '#095223' },
        { color: '#47B25F' },
        { color: '#8AE39E' },
        { color: '#429A62' },
        { color: '#EEAF0E' },
        { color: '#F7C61A' },
        { color: '#D5D77D' },
        { color: '#BCBE34' },
      ],
      chartData: [
        ['', '', ''],
        ['empty', 100, ''],
        // ['', 0, ''],
        // [`DOC | ${0.097869}`, 3, '#ABD1B4'],
        // [`Otras | ${0.097869}`, 3, '#ABD1B4'],
        // [`RBTC | ${0.097}`, 1, '#ABD1B4'],
        // [`USD | ${0.097869}`, 2, '#ABD1B4'],
        // [`DOC | ${0.097869}`, 3, '#ABD1B4'],
        // [`Otras | ${0.097869}`, 3, '#ABD1B4'],
      ],
      chartOptions: {
        pieHole: 0.78,
        chartArea: {
          top: 1,
          left: 1,
          width: '90%',
          height: '100%',
        },
        backgroundColor: 'transparent',
        pieSliceBorderColor: 'transparent',
        pieSliceText: 'none',
        // pieSliceText: 'label',
        // pieResidueSliceColor: '#CFC2AC',
        slices: [
          { color: '#D2E4D8' },
        ],
        legend: {
          position: 'none',
        },
      },
    };
  },
  watch: {
    chartInfo() {
      this.chartData = [['', '', ''], ...this.chartInfo];
      this.chartOptions.slices = this.slices;
      // this.chartData = this.chartInfo;
    },
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
    }),
  },
};
</script>
