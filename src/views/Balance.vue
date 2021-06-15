<template>
  <div class="balance">
    <v-container class="mt-8 container">
      <div class="container" style="width: 1627px;">
        <v-row class="mx-0 pl-3">
          <h3 class="text-left h3-sections-heading">{{ $t('balance.title') }}</h3>
        </v-row>
        <v-row class="ma-0">
          <v-col cols="5" class="pa-0 mt-10">
            <v-row class="ma-0">
              <balance-chart />
            </v-row>
          </v-col>
          <v-col cols="7" class="pa-0">
            <v-row class="ma-0">
              <my-balance />
            </v-row>
            <v-row class="ma-0 mt-4">
              <div class="risk-container">
                <div class="risk-circle">
                  <risk-chart :riskRate="riskRate" :typeChart="'balance'"/>
                </div>
              </div>
            </v-row>
          </v-col>
        </v-row>
        <v-row>
          <v-row class="ma-0">
            <!-- <savings /> -->
            <v-container>
              <v-row class="ma-0 mb-5 pl-3">
                <h3 class="text-left h3-sections-heading">{{ $t('market.my-deposits.title') }}</h3>
              </v-row>
              <template>
                <v-row>
                  <v-simple-table class="mt-2">
                    <thead>
                      <tr>
                        <th class="text-left">
                          Crypto
                        </th>
                        <th class="text-left">
                          Total deuda
                        </th>
                        <th class="text-center">
                          Ganancias históricas
                        </th>
                        <th class="text-left">
                        Tasa de interes anual dinámica actual
                        </th>
                        <th class="text-left">
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(market, idx) in marketsData" :key="`${idx}-totalMarket`">
                        <td>
                          <div class="d-flex align-center justify-center">
                            <div class="d-flex justify-space-between" style="width: 160px">
                              <img :src="market.symbolUrl" alt="market icon" />
                              <span>{{ market.symbol }}</span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </v-simple-table>
                </v-row>
              </template>
              <template>
                <v-row class="mx-0 pl-3 py-4">
                  <v-card color="#013E2F" height="100" class="container
                    d-flex align-center justify-space-between pa-8">
                      <p class="ma-0 whiteish">No tienes deudas aún. Realiza un depósito
                        para poder pedir un préstamo colateralizado.
                      </p>
                      <v-btn width="340" color="#4CB163">
                          <span class="b1-main">{{ $t('balance.my-activity.button') }}</span>
                      </v-btn>
                      <!-- CUANDO YA TIENES DEPOSITOS PERO NO HAS ADQUIRIDO DEUDA -->
                      <!-- <p class="ma-0 whiteish">No tienes deudas aún. Empieza a pedir préstamos
                        sobrecolateralizados.
                      </p>
                      <v-btn width="340" color="#4CB163">
                          <span class="b1-main">Pedir prestado</span>
                      </v-btn> -->
                  </v-card>
                </v-row>
              </template>
              <!-- <template v-if="loadingSavings">
                <v-row class="mx-0 mt-4">
                  <v-col cols="4" v-for="index in 3" :key="index">
                    <v-skeleton-loader type="image" height="158" />
                  </v-col>
                </v-row>
              </template>
              <template v-else>
                <template v-if="savingsLoaded">
                  <v-row class="mx-0 mt-4">
                    <v-col cols="4" v-for="(market, idx) in savings"
                          :key="`market-${idx}`">
                      <debt-savings :inBorrowMenu="inBorrowMenu" :marketAddress="market"
                                    @success="$emit('success')" />
                    </v-col>
                  </v-row>
                </template>
                <template v-else>
                  <v-row class="mx-0 pl-3 py-4">
                    <v-card color="#013E2F" width="100%" class="container">
                      <p class="ma-0 whiteish">No has depositado criptos aún</p>
                    </v-card>
                  </v-row>
                </template>
              </template> -->
            </v-container>
          </v-row>
          <v-row class="ma-0">
            <!-- DEBTS -->
            <!-- <debts /> -->
             <v-container>
                <v-row class="ma-0 mb-5 pl-3">
                  <h3 class="text-left h3-sections-heading">{{ $t('market.my-debts.title') }}</h3>
                </v-row>
                <debt-savings-balance :inBorrowMenu="inBorrowMenu" :marketAddress="market"
                          @success="forceReload" :key="key"/>
              </v-container>
          </v-row>
        </v-row>
      </div>
      <!-- <div class="container mt-16" style="width: 1627px;">
        <v-row class="mx-0 pl-3">
          <h3 class="text-left h3-sections-heading">{{ $t('balance.subtitle4') }}</h3>
        </v-row>
        <v-row class="pl-3 mt-4" style="width: 1584px;">
          tabla
          <v-simple-table class="mt-2">
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Crypto
                </th>
                <th class="text-left">
                  Actividad
                </th>
                <th class="text-left">
                  Monto
                </th>
                <th class="text-left">
                  Fecha
                </th>
                <th class="text-left">
                  Hash de la transacción
                </th>
              </tr>
              </thead>
              <tbody>
              <tr v-for="item in tokens" :key="item.hash">
                <td>{{ item.crypto }}</td>
                <td class="td-type">{{ item.type }}</td>
                <td>{{ item.amount }}</td>
                <td>{{ item.date }}</td>
                <td>{{ item.hash }}</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
          NO HAY DEPOSITOS REALIZADOS
          <v-card class="container d-flex flex-column align-center" color="#013E2F"
             height="493">
            <v-img class="mx-2" src="@/assets/rana.svg" width="275" height="251"
              position="center center" contain/>
            <h3>{{ $t('balance.my-activity.title') }}</h3>
            <v-btn width="340" color="#4CB163">
              <span class="b1-main">{{ $t('balance.my-activity.button') }}</span>
            </v-btn>
          </v-card>
        </v-row>
      </div> -->
    </v-container>
  </div>
</template>

<script>
import MyBalance from '@/components/users/MyBalance.vue';
import BalanceChart from '@/components/users/BalanceChart.vue';
import RiskChart from '@/components/users/RiskChart.vue';
import DebtSavingsBalance from '@/components/market/DebtSavingsBalance.vue';

export default {
  name: 'Balance',
  data() {
    return {
      tokens: [
        {
          type: 'Ahorrar',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x00',
        },
        {
          type: 'Pago de rendimiento',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x01',
        },
        {
          type: 'Pedir prestado',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x02',
        },
        {
          type: 'Pedir prestado',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x03',
        },
        {
          type: 'Pedir prestado',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x04',
        },
      ],
    };
  },
  components: {
    MyBalance,
    BalanceChart,
    RiskChart,
    DebtSavingsBalance,
  },
};
</script>
