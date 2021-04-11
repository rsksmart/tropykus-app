<template>
  <div class="home">
    <v-container class="tutorials mt-8 container">
      <v-row class="ma-0 px-3 pl-5">
        <v-card class="crop-card">
          <v-card-title class="pa-0">
            <v-icon class="px-2" left color="#fff">mdi-help-circle-outline</v-icon>
            <h1 class="text-left">Tutoriales</h1>
          </v-card-title>
        </v-card>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="3" class="px-5">
          <v-card class="container" color="#013E2F">
            <v-row class="mx-2 my-1">
              <v-img position="center center" height="48" contain
                     src="@/assets/tutorials/btc-to-rbtc/BtcToRbtc.svg"/>
            </v-row>
            <v-row class="mx-0 d-flex justify-center">
              Convierte
            </v-row>
            <v-row class="mx-0 mb-3 d-flex justify-center">
              BTC a RBTC
            </v-row>
            <v-row class="mx-0 my-2 d-flex justify-center">
              <v-btn depressed @click="$router.push({ name: 'BtcToRbtc'})">
                Ver Tutorial
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="3" class="px-5">
          <v-card class="container" color="#013E2F">
            <v-row class="mx-2 my-1">
              <v-img position="center center" height="48" contain
                     src="@/assets/tutorials/binance-to-liquality/BinanceToLiquality.svg"/>
            </v-row>
            <v-row class="mx-0 d-flex justify-center">
              Transfiere tus fondos
            </v-row>
            <v-row class="mx-0 mb-3 d-flex justify-center">
              desde Binance
            </v-row>
            <v-row class="mx-0 my-2 d-flex justify-center">
              <v-btn depressed @click="$router.push({ name: 'BinanceToLiquality'})">
                Ver Tutorial
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="3" class="px-5">
          <v-card class="container" color="#013E2F">
            <v-row class="mx-2 my-1">
              <v-img position="center center" height="48" contain
                     src="@/assets/tutorials/ledn-to-liquality/LednToLiquality.svg"/>
            </v-row>
            <v-row class="mx-0 d-flex justify-center">
              Transfiere tus fondos
            </v-row>
            <v-row class="mx-0 mb-3 d-flex justify-center">
              desde Ledn
            </v-row>
            <v-row class="mx-0 my-2 d-flex justify-center">
              <v-btn depressed @click="$router.push({ name: 'LednToLiquality'})">
                Ver Tutorial
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="3" class="px-5">
          <v-card class="container" color="#013E2F">
            <v-row class="mx-2 my-1">
              <v-img position="center center" height="48"
                     contain src="@/assets/tutorials/blockfi-to-liquality/BlockfiToLiquality.svg"/>
            </v-row>
            <v-row class="mx-0 d-flex justify-center">
              Transfiere tus fondos
            </v-row>
            <v-row class="mx-0 mb-3 d-flex justify-center">
              desde BlockFi
            </v-row>
            <v-row class="mx-0 my-2 d-flex justify-center">
              <v-btn depressed @click="$router.push({ name: 'BlockfiToLiquality'})">
                Ver Tutorial
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Tutorials',
};
</script>
