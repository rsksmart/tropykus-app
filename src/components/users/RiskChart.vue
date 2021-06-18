<template>
    <div class="risk">
      <template v-if="!inBalance">
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
      </template>
      <template v-else>
        <div class="risk-container">
           <div class="mt-5">
            <v-row class="risk-title ma-0">
              <h2>{{ riskTitle }}</h2>
            </v-row>
            <v-row class="risk-description ma-0">
              <p class="ma-0">{{ riskDescription }}</p>
            </v-row>
            <v-divider color="#FFF" class="my-3"/>
            <v-row class="risk-description ma-0">
              <p class="ma-0">{{ riskDescription }}</p>
            </v-row>
          </div>
          <div class="risk-circle">
            <div class="d-flex justify-center mt-2">
              <v-img class="risk-img" width="50" height="50" :src="riskImage" />
              <v-progress-circular class="risk-graph" :size="125" :width="15"
                                  :value="100 - riskRate" :color="chartColor" :rotate="180" />
            </div>
          </div>
        </div>
      </template>
    </div>
</template>

<script>
import HappyFace from '@/assets/health/face-happy.png';
import SeriousFace from '@/assets/health/face-serious.png';
import SurpisedFace from '@/assets/health/face-surprised.png';
import SadFace from '@/assets/health/face-sad.png';

export default {
  watch: {
  },
  name: 'RiskChart',
  data() {
    return {
      riskChart: {
        title: {
          borrow: {
            noRisk: this.$t('market.risk.titles.no-risk'),
            lowRisk: this.$t('market.risk.titles.low-risk'),
            mediumRisk: this.$t('market.risk.titles.medium-risk'),
            highRisk: this.$t('market.risk.titles.high-risk'),
            other: this.$t('market.risk.titles.other'),
          },
          balance: {
            noRisk: this.$t('market.risk.titles.no-risk'),
            lowRisk: this.$t('market.risk.titles.low-risk'),
            mediumRisk: this.$t('market.risk.titles.medium-risk'),
            highRisk: this.$t('market.risk.titles.high-risk'),
            other: this.$t('market.risk.titles.other'),
          },
        },
        subtitle: {
          borrow: {
            noRisk: this.$t('market.risk.subtitles.no-risk'),
            lowRisk: this.$t('market.risk.subtitles.low-risk'),
            mediumRisk: this.$t('market.risk.subtitles.medium-risk'),
            highRisk: this.$t('market.risk.subtitles.high-risk'),
            other: this.$t('market.risk.subtitles.other'),
          },
          balance: {
            noRisk: this.$t('market.risk.subtitles.no-risk'),
            lowRisk: this.$t('market.risk.subtitles.low-risk'),
            mediumRisk: this.$t('market.risk.subtitles.medium-risk'),
            highRisk: this.$t('market.risk.subtitles.high-risk'),
            other: this.$t('market.risk.subtitles.other'),
          },
        },
      },
    };
  },
  props: {
    riskRate: {
      type: Number,
      required: true,
    },
    typeChart: {
      type: String,
      required: true,
    },
    inBalance: {
      type: Boolean,
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
      if (this.riskRate === 100) return this.riskChart.title[this.typeChart].noRisk;
      if (this.riskRate > 60 && this.riskRate < 100) {
        return this.riskChart.title[this.typeChart].lowRisk;
      }
      if (this.riskRate > 40 && this.riskRate <= 60) {
        return this.riskChart.title[this.typeChart].mediumRisk;
      }
      if (this.riskRate >= 0 && this.riskRate <= 40) {
        return this.riskChart.title[this.typeChart].highRisk;
      }
      return this.riskChart.title[this.typeChart].other;
    },
    riskDescription() {
      if (this.riskRate > 60 && this.riskRate <= 100) {
        return this.riskChart.subtitle[this.typeChart].lowRisk;
      }
      if (this.riskRate > 40 && this.riskRate <= 60) {
        return this.riskChart.subtitle[this.typeChart].mediumRisk;
      }
      if (this.riskRate >= 0 && this.riskRate <= 40) {
        return this.riskChart.subtitle[this.typeChart].highRisk;
      }
      return this.riskChart.subtitle[this.typeChart].other;
    },
    chartColor() {
      if (this.riskRate === 100) return this.inBalance ? '#C84021' : 'transparent';
      if (this.riskRate >= 0 && this.riskRate <= 40) return this.inBalance ? '#4CB163' : '#FF9153';
      if (this.riskRate > 40 && this.riskRate <= 60) return this.inBalance ? '#FF9153' : '#FF9153';
      if (this.riskRate > 60 && this.riskRate <= 100) return this.inBalance ? '#E65D3D' : '#FF9153';
      return 'transparent';
    },
  },
};
</script>
