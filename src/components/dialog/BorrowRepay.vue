<template>
  <v-dialog v-model="dialog" width="65%" max-height="65%">
    <v-card class="borrow-repay" v-click-outside="onClickOutside" width="100%" height="84vh">
      <!-- <v-row class="button ma-0 pt-3 d-flex justify-center justify-space-around">
        <v-btn
            depressed
            color="transparent"
            @click="isInBorrowMenu = true"
            :class="isInBorrowMenu ? 'button-save' : 'button-save-click'"
        >
          Pedir prestado
        </v-btn>
        <v-btn
            depressed
            color="transparent"
            @click="isInBorrowMenu = false"
            :class="isInBorrowMenu ? 'button-withdraw' : 'button-withdraw-click'"
        >
          Pagar
        </v-btn>
      </v-row>
      <v-row class="d-flex justify-center ma-0 ">
        <div class="modal-container mt-6 ml-6">
          <v-img :src="actionIcon" class="my-3" width="64"
                 alt="action icon" contain />
          <p class="title-modal-rate ma-0">
            {{ actionBalance }}
          </p>
          <p class="ma-0 p-bold p-name-data">
            {{ tokenBalance | formatDecimals }} {{ info.underlyingSymbol }}
          </p>
          <p class="ma-0 mb-6 p-italic">
            ={{ tokenPrice | formatPrice }} USD
          </p>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex flex-column modal-container-img mr-6 mt-6">
          <div :class="isInBorrowMenu ? 'modal-icon' : 'modal-icon-click'">
            <v-img class="mr-2" width="42" height="42" :src="symbolImg" contain />
            <div>
              <p class="ma-0 p-bold p-name mt-2">
                1 {{ info.underlyingSymbol }}
              </p>
              <p class="ma-0 p-italic">= {{ info.underlyingPrice | formatPrice }} USD</p>
            </div>
          </div>
          <template v-if="isInBorrowMenu">
            <p class="ma-0 mb-1">Interés Anual</p>
            <p class="ma-0 modal-rate">{{ info.rate }} %</p>
          </template>
        </div>
      </v-row>
      <v-row class="d-flex align-center flex-column ma-0">
        <div class="modal-line"/>
        <div class="d-flex justify-start modal-contain-subtitle">
          <p class="ma-0 mt-5 mb-2">{{ actionDescription }}</p>
        </div>
        <v-text-field placeholder="Escribe el monto" type="number"
                      v-model="amount" solo dense
                      :rules="[rules.marketCash, rules.liquidity,
                      rules.minBalance, rules.borrowBalance]" />
        <v-btn class="modal-button mb-6" height="42" :color="buttonColor"
               width="300" :disabled="!validAmount" @click="borrowOrRepay">
          {{ buttonLabel }}
        </v-btn>
      </v-row> -->
      <v-row class="button ma-auto pt-3 d-flex justify-center justify-space-around">
        <v-btn
            depressed
            color="transparent"
            @click="isInBorrowMenu = true"
            :class="isInBorrowMenu ? 'button-save' : 'button-save-click'"
        >
          Pedir prestado
        </v-btn>
        <v-btn
            depressed
            color="transparent"
            @click="isInBorrowMenu = false"
            :class="isInBorrowMenu ? 'button-withdraw' : 'button-withdraw-click'"
        >
          Pagar
        </v-btn>
      </v-row>
      <div class="ma-auto container cualquiera">
        <v-row class="ma-auto mb-2">
          <!-- <v-img position="left center" height="20" :src="symbolImg" contain/> -->
          <h1>{{ info.underlyingSymbol }}</h1>
        </v-row>
        <v-row class="ma-auto d-flex" style="height:97%; width:94%;">
          <div class="d-flex flex-column ma-auto" style="width:40%; height:100%">
            <v-row>
              <p>Simulador de colateral</p>
            </v-row>
            <v-row>
              <div class="collateral-chart">
                <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
              </div>
            </v-row>
            <v-row>
              <div class="risk-charts">
                <v-progress-circular class="risk-graph" :size="130" :width="16"
                  :value="100" color="#A3C5AB"/>
              </div>
            </v-row>
          </div>
          <div class="d-flex flex-column justify-space-around" style="width:60%;">
            <div class="d-flex flex-column justify-space-between">
              <div class="d-flex justify-space-between mb-4">
                <div class="d-flex flex-column">
                  <p>Puedes pedir prestado</p>
                  <h2>{{ tokenBalance | formatDecimals }} {{ info.underlyingSymbol }}</h2>
                  <p><span>{{ tokenPrice | formatPrice }} USD</span></p>
                </div>
                <div class="d-flex">
                  <div>
                    <p>Tasa de interés anual <br> dinámica actual</p>
                    <h2 class="ma-0 modal-rate">{{ info.rate }} %</h2>
                  </div>
                  <v-tooltip right>
                     <template v-slot:activator="{ on, attrs }">
                      <v-icon class="align-start ml-4 mt-1" small color="#FFFFFF"
                        v-bind="attrs" v-on="on">
                        mdi-information
                      </v-icon>
                     </template>
                     <span>La tasa de interés varía cuando <br> otros usuarios
                           realizan <br> transacciones en el protocolo.</span>
                  </v-tooltip>
                </div>
              </div>
              <v-divider></v-divider>
            </div>
            <div>
              <p>Escribe la cantidad que vas a pedir prestada.</p>
              <form>
                <input type="text" id="" name="" :value="hola" placeholder="MÁX">
              </form>
              <div>
                <v-slider
                  hide-details
                  step="3"
                  min="1"
                  max="100"
                  color="#FFBD98"
                  track-color=" #062E24"
                  tick-size="4"
                  v-model="sliderValue"
                  @change="handleBalance">
                </v-slider>
                <div class="d-flex justify-space-between">
                  <p>1%</p>
                  <p>100%</p>
                </div>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex">
              <!-- <p>Elige como colateral una o varias de tus cryptos depositadas</p> -->
              <v-img  src="@/assets/icons/infoMarkets.svg" width="51" height="45" contain />
              <p>Por defecto, todos tus depósitos se <br> utilizan como colateral
                 para realizar un <br> préstamo en cualquier mercado.</p>
            </div>
            <v-btn disabled>
              Pedir prestado
            </v-btn>
          </div>
        </v-row>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import * as constants from '@/store/constants';
