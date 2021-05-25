<template>
  <v-dialog v-model="dialog" :content-class="isInBorrowMenu ? 'borrow-size' : 'withdraw-size'">
    <v-card class="user-action" v-click-outside="onClickOutside" width="100%" height="88vh">
      <v-row class="button ma-auto d-flex justify-center justify-space-around">
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
      <div class="slider-container">
        <v-row class="ma-0 mt-5">
          <v-col cols="auto" class="px-0">
            <v-img class="mr-2" width="32" height="32" :src="symbolImg" contain/>
          </v-col>
          <v-col>
            <h2 class="h2-heading">{{ info.underlyingSymbol }}</h2>
          </v-col>
        </v-row>
        <!-- v-row class="d-flex  mb-2">
          <v-img class="mr-2" height="32" :src="symbolImg" contain/>
          <h1>{{ info.underlyingSymbol }}</h1>
        </v-row> < -->
        <template v-if="isInBorrowMenu">
          <v-row class="ma-auto d-flex" style="height:97%; width:100%;">
            <div class="d-flex flex-column justify-space-between" style="height:100%;width:40%;">
              <div>
                <p>Simulador de colateral</p>
              </div>
              <div>
                <div class="collateral-chart">
                  <GChart type="ColumnChart" :data="chartData" :options="chartOptions" />
                </div>
              </div>
              <div>
                <div class="risk-charts">
                  <risk-chart :riskRate="riskValue" style="height:97%;width:97%;"/>
                </div>
              </div>
            </div>
            <div class="d-flex flex-column justify-space-between" style="width:60%;">
              <div class="d-flex flex-column justify-space-between">
                <div class="d-flex justify-space-between mb-4">
                  <div class="d-flex flex-column">
                    <p class="title-modal-rate ma-0">
                      {{ actionBalance }}
                    </p>
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
                <v-row class="ma-0 input-box" v-bind:class="[ validAmount
                  ? 'valid' : amount === null ? '' : 'invalid' ]">
                  <v-col class="pa-0">
                    <v-text-field type="number" v-model="amount" dark
                                  :rules="[rules.marketCash, rules.liquidity,
                                  rules.minBalance, rules.borrowBalance]"
                                  class="input-text"
                                  dense full-width single-line solo flat
                                  height="62" @input="handleSlider"/>
                  </v-col>
                  <v-col cols="auto" class="pa-0 d-flex justify-end pt-3">
                    <v-btn height="40" text color="#A3B8A7" @click="setMaxAmount">
                      MÁX
                    </v-btn>
                  </v-col>
                </v-row>
                <div>
                  <v-slider
                    hide-details
                    min="0"
                    max="100"
                    color="#FFBD98"
                    track-color=" #062E24"
                    tick-size="4"
                    thumb-label
                    v-model="sliderValue"
                    @change="handleBalance"
                    class="mt-12">
                  </v-slider>
                  <div class="d-flex justify-space-between">
                    <p>0%</p>
                    <p>100%</p>
                  </div>
                </div>
              </div>
              <v-divider></v-divider>
              <div class="d-flex justify-center">
                <div class="d-flex" style="width:60%;">
                  <v-img  src="@/assets/icons/infoMarkets.svg" width="51" height="45" contain />
                  <p>Por defecto, todos tus depósitos se <br> utilizan como colateral
                    para realizar un <br> préstamo en cualquier mercado.</p>
                </div>
              </div>
              <v-btn  height="42" :color="buttonColor" :disabled="!validAmount"
                @click="borrowOrRepay">
                {{ buttonLabel }}
              </v-btn>
            </div>
          </v-row>
        </template>
        <template v-else>
          <div class="d-flex justify-space-between mb-4">
            <div class="d-flex flex-column">
              <p class="title-modal-rate ma-0">
                {{ actionBalance }}
              </p>
              <h2>{{ tokenBalance | formatDecimals }} {{ info.underlyingSymbol }}</h2>
              <p><span>{{ tokenPrice | formatPrice }} USD</span></p>
            </div>
            <div class="d-flex">
              <div>
                <p>Debes pagar</p>
                <h2>{{ info.totalBalance | formatDecimals }} {{ info.underlyingSymbol }}</h2>
                <p>{{ tokenPrice | formatPrice }} USD</p>
              </div>
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-icon class="align-start ml-4 mt-1" small color="#FFFFFF"
                    v-bind="attrs" v-on="on">
                    mdi-information
                  </v-icon>
                </template>
                <span></span>
              </v-tooltip>
            </div>
          </div>
          <v-divider class="mt-10"></v-divider>
          <v-row class="ma-0 mt-10 input-box" v-bind:class="[ validAmount
            ? 'valid' : amount === null ? '' : 'invalid' ]">
            <v-col class="pa-0">
              <v-text-field type="number" v-model="amount" dark
                            :rules="[rules.marketCash, rules.liquidity,
                            rules.minBalance, rules.borrowBalance]"
                              class="input-text"
                            dense full-width single-line solo flat
                            height="62" @input="handleRepayBalance"/>
            </v-col>
            <v-col cols="auto" class="pa-0 d-flex justify-end pt-3">
              <v-btn height="40" text color="#A3B8A7" @click="setMaxAmount">
                MÁX
              </v-btn>
            </v-col>
          </v-row>
          <div>
            <v-slider
              hide-details
              min="0"
              max="100"
              color="#FFBD98"
              track-color=" #062E24"
              tick-size="4"
              thumb-label
              v-model="sliderValue"
              @change="handleBalance"
              class="mt-12">
            </v-slider>
            <div class="d-flex justify-space-between">
              <p>0%</p>
              <p>100%</p>
            </div>
          </div>
          <div class="mt-16 pt-9">
            <v-btn  height="42" :color="buttonColor" :disabled="!validAmount"
              @click="borrowOrRepay" width="100%">
              {{ buttonLabel }}
            </v-btn>
          </div>
        </template>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import * as constants from '@/store/constants';
