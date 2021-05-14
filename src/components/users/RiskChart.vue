<template>
  <v-card class="container" color="#013E2F" elevation="0">
    <div class="risk">
      <div class="d-flex justify-center">
        <v-img class="risk-img" width="40" height="40" :src="riskImage" />
        <v-progress-circular class="risk-graph" :size="100" :width="15"
                             :value="riskRate" :color="chartColor" />
      </div>
      <div>
        <v-row class="risk-title ma-0">
          <h3>{{ riskTitle }}</h3>
        </v-row>
        <v-row class="risk-description ma-0">
          <p class="ma-0">{{ riskDescription }}</p>
        </v-row>
      </div>
    </div>
    <!-- <v-row class="ma-0">
      <v-col cols="5" class="d-flex justify-center">
        <v-img class="risk-img" width="40" height="40" :src="riskImage" />
        <v-progress-circular class="risk-graph" :size="100" :width="15"
                             :value="riskRate" :color="chartColor" />
      </v-col>
      <v-col cols="7">
        <v-row class="ma-0">
          <h3>{{ riskTitle }}</h3>
        </v-row>
        <v-row class="ma-0">
          <p class="ma-0">{{ riskDescription }}</p>
        </v-row>
      </v-col>
    </v-row> -->
  </v-card>
</template>

<script>
import HappyFace from '@/assets/health/face-happy.png';
import SeriousFace from '@/assets/health/face-serious.png';
import WorryFace from '@/assets/health/face-worry.png';
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
      if (this.riskRate > 40 && this.riskRate <= 100) return HappyFace;
      if (this.riskRate > 60 && this.riskRate <= 40) return SeriousFace;
      if (this.riskRate > 0 && this.riskRate <= 60) return WorryFace;
      return SadFace;
    },
    riskTitle() {
      if (this.riskRate === 100) return 'Sin riesgo';
      if (this.riskRate > 40 && this.riskRate < 100) return 'Riesgo bajo';
      if (this.riskRate > 60 && this.riskRate <= 40) return 'Riesgo medio';
      if (this.riskRate > 0 && this.riskRate <= 60) return 'Riesgo alto';
      return 'Escribe otro valor';
    },
    riskDescription() {
      if (this.riskRate > 40 && this.riskRate <= 100) {
        return 'No tienes riesgo de ser liquidado';
      }
      if (this.riskRate > 60 && this.riskRate <= 40) {
        return 'Podría ser liquidado tu colateral ten precaución';
      }
      if (this.riskRate > 0 && this.riskRate <= 60) {
        return 'Es probable que pierdas tu colateral. Ten precaución';
      }
      return 'No es posible calcular el riesgo';
    },
    chartColor() {
      if (this.riskRate === 100) return 'transparent';
      if (this.riskRate < 100 && this.riskRate > 0) return '#FF9153';
      return 'transparent';
    },
  },
};
</script>
