<template>
  <div class="balance">
    <navbar />
    <v-card flat color="transparent" width="75%" class="card">
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
                <div class="mybalance-cards d-flex justify-center align-center">
                  <div>
                    <p class="p-bold">1000.000 USD</p>
                    <p>Ahorrados</p>
                  </div>
                </div>
                <div class="mybalance-cards ml-5 d-flex justify-center align-center">
                  <div>
                    <p class="p-bold">40.000 USD</p>
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
        <v-col cols="4">
          <v-card class="mt-16" width="100%" color="transparent" flat>
            <div class="net-balance d-flex flex-column">
              <div class="mt-4 ml-6">
                <p class="p-bold">60.000 USD</p>
                <p>Balance neto</p>
              </div>
              <div class="line mt-4 mx-auto"></div>
            </div>
            <div class="user-risk mt-8">hola</div>
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="3" class="pa-0">
          <div class="container">
            <img width="30" src="@/assets/icon-clock.svg" class="ma-2" />
            <h2>Mis actividad</h2>
          </div>
        </v-col>
      </v-row>
      <v-row class="ma-0 mb-7">
        <v-simple-table class="mt-2 ml-3">
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
              <tr v-for="item in desserts" :key="item.hash">
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
import Navbar from '@/components/Navbar.vue';
import CardSaveAndBorrow from '@/components/CardSaveAndBorrow.vue';

export default {
  name: 'Balance',
  components: {
    Navbar,
    CardSaveAndBorrow,
  },
  data() {
    return {
      desserts: [
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
