<template>
  <v-container>
    <!-- <template v-if="loadingTotalSupply || loadingTotalBorrow">
      <v-row class="mx-0 mt-4">
        <v-col cols="6" v-for="index in 2" :key="index">
          <v-skeleton-loader type="image" height="106" />
        </v-col>
      </v-row>
    </template> -->
    <template>
      <v-row class="ma-0 mt-4">
        <v-col cols="6">
          <v-card class="container d-flex align-center" color="#013E2F" width="439"
            height="159" style="padding:30px;">
            <v-row class="ma-0 d-flex justify-space-around">
              <div class="pa-0 d-flex align-center">
                <v-row class="ma-0">
                  <v-img class="mx-2" src="@/assets/icons/pig2.svg" width="89" height="72"
                         position="center center" contain/>
                </v-row>
              </div>
              <div cols="6" class="pa-0 ml-9">
                <v-row class="ma-auto">
                  <h2 class="boldie">{{ totalSuppliedUSD }} USD</h2>
                </v-row>
                <v-row class="ma-0">
                  <p>{{ $t('balance.my-balance.title1') }}</p>
                </v-row>
              </div>
              <div>
               <v-tooltip right max-width="178">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon class="align-start ml-4 mt-1" small color="#FFFFFF"
                      v-bind="attrs" v-on="on">
                      mdi-information
                    </v-icon>
                  </template>
                  <span class="p5-feedback">
                    {{ $t('balance.tooltip2') }}
                  </span>
                </v-tooltip>
              </div>
            </v-row>
            <!-- CUANDO SE HAGA EL NUEVO DESPLIEGUE -->
            <!-- <v-divider color="#BEBEBE" />
            <v-row>
              <v-col>
                <h3>0 USD</h3>
                <p>Depositados</p>
              </v-col>
              <v-col>
                <h3>0 USD</h3>
                <p>Ganancias historicas</p>
              </v-col>
            </v-row> -->
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="container d-flex align-center" color="#013E2F" width="439"
            height="159" style="padding:30px;">
            <v-row class="ma-0 d-flex justify-space-around">
              <div class="pa-0 d-flex align-center">
                <v-row class="ma-0">
                  <v-img class="px-2" src="@/assets/icons/pay2.svg" width="89" height="72"
                         position="center center" contain/>
                </v-row>
              </div>
              <div cols="6" class="pa-0 ml-9">
                <v-row class="ma-0">
                  <h2 class="boldie">{{ totalBorrowedUSD }} USD</h2>
                </v-row>
                <v-row class="ma-0">
                  <p>{{ $t('balance.my-balance.title2') }}</p>
                </v-row>
              </div>
              <div>
                 <v-tooltip right max-width="178">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon class="align-start ml-4 mt-1" small color="#FFFFFF"
                      v-bind="attrs" v-on="on">
                      mdi-information
                    </v-icon>
                  </template>
                  <span class="p5-feedback">
                    {{ $t('balance.tooltip3') }}
                  </span>
                </v-tooltip>
              </div>
            </v-row>
            <!-- CUANDO SE HAGA EL NUEVO DESPLIEGUE -->
            <!-- <v-divider color="#BEBEBE" />
            <v-row>
              <v-col>
                <h3>0 USD</h3>
                <p>Pedidos en prestamo</p>
              </v-col>
              <v-col>
                <h3>0 USD</h3>
                <p>Intereses acumulados</p>
              </v-col>
            </v-row> -->
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import {
  CRbtc,
  CToken,
  Market,
  Comptroller,
} from '@/middleware';
import { mapState } from 'vuex';

export default {
  name: 'MyBalance',
  data() {
    return {
      totalSuppliedUSD: 0,
      totalBorrowedUSD: 0,
      comptroller: null,
      marketAddresses: [],
      markets: [],
    };
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
      chainId: (state) => state.Session.chainId,
    }),
    loadingTotalSupply() {
      return this.totalSuppliedUSD === 1;
    },
    loadingTotalBorrow() {
      return this.totalBorrowedUSD === 1;
    },
  },
  methods: {
    async getMarkets() {
      return new Promise((resolve, reject) => {
        let counter = 0;
        this.marketAddresses.forEach(async (marketAddress) => {
          await Market.isCRbtc(marketAddress)
            .then((isCRbtc) => {
              counter += 1;
              if (isCRbtc) {
                this.markets.push(new CRbtc(marketAddress, this.chainId));
              } else {
                this.markets.push(new CToken(marketAddress, this.chainId));
              }
              if (counter === this.marketAddresses.length) resolve(this.markets);
            })
            .catch(reject);
        });
      });
    },
    async getData() {
      this.marketAddresses = await this.comptroller.allMarkets;
      await this.getMarkets();
      this.totalSuppliedUSD = await this.comptroller
        .totalDepositsInUSD(this.markets, this.walletAddress, this.chainId);
      this.totalBorrowedUSD = await this.comptroller
        .totalBorrowsInUSD(this.markets, this.walletAddress, this.chainId);
      this.totalSuppliedUSD = this.totalSuppliedUSD.toFixed(2);
      this.totalBorrowedUSD = this.totalBorrowedUSD.toFixed(2);
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getData();
    // setTimeout(() => {
    //   this.totalSuppliedUSD = 0;
    //   this.totalBorrowedUSD = 0;
    // }, 1000);
  },
};
</script>