import Borrow from '@/assets/icons/borrow.svg';
import Pay from '@/assets/icons/pay.svg';
// import HappyFace from '@/assets/health/face-happy.png';
// import SadFace from '@/assets/health/face-sad.png';

export default {
  name: 'BorrowRepay',
  data() {
    return {
      sliderValue: 0,
      showModalConnectWallet: false,
      dialog: this.showModal,
      isInBorrowMenu: this.inBorrowMenu,
      amount: null,
      db: this.$firebase.firestore(),
      symbolImg: null,
      rules: {
        liquidity: () => (this.isInBorrowMenu ? Number(this.amountAsUnderlyingPrice) <= Number(this
          .info.liquidity) : true) || 'No tienes suficiente colateral',
        marketCash: () => (this.isInBorrowMenu ? Number(this.amount) <= Number(this
          .info.cash) : true) || 'Este mercado no tiene fondos suficientes',
        minBalance: () => (!this.isInBorrowMenu ? Number(this.amount) <= Number(this
          .info.underlyingBalance) : true) || 'No tienes fondos suficientes',
        borrowBalance: () => (!this.isInBorrowMenu ? Number(this.amount) <= Number(this
          .info.borrowBalance) : true) || 'No debes tanto',
      },
      chartData: [
        ['Year', 'Asia', 'Europe'],
        ['2012', 900, 390],
        ['2013', 1000, 0],
      ],
      chartOptions: {
        isStacked: true,
        backgroundColor: 'transparent',
        slices: [
          { color: '#E65D3D' },
          { color: '#DBD332' },
          { color: '#4CB163' },
        ],
        legend: {
          textStyle: { color: '#FFF' },
        },
      },
    };
  },
  props: {
    showModal: {
      type: Boolean,
      required: true,
    },
    info: {
      type: Object,
      required: true,
    },
    inBorrowMenu: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    actionIcon() {
      return this.isInBorrowMenu ? Borrow : Pay;
    },
    actionBalance() {
      return this.isInBorrowMenu ? 'Puedes pedir prestado:' : 'Debes pagar:';
    },
    actionDescription() {
      const desc = 'Escribe la cantidad que vas a';
      return this.isInBorrowMenu ? `${desc} pedir prestada` : `${desc} pagar`;
    },
    amountAsUnderlyingPrice() {
      return Number(this.amount * this.info.underlyingPrice);
    },
    buttonColor() {
      return this.isInBorrowMenu ? '#FF9153' : '#E65D3D';
    },
    buttonLabel() {
      return this.isInBorrowMenu ? 'Pedir prestado' : 'Pagar';
    },
    tokenBalance() {
      return this.isInBorrowMenu ? (this.info.liquidity / this.info
        .underlyingPrice) : this.info.borrowBalance;
    },
    tokenPrice() {
      return this.tokenBalance * this.info.underlyingPrice;
    },
    validAmount() {
      return this.amount > 0 && typeof this
        .rules.liquidity() !== 'string' && typeof this
        .rules.marketCash() !== 'string' && typeof this
        .rules.minBalance() !== 'string' && typeof this
        .rules.borrowBalance() !== 'string';
    },
  },
  watch: {
    isInBorrowMenu() {
      this.amount = null;
    },
  },
  methods: {
    getSymbolImg() {
      this.db
        .collection('markets-symbols')
        .doc(this.info.symbol)
        .get()
        .then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
    },
    outsideConnectWallet() {
      this.showModalConnectWallet = false;
    },
    onClickOutside() {
      this.dialog = false;
      this.$emit('closed');
    },
    borrowOrRepay() {
      this.$emit('action', {
        amountIntended: this.amount,
        action: this.isInBorrowMenu ? constants.USER_ACTION_BORROW : constants.USER_ACTION_REPAY,
      });
    },
    created() {
      this.getSymbolImg();
    },
    handleBalance() {
      const balance = (this.sliderValue * this.info.liquidity) / 100;
      console.log('balance', this.info.balance);
      console.log('balance slider', this.sliderValue);
      console.log(balance);
    },
  },
  mounted() {
    console.log('Pollo:', this.info);
  },
};
</script>
