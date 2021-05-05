<template>
  <div class="container d-flex justify-center">
    <v-simple-table class="mt-2">
      <thead>
        <tr>
          <th class="text-left">
            Mercado
          </th>
          <th class="text-left">
            Total depositado
          </th>
          <th class="text-center">
            Tasa de ganancia anual <br> dinámica actual
          </th>
          <th class="text-left">
            Total prestado
          </th>
          <th class="text-left">
            Tasa de interés anual <br> dinámica actual
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(market, idx) in marketsData" :key="`${idx}-totalMarket`">
          <td>
            <div class="d-flex align-center justify-center">
              <div class="d-flex justify-space-between" style="width: 160px">
                <img :src="market.symbolUrl" alt="market icon" />
                <div class="d-flex justify-center flex-column align-center">
                  <span class="font-weight-bold">{{ market.underlyingAssetName }}</span>
                  <span>{{ market.symbol }}</span>
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="d-flex justify-center flex-column align-center">
                <span class="font-weight-bold">
                  {{ market.totalSupplyInUnderlying| formatDecimals }} {{market.symbol}}
                </span>
                <span>{{ market.totalSupply | formatPrice }} USD</span>
            </div>
          </td>
          <td>{{`${round(market.supplyRate)}%`}}</td>
          <td>
            <div class="d-flex justify-center flex-column align-center">
                <span class="font-weight-bold">
                  {{ market.totalBorrowsInUnderlying | formatDecimals }} {{ market.symbol }}
                </span>
                <span>{{ market.totalBorrow | formatPrice }} USD</span>
            </div>
          <td>{{`${round(market.borrowRate)}%`}}</td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  name: 'TotalMarkets',
  props: {
    marketsData: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
    };
  },
  methods: {
    // Create a Helper file
    round(number) {
      return Math.round((number + Number.EPSILON) * 100) / 100;
    },
  },
};
</script>
