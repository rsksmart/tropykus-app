<template>
  <div class="balance">
    <div class="container">
      <v-row class="ma-0">
        <v-col cols="8" class="pa-0">
          <v-row class="ma-0">
            <my-balance />
          </v-row>
          <v-row class="ma-0">
            <savings />
          </v-row>
          <v-row class="ma-0">
            <debts />
          </v-row>
        </v-col>
        <v-col cols="4" class="pa-0 mt-15">
          <v-row class="ma-0">
            <balance-chart />
          </v-row>
          <v-row class="ma-0 mt-4">
            <risk-chart />
          </v-row>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <div class="container">
          <v-row class="mx-0 pl-3">
            <v-card class="crop-card">
              <v-card-title class="pa-0">
                <v-img class="px-2" src="@/assets/icon-clock.svg" height="23" contain/>
                <h1 class="text-left">Mi actividad</h1>
              </v-card-title>
            </v-card>
          </v-row>
          <v-row class="ma-0 pl-3 mt-4">
            <v-row class="ma-0 mb-7">
              <v-simple-table class="mt-2">
                <template v-slot:default>
                  <thead>
                  <tr>
                    <th class="text-left">
                      Actividad
                    </th>
                    <th class="text-left">
                      Crypto
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
                    <th class="text-left"></th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr v-for="item in tokens" :key="item.hash">
                    <td class="td-type">{{ item.type }}</td>
                    <td>{{ item.crypto }}</td>
                    <td>{{ item.amount }}</td>
                    <td>{{ item.date }}</td>
                    <td>{{ item.hash }}</td>
                    <td>
                      <v-btn color="#4CB163">Ver más</v-btn>
                    </td>
                  </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-row>
          </v-row>
        </div>
      </v-row>
    </div>
  </div>
</template>

<script>
import Debts from '@/components/users/Debts.vue';
import Savings from '@/components/users/Savings.vue';
import MyBalance from '@/components/users/MyBalance.vue';
import BalanceChart from '@/components/users/BalanceChart.vue';
import RiskChart from '@/components/users/RiskChart.vue';

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
    Savings,
    Debts,
    BalanceChart,
    RiskChart,
  },
};
</script>
