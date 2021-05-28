<template>
  <v-card class="d-flex justify-center align-center"
          color="#013E2F" width="90%" height="603" flat>
    <div class="overview-info">
      <v-row class="d-flex flex-column">
        <h3>{{ `Total ${type === 'totalSupply' ?
          this.$t('overview.markets-card.title2') :
          this.$t('overview.markets-card.title4')}` }}</h3>
        <v-divider></v-divider>
      </v-row>
      <v-row class="d-flex align-baseline">
        <h2>{{ totalMarkets | formatPrice }}</h2>
      </v-row>
      <v-row class="d-flex flex-column" style="height: 60%;">
        <div class="mb-2" style="height: 10%;">
          <p>{{ $t('overview.subtitle') }}</p>
        </div>
        <div v-for="(market, idx) in marketsData" :key="`deposit-${idx}`"
             class="overview-markets d-flex flex-column justify-space-between mt-2">
          <div class="d-flex justify-space-between">
            <p>{{ market.symbol }}</p>
            <p>
              <span>
                  {{ (`${value(market[type])}%`) }}
                </span>
            </p>
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
          <p>{{ volumenLabel }}</p>
          <p>{{ `# ${type === 'totalSupply' ?
              this.$t('overview.deposited-card.subtitle2') :
              this.$t('overview.borrowed-card.subtitle2')}` }}</p>
        </div>
        <div class="d-flex justify-space-between">
          <h2>{{ last24Hours.total | formatPrice }}</h2>
          <h2>{{ last24Hours.people }}</h2>
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
  computed: {
    last24Hours() {
      let total = 0;
      let people = [];
      if (this.type === 'totalSupply') {
        this.marketsData.forEach((market) => {
          total += market.suppliedLast24Hours.total;
          people = people.concat(...market.suppliedLast24Hours.accounts);
        });
        return { total, people: new Set(people).size };
      }
      this.marketsData.forEach((market) => {
        total += market.borrowedLast24Hours.total;
        people = people.concat(...market.borrowedLast24Hours.accounts);
      });
      return { total, people: new Set(people).size };
    },
    volumenLabel() {
      return this.type === 'totalSupply' ? this.$t('overview.deposited-card.subtitle3') : this
        .$t('overview.borrowed-card.subtitle3');
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
