<template>
  <div class="user-home">
    <navbar />
    <v-row class="user-home-title">
      <v-col cols="3" />
      <v-col cols="6" class="d-flex justify-center mt-6">
        <h1>Saca rendimiento de tus Bitcoins</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3" />
      <v-col cols="6" class="button d-flex justify-center">
        <v-btn
          depressed
          color="rgba(1, 62, 47, 0.85)"
          :class="showSaveOrBorrow ? 'button-save mr-10' : 'button-save-click mr-10'"
          @click="onSaving"
        >
          Ahorrar
        </v-btn>
        <v-btn
          depressed
          color="rgba(1, 62, 47, 0.85)"
          :class="showSaveOrBorrow ? 'button-borrow ml-8' : 'button-borrow-click ml-8'"
          @click="onBorrow"
        >
          Pedir prestado
        </v-btn>
      </v-col>
    </v-row>
    <v-card class="card mb-5" flat>
      <v-row class="subtitle ma-0">
        <template v-if="showSaveOrBorrow">
          <v-col cols="3" class="pa-0">
            <div class="d-flex container">
              <img src="@/assets/icon-pig.png" />
              <h2>Mis ahorros</h2>
            </div>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="3" class="pa-0">
            <div class="d-flex container">
              <img src="@/assets/icon-pay.png" />
              <h2>Mis deudas</h2>
            </div>
          </v-col>
        </template>
      </v-row>
      <template v-if="showSaveOrBorrow">
        <v-row class="ma-0">
          <template v-if="mySavings[0]">
            <v-col cols="4" class="ma-0 mt-3 pa-0" v-for="data in mySavings" :key="data.id">
                <card-save-and-borrow :data="data" :hiddenButton="showSaveOrBorrow"/>
            </v-col>
          </template>
          <template v-else>
            <v-col cols="12">
              <div class="saving-message d-flex align-center">
                <span class="subtitle-span">
                  No has ahorrado cryptos aún
                </span>
              </div>
            </v-col>
          </template>
        </v-row>
      </template>
      <template v-else>
        <v-row class="ma-0">
          <template v-if="myBorrowing[0]">
            <v-col cols="4" class="ma-0 mt-3 pa-0" v-for="data in myBorrowing" :key="data.id">
                <card-save-and-borrow :data="data" :hiddenButton="showSaveOrBorrow"/>
            </v-col>
          </template>
          <template v-else>
            <v-col cols="12">
              <div class="saving-message d-flex align-center">
                <span class="subtitle-span">
                  No tienes prestamos aún
                </span>
              </div>
            </v-col>
          </template>
        </v-row>
      </template>
      <br />
      <template v-if="showSaveOrBorrow">
        <v-row class="subtitle ma-0">
          <v-col cols="3" class="pa-0">
            <div class="d-flex container">
              <img src="@/assets/icon-modal.png" />
              <h2>Tengo en mi billetera</h2>
            </div>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <template v-if="inMyWallet[0]">
            <v-col cols="4" class="ma-0 mt-3 pa-0" v-for="data in inMyWallet" :key="data.id">
              <template v-if="showSaveOrBorrow">
                <card :data="data" :hiddenButton="showSaveOrBorrow" />
              </template>
              <template v-else>
                <card :data="data" :hiddenButton="showSaveOrBorrow" />
              </template>
            </v-col>
          </template>
          <template v-else>
            <v-col cols="12">
              <div
                height="120"
                class="saving-message container-wallet d-flex flex-column align-start"
              >
                <span class="my-2 subtitle-span">
                  Puedes transferir tus fondos desde
                </span>
                <container class="d-flex">
                  <div class="mx-3 d-flex buttons-wallet">
                    <v-btn class="pa-0">
                      <img width="80" src="../assets/icon-binance.svg" alt="Binance icon" />
                    </v-btn>
                    <v-btn>
                      <img width="100" src="../assets/icon-lend.svg" alt="Binance icon" />
                    </v-btn>
                    <v-btn>
                      <img width="100" src="../assets/icon-blockfi.svg" alt="Binance icon" />
                    </v-btn>
                    <v-btn>
                      <img width="100" src="../assets/icon-poloniex.svg" alt="Binance icon" />
                    </v-btn>
                    <v-btn>
                      <v-card flat color="transparent">
                        Transferir desde otras platformas
                      </v-card>
                    </v-btn>
                  </div>
                  <div class="button-disconnect-wallet">
                    <p class="ml-1 mb-2">
                      O puedes deconectar tu billetera del navegador y conectarla donde dispongas de
                      tus fondos
                    </p>
                    <v-btn class="ml-1" color="#4CB163" width="92%">Desconectar billetera</v-btn>
                  </div>
                </container>
              </div>
            </v-col>
          </template>
        </v-row>
        <br />
      </template>
      <v-row class="subtitle ma-0">
        <v-col cols="3" class="pa-0">
          <div class="d-flex container">
            <img src="@/assets/logo.png" />
            <h2>Sugerencias para ti</h2>
          </div>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <template v-if="showSaveOrBorrow">
          <v-col cols="4" class="ma-0 mt-3 pa-0" v-for="data in suggestionsToSave" :key="data.id">
            <template v-if="showSaveOrBorrow">
              <card :data="data" :hiddenButton="showSaveOrBorrow" />
            </template>
            <template v-else>
              <card :data="data" :hiddenButton="showSaveOrBorrow" />
            </template>
          </v-col>
        </template>
        <template v-else>
          <v-col cols="4" class="ma-0 mt-3 pa-0" v-for="data in suggestionsToBorrow" :key="data.id">
            <template v-if="showSaveOrBorrow">
              <card :data="data" :hiddenButton="showSaveOrBorrow" />
            </template>
            <template v-else>
              <card :data="data" :hiddenButton="showSaveOrBorrow" />
            </template>
          </v-col>
        </template>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import card from '@/components/Card.vue';
import CardSaveAndBorrow from '@/components/CardSaveAndBorrow.vue';

export default {
  name: 'Landing',
  components: {
    card,
    Navbar,
    CardSaveAndBorrow,
  },
  methods: {
    onBorrow() {
      this.showSaveOrBorrow = false;
    },
    onSaving() {
      this.showSaveOrBorrow = true;
    },
  },
  data() {
    return {
      showSaveOrBorrow: true,
      showSavings: true,
      mySavings: [
        {
          id: 1,
          name: 'RBTC',
          earnings: 0.0123,
          savings: 0.612345,
          price: 1000,
        },
      ],
      inMyWallet: [
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 2,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 3,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
      ],
      suggestionsToSave: [
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 2,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 3,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
      ],
      suggestionsToBorrow: [
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 2,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 3,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
      ],
      myBorrowing: [
        {
          id: 1,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
        {
          id: 2,
          name: 'RBTC',
          rate: 9.01,
          price: 300,
        },
      ],
    };
  },
};
// RBTC, RIF, DoC y rUSDT
</script>
