<template>
    <div class="risk">
      <template v-if="inBalance">
        <template v-if="loadingChart">
          <div class="risk-container">
            <v-skeleton-loader type="image" height="100%"/>
          </div>
        </template>
        <template v-else>
          <template v-if="chartLoaded">
            <div class="risk-container">
              <div style="width: 537px;">
                <div class="mt-5">
                  <v-row class="risk-title ma-0">
                    <h2>{{ riskTitle }}</h2>
                  </v-row>
                  <v-row class="risk-description ma-0">
                    <p class="ma-0">{{ riskSubtitle}}</p>
                  </v-row>
                  <v-divider color="#FFF" class="my-3"/>
                  <v-row class="risk-description ma-0">
                    <p class="ma-0">{{ riskDescription }}</p>
                  </v-row>
                </div>
                <div class="risk-circle">
                  <div class="d-flex justify-center mt-2">
                    <v-img class="risk-img" width="60" height="60" :src="riskImage" />
                    <v-progress-circular class="risk-graph" :size="125" :width="15"
                                        :value="riskValue" :color="chartColor" :rotate="180" />
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
      </template>
      <template v-else>
        <div class="d-flex justify-center mt-2">
          <v-img class="risk-img" width="50" height="50" :src="riskImage" />
          <v-progress-circular class="risk-graph" :size="125" :width="15"
                              :value="riskValue" :color="chartColor" :rotate="180" />
        </div>
        <div class="mt-5">
          <v-row class="risk-title ma-0">
            <h3>{{ riskTitle }}</h3>
          </v-row>
          <v-row class="risk-description ma-0">
            <p class="ma-0">{{ riskSubtitle }}</p>
          </v-row>
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
  name: 'RiskChart',
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
    riskImage() {
      if (this.riskRate > 60 && this.riskRate <= 100) return HappyFace;
      if (this.riskRate > 40 && this.riskRate <= 60) return SeriousFace;
      if (this.riskRate >= 0 && this.riskRate <= 40) return SurpisedFace;
      return SadFace;
    },
    riskTitle() {
      if (this.riskRate === 100) return this.$t('market.risk.titles.no-risk');
      if (this.riskRate > 60 && this.riskRate < 100) {
        return this.$t('market.risk.titles.low-risk');
      }
      if (this.riskRate > 40 && this.riskRate <= 60) {
        return this.$t('market.risk.titles.medium-risk');
      }
      if (this.inBalance) {
        if (this.riskRate > 0 && this.riskRate <= 40) {
          return this.$t('market.risk.titles.high-risk');
        }
      } else if (this.riskRate >= 0 && this.riskRate <= 40) {
        return this.$t('market.risk.titles.high-risk');
      }
      if (this.inBalance) {
        if (this.riskRate === 0) {
          return this.$t('market.risk.titles.liquidated');
        }
      }
      return this.$t('market.risk.titles.other');
    },
    riskSubtitle() {
      if (this.riskRate > 60 && this.riskRate <= 100) {
        return this.inBalance ? this.$t('balance.chart.subtitles.low-risk')
          : this.$t('market.risk.subtitles.low-risk');
      }
      if (this.riskRate > 40 && this.riskRate <= 60) {
        return this.inBalance ? this.$t('balance.chart.subtitles.medium-risk')
          : this.$t('market.risk.subtitles.medium-risk');
      }
      if (this.inBalance) {
        if (this.riskRate > 0 && this.riskRate <= 40) {
          return this.$t('balance.chart.subtitles.high-risk');
        }
      } else if (this.riskRate >= 0 && this.riskRate <= 40) {
        return this.$t('market.risk.subtitles.high-risk');
      }
      if (this.inBalance) {
        if (this.riskRate === 0) {
          return this.$t('balance.chart.subtitles.liquidated');
        }
      }
      return this.$t('market.risk.subtitles.other');
    },
    riskDescription() {
      if (this.inBalance) {
        if (this.riskRate === 100) {
          return this.percentageBalance + this.$t('balance.chart.description.no-risk');
        }
        if (this.riskRate > 60 && this.riskRate < 100) {
          return this.percentageBalance + this.$t('balance.chart.description.low-risk');
        }
        if (this.riskRate > 40 && this.riskRate <= 60) {
          return this.percentageBalance + this.$t('balance.chart.description.medium-risk');
        }
        if (this.riskRate > 0 && this.riskRate <= 40) {
          return this.percentageBalance + this.$t('balance.chart.description.high-risk');
        }
      }
      return this.percentageBalance + this.$t('balance.chart.description.liquidated');
    },
    chartColor() {
      if (this.riskRate === 100) return this.inBalance ? '#317440' : 'transparent';
      if (this.inBalance) {
        if (this.riskRate > 60 && this.riskRate < 100) {
          return '#4CB163';
        }
      } else if (this.riskRate > 60 && this.riskRate <= 100) {
        return '#FF9153';
      }
      if (this.riskRate > 40 && this.riskRate <= 60) return '#FF9153';
      if (this.inBalance) {
        if (this.riskRate > 0 && this.riskRate <= 40) {
          return '#E65D3D';
        }
      } else if (this.riskRate >= 0 && this.riskRate <= 40) {
        return '#FF9153';
      }
      if (this.inBalance) {
        if (this.riskRate === 0) {
          return '#C84021';
        }
      }
      return 'transparent';
    },
  },
};
</script>
