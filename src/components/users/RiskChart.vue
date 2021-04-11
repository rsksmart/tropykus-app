<template>
  <v-card class="container" color="#013E2F">
    <v-row class="ma-0">
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
    </v-row>
  </v-card>
</template>

<script>
import HappyFace from '@/assets/health/face-happy.png';
import SeriousFace from '@/assets/health/face-serious.png';
import WorryFace from '@/assets/health/face-worry.png';
import SadFace from '@/assets/health/face-sad.png';

export default {
  name: 'RiskChart',
  data() {
    return {
      riskRate: 100,
    };
  },
  computed: {
    riskImage() {
      if (this.riskRate > 60 && this.riskRate <= 100) return HappyFace;
      if (this.riskRate > 30 && this.riskRate <= 60) return SeriousFace;
      if (this.riskRate > 0 && this.riskRate <= 30) return WorryFace;
      return SadFace;
    },
    riskTitle() {
      if (this.riskRate > 60 && this.riskRate <= 100) return 'Riesgo mínimo';
      if (this.riskRate > 30 && this.riskRate <= 60) return 'Riesgo medio';
      if (this.riskRate > 0 && this.riskRate <= 30) return 'Riesgo alto';
      return 'Garantías liquidadas';
    },
    riskDescription() {
      if (this.riskRate > 60 && this.riskRate <= 100) {
        return 'Puedes seguir ahorrando y pidiendo prestado';
      }
      if (this.riskRate > 40 && this.riskRate <= 60) {
        return 'Puedes seguir ahorrando, pero ten cuidado con los montos que pides prestados';
      }
      if (this.riskRate > 30 && this.riskRate <= 40) {
        return 'Estàs muy cerca de ser liquidado. Puedes aumentar tus ahorros '
            + 'o pagar todas tus deudas antes de que pierdas tus fondos.';
      }
      return 'Tus garantias ya no respaldan las deudas que tenias y has sido liquidado.';
    },
    chartColor() {
      if (this.riskRate > 60 && this.riskRate <= 100) return '#4CB163';
      if (this.riskRate > 30 && this.riskRate <= 60) return '#FF9153';
      if (this.riskRate > 0 && this.riskRate <= 30) return '#E65D3D';
      return 'tranparent';
    },
  },
};
</script>
