<template>
  <div class="balance-risk balance-style">
    <div class="risk">
      <div class="d-flex justify-center">
        <img class="risk-img" :src="riskImage" />
        <v-progress-circular class="risk-graph" :size="125" :width="12"
          :value="riskValue" :color="chartColor" :rotate="270" />
      </div>
    </div>
    <div class="risk-description">
      <div class="p6-reading-values mt-2">{{title}}</div>
      <v-divider></v-divider>
      <div class="p1-descriptions">
        {{subtitle}}
      </div>
      <div class="p1-descriptions">
        {{percentageBalance}}% {{description}}
      </div>
    </div>
  </div>
</template>
<script>
import HappyFace from '@/assets/health/face-happy.png';
import SeriousFace from '@/assets/health/face-serious.png';
import SurpisedFace from '@/assets/health/face-surprised.png';
import SadFace from '@/assets/health/face-sad.png';

export default {
  name: 'RiskBalance',
  props: {
    riskRate: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
    };
  },
  computed: {
    percentageBalance() {
      return Math.round(100 - this.riskRate);
    },
    riskValue() {
      return 100 - this.riskRate;
    },
    loadingChart() {
      return this.riskValue === null;
    },
    chartLoaded() {
      return this.riskValue >= 0;
    },
    title() {
      if (this.riskRate === 100) return this.$t('balance.risk.titles.no-risk');
      if (this.riskRate > 60 && this.riskRate < 100) return this.$t('balance.risk.titles.low-risk');
      if (this.riskRate > 40 && this.riskRate <= 60) return this.$t('balance.risk.titles.medium-risk');
      if (this.riskRate > 0 && this.riskRate <= 40) return this.$t('balance.risk.titles.high-risk');
      if (this.riskRate === 0) return this.$t('balance.risk.titles.liquidated');
      return this.$t('balance.risk.titles.no-risk');
    },
    subtitle() {
      if (this.riskRate === 100) return this.$t('balance.risk.subtitles.no-risk');
      if (this.riskRate > 60 && this.riskRate < 100) return this.$t('balance.risk.subtitles.low-risk');
      if (this.riskRate > 40 && this.riskRate <= 60) return this.$t('balance.risk.subtitles.medium-risk');
      if (this.riskRate > 0 && this.riskRate <= 40) return this.$t('balance.risk.subtitles.high-risk');
      if (this.riskRate === 0) return this.$t('balance.risk.subtitles.liquidated');
      return this.$t('balance.risk.subtitles.no-risk');
    },
    description() {
      if (this.riskRate === 0) return this.$t('balance.risk.description.liquidated');
      return this.$t('balance.risk.description.risk');
    },
    riskImage() {
      if (this.riskRate > 60 && this.riskRate <= 100) return HappyFace;
      if (this.riskRate > 40 && this.riskRate <= 60) return SeriousFace;
      if (this.riskRate >= 0 && this.riskRate <= 40) return SurpisedFace;
      return SadFace;
    },
    chartColor() {
      if (this.riskRate === 100) return '#317440';
      if (this.riskRate > 60 && this.riskRate < 100) return '#317440';
      if (this.riskRate > 40 && this.riskRate <= 60) return '#BCBE34';
      if (this.riskRate > 0 && this.riskRate <= 40) return '#F7C61A';
      if (this.riskRate === 0) return '#EEAF0E';
      return 'transparent';
    },
  },
};
</script>
