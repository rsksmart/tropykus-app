<template>
  <div class="home">
    <v-container class="tutorials container">
      <v-row class="ma-0 mb-5 pl-3">
        <h3 class="text-left h3-sections-heading">
          {{ $t('tutorials.title') }}</h3>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="3" class="px-5">
          <v-card class="container" color="#013E2F">
            <v-row class="mx-2 my-1">
              <v-img position="center center" height="48" contain
                     src="@/assets/tutorials/btc-to-rbtc/BtcToRbtc.svg"/>
            </v-row>
            <v-row class="mx-0 d-flex justify-center">
              {{ $t('tutorials.title1') }}
            </v-row>
            <v-row class="mx-0 mb-3 d-flex justify-center">
              {{ $t('tutorials.title2') }}
            </v-row>
            <v-row class="mx-0 my-2 d-flex justify-center">
              <v-btn depressed @click="$router.push({ name: 'BtcToRbtc'})">
                {{ $t('tutorials.button') }}
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
              {{ $t('tutorials.title3') }}
            </v-row>
            <v-row class="mx-0 mb-3 d-flex justify-center">
              {{ $t('tutorials.title4') }} Binance
            </v-row>
            <v-row class="mx-0 my-2 d-flex justify-center">
              <v-btn depressed @click="$router.push({ name: 'BinanceToLiquality'})">
                {{ $t('tutorials.button') }}
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
              {{ $t('tutorials.title3') }}
            </v-row>
            <v-row class="mx-0 mb-3 d-flex justify-center">
              {{ $t('tutorials.title4') }}  Ledn
            </v-row>
            <v-row class="mx-0 my-2 d-flex justify-center">
              <v-btn depressed @click="$router.push({ name: 'LednToLiquality'})">
                {{ $t('tutorials.button') }}
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
              {{ $t('tutorials.title3') }}
            </v-row>
            <v-row class="mx-0 mb-3 d-flex justify-center">
              {{ $t('tutorials.title4') }}  BlockFi
            </v-row>
            <v-row class="mx-0 my-2 d-flex justify-center">
              <v-btn depressed @click="$router.push({ name: 'BlockfiToLiquality'})">
                {{ $t('tutorials.button') }}
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
