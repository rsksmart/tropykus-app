<template>
  <div class="balance">
    <v-card flat color="transparent" width="80%" class="card">
      <v-row>
        <v-col cols="8">
          <v-card flat color="transparent" width="100%" class="mt-2">
            <v-row>
              <v-col cols="3" class="pa-0">
                <div class="container">
                  <img src="@/assets/icon-balance.svg" class="ma-2" />
                  <h2>Mi balance</h2>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" class="ma-0 mt-3 pa-0 ml-3 d-flex">
                <div class="mybalance-cards d-flex justify-start align-center">
                  <div class="ml-10">
                    <p class="p-bold">100.00 USD</p>
                    <p>Ahorrados</p>
                  </div>
                </div>
                <div class="mybalance-cards ml-5 d-flex justify-start align-center">
                  <div class="ml-10">
                    <p class="p-bold">40.00 USD</p>
                    <p>Debes pagar</p>
                  </div>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pa-0">
                <div class="container">
                  <img width="30" src="@/assets/icon-pig.png" class="ma-2" />
                  <h2>Mis ahorros</h2>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="ma-0 mt-3 pa-0" v-for="data in mySavings" :key="data.id">
                <card-save-and-borrow :data="data" :hiddenButton="true" />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3" class="pa-0">
                <div class="container">
                  <img width="30" src="@/assets/icon-pay.png" class="ma-2" />
                  <h2>Mis deudas</h2>
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6" class="ma-0 mt-3 pa-0" v-for="data in myBorrowing" :key="data.id">
                <card-save-and-borrow :data="data" :hiddenButton="false" />
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="4" class="pl-8">
          <v-card class="mt-16" width="100%" color="transparent" flat>
            <div class="net-balance d-flex flex-column">
              <div class="mt-4 ml-6">
                <p class="p-bold">60.000 USD</p>
                <p>Balance neto</p>
              </div>
              <div class="line mt-4 mx-auto"></div>
              <p class="title-cryptos">Mis crytos</p>
              <GChart type="PieChart" :data="chartData" :options="chartOptions" />
            </div>
            <div class="user-risk mt-8 d-flex">
              <v-img class="risk-img" width="40" height="40"
                     src="@/assets/face-happy.png" />
              <!-- <v-img class="risk-img" width="40" height="40"
              src="@/assets/face-serious.png" /> -->
              <!-- <v-img class="risk-img" width="40" height="40"
              src="@/assets/face-worry.png" /> -->
              <!-- <v-img class="risk-img" width="40" height="40"
              src="@/assets/face-sad.png" /> -->
              <GChart type="PieChart" :data="chartDataRiskProfile" :options="optionsRiskProfile" />
              <div>
                <h2 class="mt-8 p-risk">Riesgo mínimo</h2>
                <p>Puedes seguir ahorrando y pidiendo prestado</p>
              </div>
              <!-- <div>
                <h2 class="mt-8 mb-2 p-risk">Riesgo medio</h2>
                <p>Puedes seguir ahorrando, pero ten cuidado con los montos que pides prestados.</p>
              </div> -->
              <!-- <div>
                <h2 class="mt-8 mb-2 p-risk">Riesgo alto</h2>
                <p>Estas muy cerca de ser liquidado.Puedes aumentar tus ahorros
                  o pagar todas tus deudas antes de que pierdas tus fondos.
                </p>
              </div> -->
              <!-- <div>
                <h2 class="mt-8 mb-2 p-risk">Garantias liquidas</h2>
                <p>Tus garantias ya no respaldan las deudas que tenias y has sido liquidado.
                </p>
              </div> -->
            </div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="3" class="pa-0">
          <div class="container ml-0">
            <img width="30" src="@/assets/icon-clock.svg" class="ma-2" />
            <h2>Mi actividad</h2>
          </div>
        </v-col>
      </v-row>
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
    </v-card>
  </div>
</template>
<script>
import CardSaveAndBorrow from '@/components/CardSaveAndBorrow.vue';

export default {
  name: 'Balance',
  components: {
    CardSaveAndBorrow,
  },
  computed: {
    chartDataRiskProfile() {
      return this.dataRiskLow;
    },
  },
  data() {
    return {
      dataRiskLow: [
        ['Profile Risk', ''],
        ['', 25],
        ['Riesgo mínimo', 75],
      ],
      dataRiskMedium: [
        ['Profile Risk', ''],
        ['', 50],
        ['Riesgo medio', 0],
        ['Riesgo medio', 50],
      ],
      dataRiskhigh: [
        ['Profile Risk', ''],
        ['', 75],
        ['Riesgo alto', 0],
        ['Riesgo alto', 0],
        ['Riesgo alto', 25],
      ],
      dataRisk: [
        ['Profile Risk', ''],
        ['', 100],
        ['Riesgo alto', 0],
      ],
      optionsRiskProfile: {
        pieHole: 0.7,
        chartArea: {
          top: 27,
          left: 35,
        },
        width: 150,
        backgroundColor: 'transparent',
        pieSliceBorderColor: 'transparent',
        pieSliceText: 'none',
        slices: [{ color: '#A3C5AB' }, { color: '#4CB163' }, { color: '#FF9153' }, { color: '#E65D3D' }],
        legend: 'none',
      },
      chartData: [
        ['Balance', 'Cryptos'],
        [`RBTC | ${0.097}`, 0.097869],
        [`BPRO | ${0.097869}`, 0.0978698],
        [`DOC | ${0.0978698}`, 0.0978698],
        [`BTCx | ${0.978698}`, 0.978698],
      ],
      chartOptions: {
        pieHole: 0.7,
        chartArea: {
          top: 27,
          left: 25,
        },
        width: 455,
        backgroundColor: 'transparent',
        pieSliceBorderColor: 'transparent',
        pieSliceText: 'none',
        pieSliceTextStyle: {
          color: 'black',
        },
        pieResidueSliceColor: '#CFC2AC',
        slices: [
          { color: '#E65D3D' },
          { color: '#DBD332' },
          { color: '#4CB163' },
          { color: '#FF9153' },
        ],
        legend: {
          position: 'left',
          alignment: 'center',
          textStyle: { color: '#FFF' },
        },
      },
      tokens: [
        {
          type: 'Ahorrar',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x435348709101138274sdfg',
        },
        {
          type: 'Pago de rendimiento',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x435348709101138274sdfg',
        },
        {
          type: 'Pedir prestado',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x435348709101138274sdfg',
        },
        {
          type: 'Pedir prestado',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x435348709101138274sdfg',
        },
        {
          type: 'Pedir prestado',
          crypto: 'RBTC',
          amount: 0.5034754,
          date: '28/02/2021',
          hash: '0x435348709101138274sdfg',
        },
      ],
      mySavings: [
        {
          id: 1,
          name: 'RBTC',
          earnings: 0.0123,
          savings: 0.612345,
          price: 1000,
        },
        {
          id: 1,
          name: 'RBTC',
          earnings: 0.0123,
          savings: 0.612345,
          price: 1000,
        },
      ],
      myBorrowing: [
        {
          id: 1,
          name: 'RBTC',
          earnings: 0.0123,
          savings: 0.612345,
          price: 1000,
        },
        {
          id: 1,
          name: 'RBTC',
          earnings: 0.0123,
          savings: 0.612345,
          price: 1000,
        },
      ],
    };
  },
};
</script>
