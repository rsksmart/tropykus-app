<template>
  <div>
    <v-row class="d-flex justify-end mr-1">
      <div class="toggle-tb d-flex align-center b2-secondary">
        <v-btn text :class="[period === constants.PERIOD_WEEK ? 'selected' : 'notSelected']"
               @click="getChartData(constants.PERIOD_WEEK)">
          1W
        </v-btn>
        <v-btn text :class="[period === constants.PERIOD_TWO_WEEKS ? 'selected' : 'notSelected']"
               @click="getChartData(constants.PERIOD_TWO_WEEKS)">
          2W
        </v-btn>
        <v-btn text :class="[period === constants.PERIOD_MONTH ? 'selected' : 'notSelected']"
               @click="getChartData(constants.PERIOD_MONTH)">
          1M
        </v-btn>
        <v-btn text :class="[period === constants.PERIOD_YEAR ? 'selected' : 'notSelected']"
               @click="getChartData(constants.PERIOD_YEAR)">
          1Y
        </v-btn>
      </div>
    </v-row>
    <v-row class="ma-0">
      <GChart type="ColumnChart" rx="5" ry="5"
              :data="chartData" :options="chartOptions"/>
    </v-row>
  </div>
</template>

<script>
import * as constants from '@/store/constants';

export default {
  name: 'MetricsHistoryGraph',
  data() {
    return {
      constants,
      period: constants.PERIOD_WEEK,
      chartData: [
        ['', '', { role: 'style' }],
        [this.$t('dialog.borrow.description10'), 0, '#7DCCB6'],
        [this.$t('dialog.borrow.description11'), 0, '#47B25F'],
      ],
      chartOptions: {
        width: 312,
        tooltip: { isHTML: true },
        backgroundColor: 'transparent',
        vAxis: {
          title: this.yAxisTittle,
          colors: ['#9575cd', '#33ac71'],
          labelStyle: { color: '#A3B8A7' },
          titleTextStyle: { color: '#A3B8A7' },
          titlePosition: { position: 'right' },
          textStyle: { color: '#042F24' },
          gridlines: { count: 4 },
          viewWindow: {
            min: 0,
          },
        },
        bar: { groupWidth: '30%' },
        legend: {
          position: 'none',
        },
        hAxis: {
          textStyle: { color: '#042F24' },
          legend: 'none',
        },
      },
    };
  },
  props: {
    selected: {
      required: true,
      type: Number,
    },
  },
  computed: {
    yAxisTittle() {
      console.log(this.selected);
      return this.$t('internal-metrics.graph-y-axis')[this.selected];
    },
  },
  methods: {
    getChartData(period) {
      this.period = period;
    },
  },
};
</script>
