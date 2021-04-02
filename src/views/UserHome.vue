<template>
  <div class="user-home">
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
            color="rgba(1, 62, 47, 1)"
            :class="showSaveOrBorrow ? 'button-save mr-10' : 'button-save-click mr-10'"
            @click="onSaving"
        >
          Ahorrar
        </v-btn>
        <v-btn
            depressed
            color="rgba(1, 62, 47,1)"
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
              <card-save-and-borrow :data="data" :hiddenButton="showSaveOrBorrow" />
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
              <card-save-and-borrow :data="data" :hiddenButton="showSaveOrBorrow" />
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
            <v-col
                cols="4"
                class=" inMyWallet ma-0 mt-3 pa-0"
                v-for="data in inMyWallet"
                :key="data.id"
            >
              <card
                  :data="data"
                  :showInfoMyWallet="showInfoMyWallet"
                  :hiddenButton="showSaveOrBorrow"
              />
            </v-col>
          </template>
          <template v-else>
            <v-col cols="12">
              <div
                  height="120"
                  class="saving-message container-wallet d-flex flex-column align-start"
              >
                <span class="my-2 mt-4 subtitle-span">
                  No tienes fondos en tu billetera, así que puedes transferir desde
                </span>
                <v-container class="d-flex">
                  <div class="mx-3 d-flex buttons-wallet">
                    <v-btn @click="$router.push({ name: 'BinanceToLiquality'})">
                      <v-img
                          contain
                          width="100"
                          src="@/assets/icon-binance.svg"
                          alt="Binance icon"
                      />
                    </v-btn>
                    <v-btn class="d-flex" @click="$router.push({ name: 'LednToLiquality'})">
                      <v-img
                          width="30"
                          height="25"
                          src="@/assets/icon-lend.svg"
                          alt="Lend icon"
                          contain
                      />
                    </v-btn>
                    <v-btn @click="$router.push({ name: 'BlockfiToLiquality'})">
                      <v-img
                          contain
                          width="100"
                          src="@/assets/icon-blockfi.svg"
                          alt="BlocFi icon"
                      />
                    </v-btn>
                    <v-btn disabled>
                      <v-img
                          contain
                          width="100"
                          src="@/assets/icon-poloniex.svg"
                          alt="Poloniex icon"
                      />
                    </v-btn>
                    <v-btn @click="showModalTransferFunds = true">
                      <v-card flat color="transparent">
                        Transferir desde otras plataformas
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
                </v-container>
                <template v-if="showModalTransferFunds">
                  <modal-transfer-funds
                      :showModal="showModalTransferFunds"
                      @closed="outsideModalTransfer"
                  />
                </template>
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
            <card :data="data" :hiddenButton="showSaveOrBorrow" />
          </v-col>
        </template>
        <template v-else>
          <v-col cols="4" class="ma-0 mt-3 pa-0" v-for="data in suggestionsToBorrow" :key="data.id">
            <card :data="data" :hiddenButton="showSaveOrBorrow" />
          </v-col>
        </template>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import card from '@/components/market/Card.vue';
import CardSaveAndBorrow from '@/components/CardSaveAndBorrow.vue';
import ModalTransferFunds from '@/components/ModalTransferFunds.vue';

export default {
  name: 'Landing',
  components: {
    card,
    CardSaveAndBorrow,
    ModalTransferFunds,
  },
  methods: {
    outsideModalTransfer() {
      this.showModalTransferFunds = false;
    },
    onBorrow() {
      this.showSaveOrBorrow = false;
    },
    onSaving() {
      this.showSaveOrBorrow = true;
    },
  },
  data() {
    return {
      showModalTransferFunds: false,
      showSaveOrBorrow: true,
      showSavings: true,
      showInfoMyWallet: true,
      mySavings: [
        // {
        //   id: 1,
        //   name: 'RBTC',
        //   earnings: 0.0123,
        //   savings: 0.612345,
        //   price: 1000,
        // },
      ],
      inMyWallet: [
        // {
        //   id: 1,
        //   name: 'RBTC',
        //   rate: 9.01,
        //   price: 300,
        // },
        // {
        //   id: 2,
        //   name: 'RBTC',
        //   rate: 9.01,
        //   price: 300,
        // },
        // {
        //   id: 3,
        //   name: 'RBTC',
        //   rate: 9.01,
        //   price: 300,
        // },
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
          borrowing: 9.01,
          price: 300,
          debts: 1.7,
        },
        {
          id: 2,
          name: 'RBTC',
          borrowing: 9.01,
          price: 300,
          debts: 1.7,
        },
      ],
    };
  },
};
// RBTC, RIF, DoC y rUSDT
</script>
