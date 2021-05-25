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
      if (this.riskRate === 100) return 'Sin riesgo';
      if (this.riskRate > 60 && this.riskRate < 100) return 'Riesgo bajo';
      if (this.riskRate > 40 && this.riskRate <= 60) return 'Riesgo medio';
      if (this.riskRate >= 0 && this.riskRate <= 40) return 'Riesgo alto';
      return 'Escribe otro valor';
    },
    riskDescription() {
      if (this.riskRate > 60 && this.riskRate <= 100) {
        return 'No tienes riesgo de ser liquidado';
      }
      if (this.riskRate > 40 && this.riskRate <= 60) {
        return 'Podría ser liquidado tu colateral,\nten precaución';
      }
      if (this.riskRate >= 0 && this.riskRate <= 40) {
        return 'Es probable que pierdas tu\ncolateral. Ten precaución';
      }
      return 'No es posible calcular el riesgo';
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
