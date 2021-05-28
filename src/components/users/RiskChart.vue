<template>
  <v-card class="container" color="#013E2F" elevation="0">
    <div class="risk">
      <div class="d-flex justify-center mt-2">
        <v-img class="risk-img" width="50" height="50" :src="riskImage" />
        <v-progress-circular class="risk-graph" :size="125" :width="15"
                             :value="100 - riskRate" :color="chartColor" :rotate="180" />
      </div>
      <div class="mt-5">
        <v-row class="risk-title ma-0">
          <h3>{{ riskTitle }}</h3>
        </v-row>
        <v-row class="risk-description ma-0">
          <p class="ma-0">{{ riskDescription }}</p>
        </v-row>
      </div>
    </div>
  </v-card>
</template>

<script>
import HappyFace from '@/assets/health/face-happy.png';
import SeriousFace from '@/assets/health/face-serious.png';
import SurpisedFace from '@/assets/health/face-surprised.png';
import SadFace from '@/assets/health/face-sad.png';

export default {
  name: 'RiskChart',
  props: {
    riskRate: {
      type: Number,
      required: true,
    },
  },
  computed: {
    riskImage() {
      if (this.riskRate > 60 && this.riskRate <= 100) return HappyFace;
      if (this.riskRate > 40 && this.riskRate <= 60) return SeriousFace;
      if (this.riskRate >= 0 && this.riskRate <= 40) return SurpisedFace;
      return SadFace;
    },
    riskTitle() {
      if (this.riskRate === 100) return this.$t('market.risk.titles.no-risk');
      if (this.riskRate > 60 && this.riskRate < 100) return this.$t('market.risk.titles.low-risk');
      if (this.riskRate > 40 && this.riskRate <= 60) return this.$t('market.risk.titles.medium-risk');
      if (this.riskRate >= 0 && this.riskRate <= 40) return this.$t('market.risk.titles.high-risk');
      return this.$t('market.risk.titles.other');
    },
    riskDescription() {
      if (this.riskRate > 60 && this.riskRate <= 100) {
        return this.$t('market.risk.subtitles.low-risk');
      }
      if (this.riskRate > 40 && this.riskRate <= 60) {
        return this.$t('market.risk.subtitles.medium-risk');
      }
      if (this.riskRate >= 0 && this.riskRate <= 40) {
        return this.$t('market.risk.subtitles.high-risk');
      }
      return this.$t('market.risk.subtitles.other');
    },
    chartColor() {
      if (this.riskRate === 100) return 'transparent';
      if (this.riskRate >= 0 && this.riskRate <= 40) return '#FF9153';
      if (this.riskRate > 40 && this.riskRate <= 60) return '#FF9153';
      if (this.riskRate > 60 && this.riskRate <= 100) return '#FF9153';
      return 'transparent';
    },
  },
};
</script>
