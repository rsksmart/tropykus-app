<template>
  <v-container>
    <v-row class="mx-0 pl-3">
      <v-card class="crop-card">
        <v-card-title class="pa-0">
          <v-img class="mx-2" src="@/assets/icons/home.svg" height="23" width="23" contain/>
          <h1 class="text-left">Mi balance</h1>
        </v-card-title>
      </v-card>
    </v-row>
    <template v-if="loadingTotalSupply || loadingTotalBorrow">
      <v-row class="mx-0 mt-4">
        <v-col cols="6" v-for="index in 2" :key="index">
          <v-skeleton-loader type="image" height="106" />
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <v-row class="ma-0 mt-4">
        <v-col cols="6">
          <v-card class="container" color="#013E2F">
            <v-row class="ma-0">
              <v-col class="pa-0 d-flex align-center">
                <v-row class="ma-0">
                  <v-img class="mx-2" src="@/assets/icons/pig.svg" width="64" height="64"
                         position="center center" contain/>
                </v-row>
              </v-col>
              <v-col cols="9" class="pa-0">
                <v-row class="ma-0">
                  <h2 class="boldie">{{ totalSuppliedUSD | formatPrice }} USD</h2>
                </v-row>
                <v-row class="ma-0">
                  <p>Ahorrados</p>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="container" color="#013E2F">
            <v-row class="ma-0">
              <v-col class="pa-0 d-flex align-center">
                <v-row class="ma-0">
                  <v-img class="px-2" src="@/assets/icons/pay.svg" width="64" height="64"
                         position="center center" contain/>
                </v-row>
              </v-col>
              <v-col cols="9" class="pa-0">
                <v-row class="ma-0">
                  <h2 class="boldie">{{ totalBorrowedUSD | formatPrice }} USD</h2>
                </v-row>
                <v-row class="ma-0">
                  <p>Debes pagar</p>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
export default {
  name: 'MyBalance',
  data() {
    return {
      totalSuppliedUSD: null,
      totalBorrowedUSD: null,
    };
  },
  computed: {
    loadingTotalSupply() {
      return this.totalSuppliedUSD === null;
    },
    loadingTotalBorrow() {
      return this.totalBorrowedUSD === null;
    },
  },
  created() {
    setTimeout(() => {
      this.totalSuppliedUSD = 0;
      this.totalBorrowedUSD = 0;
    }, 1000);
  },
};
</script>
