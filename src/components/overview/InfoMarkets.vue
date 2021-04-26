<template>
  <v-card class="d-flex justify-center align-center"
          color="#013E2F" width="90%" height="603" flat>
    <div class="overview-info">
      <v-row class="d-flex flex-column">
        <h3>{{`Total ${type==='totalSupply'? 'depositado': 'prestado'}`}}</h3>
        <v-divider></v-divider>
      </v-row>
      <v-row class="d-flex align-baseline">
        <h2>{{ totalMarkets | formatPrice }}</h2> <!--Dinámico-->
        <p class="ml-5"><span>+#,##%</span></p> <!--Dinámico-->
      </v-row>
      <v-row class="d-flex flex-column" style="height: 60%;">
        <div class="mb-2" style="height: 10%;">
          <p>Mercados</p>
        </div>
        <div v-for="(market, idx) in marketsData" :key="`deposit-${idx}`"
          class="overview-markets d-flex flex-column justify-space-between mt-2">
          <div class="d-flex justify-space-between">
            <p>{{market.symbol}}</p> <!--Dinámico-->
            <p>
              <span>
                  {{(`${value(market[type])}%`)}}
                </span>
              </p><!--Dinámico-->
          </div>
          <div>
            <v-progress-linear
              :color="`${type==='totalSupply'? '#4CB163': '#EAA847'}`"
              background-color="#062E24"
              rounded
              :value="`${totalMarkets === 0
              ? 0
              : (market[type] * 100 / totalMarkets)}`"
              height="7">
            </v-progress-linear>
          </div>
        </div>
      </v-row>
      <v-row class="d-flex flex-column">
        <v-divider></v-divider>
        <div class="d-flex justify-space-between mt-5">
          <p>Volumen depositado del día</p>
          <p>{{`# ${type==='totalSupply'? 'depositantes': 'prestatarios'}`}}</p>
        </div>
        <div class="d-flex justify-space-between">
          <h2>$##.###,##</h2>
          <h2>###</h2>
        </div>
      </v-row>
    </div>
  </v-card>
</template>

<script>
export default {
  name: 'InfoMarkets',
  props: {
    marketsData: {
      required: true,
      type: Array,
    },
    totalMarkets: {
      required: true,
      type: Number,
    },
    type: {
      require: true,
      type: String,
    },
  },
  methods: {
    value(market) {
      const value = this.totalMarkets === 0
        ? 0
        : (market * 100) / this.totalMarkets;
      return Math.round((value + Number.EPSILON) * 100) / 100;
    },
  },
};
</script>
