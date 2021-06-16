<template>
  <v-container>
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
          <v-card class="container" color="#013E2F" width="439" height="263" style="padding:30px;">
            <v-row class="ma-0">
              <v-col class="pa-0 d-flex align-center">
                <v-row class="ma-0">
                  <v-img class="mx-2" src="@/assets/icons/pig2.svg" width="64" height="64"
                         position="center center" contain/>
                </v-row>
              </v-col>
              <v-col cols="6" class="pa-0">
                <v-row class="ma-0">
                  <h2 class="boldie">{{ totalSuppliedUSD }} USD</h2>
                </v-row>
                <v-row class="ma-0">
                  <p>Tienes depositado</p>
                </v-row>
              </v-col>
              <v-col>
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
              </v-col>
            </v-row>
            <v-divider color="#BEBEBE" />
            <v-row>
              <v-col>
                <h3>0 USD</h3>
                <p>Depositados</p>
              </v-col>
              <v-col>
                <h3>0 USD</h3>
                <p>Ganancias historicas</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card class="container" color="#013E2F" width="439" height="263" style="padding:30px;">
            <v-row class="ma-0">
              <v-col class="pa-0 d-flex align-center">
                <v-row class="ma-0">
                  <v-img class="px-2" src="@/assets/icons/pay2.svg" width="64" height="64"
                         position="center center" contain/>
                </v-row>
              </v-col>
              <v-col cols="6" class="pa-0">
                <v-row class="ma-0">
                  <h2 class="boldie">{{ totalBorrowedUSD }} USD</h2>
                </v-row>
                <v-row class="ma-0">
                  <p>Debes pagar</p>
                </v-row>
              </v-col>
              <v-col>
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
              </v-col>
            </v-row>
            <v-divider color="#BEBEBE" />
            <v-row>
              <v-col>
                <h3>0 USD</h3>
                <p>Pedidos en prestamo</p>
              </v-col>
              <v-col>
                <h3>0 USD</h3>
                <p>Intereses acumulados</p>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'MyBalance',
  data() {
    return {
      totalSuppliedUSD: null,
      totalBorrowedUSD: null,
      comptroller: null,
      markets: [],
    };
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
      chainId: (state) => state.Session.chainId,
    }),
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