import {
  CRbtc,
  CToken,
  Market,
  Comptroller,
} from '@/middleware';
import Borrow from '@/assets/icons/borrow.svg';
import Pay from '@/assets/icons/pay.svg';
import { mapState } from 'vuex';
import RiskChart from '../users/RiskChart.vue';

export default {
  name: 'BorrowRepay',
  components: {
    RiskChart,
  },
  data() {
    return {
      markets: [],
      comptroller: null,
      riskValue: 100,
      amount: 0,
      sliderValue: 0,
      totalBalance: null,
      showModalConnectWallet: false,
      dialog: this.showModal,
      isInBorrowMenu: this.inBorrowMenu,
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
        ['', '', { role: 'style' }],
        ['Colateral', 0, '#FF9153'],
        ['Cantidad a pedir prestado', 0, '#FFBD98'],
      ],
      chartOptions: {
        width: 300,
        height: 200,
        backgroundColor: 'transparent',
        legend: {
          position: "none"
        },
        vAxis: {
          title: 'Monto',
          colors: ['#9575cd', '#33ac71'],
          labelStyle: { color: '#FFF' },
          titleTextStyle: { color: '#FFF' },
          titlePosition: { position: 'right' },
          textStyle: { color: '#FFF' },
          gridLines: { count: 10 },
          viewWindow: {
            max: 100,
            min: 0,
          },
        },
        hAxis: {
          textStyle: { color: '#FFF' },
          legend: 'none',
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
    ...mapState({
      chainId: (state) => state.Session.chainId,
      address: (state) => state.Session.walletAddress,
    }),
    actionIcon() {
      return this.isInBorrowMenu ? Borrow : Pay;
    },
    actionBalance() {
      return this.isInBorrowMenu ? 'Puedes pedir prestado' : 'Pediste prestado';
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
    borrowValueInUSD() {
      return this.amount * this.info.underlyingPrice;
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
    async amount() {
      this.riskValue = await this.comptroller
        .hypotheticalHealthFactor(this.markets, this.chainId,
          this.address, this.borrowValueInUSD) * 100;
    },
  },
  methods: {
    getSymbolImg() {
      this.db
        .collection('markets-symbols')
        .doc(this.info.underlyingSymbol)
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
    handleBalance() {
      const balance = (this.sliderValue * this.tokenBalance) / 100;
      const tempData = [...this.chartData];
      this.amount = balance.toFixed(10);
      tempData[2][1] = (balance * 100) / this.tokenBalance;
      this.chartData = tempData;
    },
    handleRepayBalance() {
      const value = (this.amount / this.info.totalBalance) * 100;
      this.sliderValue = value;
    },
    handleSlider() {
      const value = (this.amount / this.tokenBalance) * 100
      this.sliderValue = value;
      const balance = (this.sliderValue * this.tokenBalance) / 100;
      const tempData = [...this.chartData];
      tempData[2][1] = (balance * 100) / this.tokenBalance;
      this.chartData = tempData;
    },
    async getMarkets() {
      const marketsAddresses = await this.comptroller.allMarkets;
      marketsAddresses.forEach(async (marketAddress) => {
        const isCRbtc = await Market.isCRbtc(marketAddress);
        if (isCRbtc) {
          this.markets.push(new CRbtc(marketAddress, this.chainId));
        } else {
          this.markets.push(new CToken(marketAddress, this.chainId));
        }
      });
    },
    setMaxAmount() {
      if (this.inBorrowMenu) {
        this.amount = this.tokenBalance.toFixed(10);
      } else {
        this.amount = this.info.totalBalance.toFixed(10);
      }
      this.handleSlider();
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getMarkets();
  },
  async mounted() {
    this.getSymbolImg();
    const tempData = [...this.chartData];
    const colateral = await this.comptroller.getAccountLiquidity(this.address);
    tempData[1][1] = (colateral * 100);
    this.chartData = tempData;
  },
};
</script>
