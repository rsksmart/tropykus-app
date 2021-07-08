<template>
    <div class="deposit">
      <h2 class="h2-heading text-primary">{{ $t('deposit.title')}}</h2>
      <div class="h3-sections-heading text-deposit text-detail mb-9 ">
        {{ $t('deposit.subtitle')}}
      </div>
      <div class="d-flex justify-center">
        <v-card width="888" height="869" elevation="0"
          class="deposit-card secondary-color mb-16">
          <v-row class="mb-6">
            <v-col md="4">
            <div class="p1-descriptions mb-3">{{ $t('deposit.description1')}}</div>
            <div class="primary-bg select-box">
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <div class="selected-item d-flex align-center"
                    v-bind="attrs" v-on="on">
                    <img class="ml-6 mr-3" :src="select.img" />
                    <span class="h3-sections-heading text-uppercase">
                      {{ select.underlyingSymbol }}
                    </span>
                    <v-icon class="select-icon" large color="text-primary">
                      mdi-chevron-down
                    </v-icon>
                  </div>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(market, index) in getMarkets"
                    :key="index"
                    class="select-menu-item"
                    @click="updateRoute(market)"
                  >
                    <div class="d-flex">
                      <img :src="market.img" class="ml-2 mr-3"/>
                      <span class="h3-sections-heading text-uppercase">
                        {{ market.underlyingSymbol }}
                      </span>
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>

            </div>
            </v-col>
            <v-col md="8">
              <div class="p1-descriptions mb-3 text-info">
                {{ $t('deposit.description2')}}
              </div>
              <v-row class="ma-0 input-box primary-bg"
              >
                <v-col class="pa-0">
                  <v-text-field type="number" dark class="h1-title text-info pa-0"
                    dense full-width single-line flat height="62"
                    v-model="amount"
                    :rules="[rules.leverage, rules.minBalance]"
                    :placeholder="'0 ' + select.underlyingSymbol"
                  />
                </v-col>
                <v-col cols="auto" class="pa-0 d-flex justify-end pt-3">
                  <v-btn height="40" text>
                    <span class="text-primary">MÁX</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mb-9">
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">{{ $t('deposit.description3')}}</div>
              <div class="p2-reading-values text-info">
                {{tokenBalance | formatDecimals(select.underlyingSymbol) }}
                {{select.underlyingSymbol}}
              </div>
              <div class="p3-USD-values text-info">
                {{tokenBalanceUsd | formatPrice}}
              </div>
            </v-col>

            <v-col md="8">
              <v-slider
                class="mt-3 deposit-slider"
                min="0"
                max="100"
                color="#4CB163"
                track-color=" #4CB163"
                tick-size="10"
                thumb-label
                v-model="sliderAmountPercentage" @click="setAmount"
              />
              <v-row class="ma-0">
                <v-col class="pa-0 d-flex justify-start">
                  <span class="p1-descriptions">1%</span>
                </v-col>
                <v-col class="pa-0 d-flex justify-end mr-3">
                  <span class="p1-descriptions">100%</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">
                {{ $t('deposit.description4')}}
              </div>
              <div class="p2-reading-values text-info">
                {{ info.rate }} %
              </div>
            </v-col>

            <v-col md="8">
              <v-btn text class="btn-action"
                :disabled="(amount === null || amount === '') ? true : false"
                :class="amount ? 'primary-color' : 'secondary-bg'"
                 @click="menuAction"
              >
                <span class="b1-main white--text">

                  {{
                    account ? $t('deposit.btn2') : $t('deposit.btn1')
                  }}
                </span>
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="divider"></v-divider>

          <v-row>
            <v-col md="4">
              <h3 class="h3-sections-heading text-detail">
                {{ $t('deposit.calculator.title')}}
              </h3>
            </v-col>
          </v-row>

          <v-row class="mb-9">
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">
                {{ $t('deposit.calculator.description1')}}
              </div>
              <div class="p2-reading-values text-info">
                 {{ possibleEarnings | formatDecimals }} {{ info.underlyingSymbol }}
              </div>
              <div class="p3-USD-values text-info">
                {{ possibleEarningsUSD | formatPrice }} USD
              </div>
            </v-col>

            <v-col md="8">
              <div class="p1-descriptions mb-3 text-info">
                {{ $t('deposit.calculator.description2')}}
              </div>
              <v-row class="ma-0 input-box primary-bg">
                <v-col class="pa-0">
                  <v-text-field type="number" dark class="h1-title text-info pa-0"
                    dense full-width single-line flat height="62"
                    v-model="amountEarning"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <!-- {{returnYear}} -->
            {{sliderYear}}
          </v-row>

          <v-row class="mb-10">
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">
                {{ $t('deposit.calculator.description3')}}
              </div>
              <div class="p2-reading-values text-info">
                {{ possibleEarningsPlusDeposit | formatDecimals }} {{ info.underlyingSymbol }}
              </div>
              <div class="p3-USD-values text-info">
                {{ possibleEarningsPlusDepositUSD | formatPrice }} USD
              </div>
            </v-col>

            <v-col md="8">
              <div class="p1-descriptions text-info">
                {{ $t('deposit.calculator.description4')}}
              </div>
              <v-slider
                class="mt-3 deposit-slider"
                min="1"
                max="5"
                color="#4CB163"
                track-color=" #4CB163"
                tick-size="10"
                thumb-label
                v-model="sliderYear"
              />
              <v-row class="ma-0">
                <v-col class="pa-0 d-flex justify-start">
                  <span class="p1-descriptions">1 year</span>
                </v-col>
                <v-col class="pa-0 d-flex justify-end mr-3">
                  <span class="p1-descriptions">5 year</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center mt-16">
            <div class="p1-descriptions text-info mr-6">
              {{ $t('deposit.description5')}}
            </div>
            <div class="p1-descriptions text-info">{{ $t('deposit.description6')}}</div>
          </v-row>

        </v-card>

        <template v-if="showModalConnectWallet">
          <connect-wallet
            :showModal="showModalConnectWallet"
            @closed="outsideConnectWallet"
          />
        </template>

        <template v-if="isLoading">
          <loading :showModal="isLoading" :data="infoLoading" @closed="closeDialog">
          </loading>
        </template>
      </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import ConnectWallet from '@/components/dialog/ConnectWallet.vue';
import Loading from '@/components/modals/Loading.vue';
import * as constants from '@/store/constants';
import {
  CToken,
  CRbtc,
  Market,
  Comptroller,
} from '@/middleware';

export default {
  name: 'Deposit',
  components: {
    ConnectWallet,
    Loading,
  },
  data() {
    return {
      constants,
      db: this.$firebase.firestore(),
      comptroller: undefined,
      getMarkets: [],
      market: null,
      isLoading: false,
      infoLoading: {
        amount: '',
        symbol: '',
        wallet: true,
        loading: true,
        success: null,
      },
      select: {
        symbol: '',
        img: '',
      },
      showModalConnectWallet: false,
      sliderAmountPercentage: 0,
      sliderYear: 0,
      amount: null,
      amountEarning: null,
      marketAddress: null,
      info: {
        underlyingSymbol: null,
        rate: null,
        underlyingPrice: null,
        underlyingBalance: null,
        liquidity: null,
        interestBalance: null,
        supplyBalance: null,
        borrowBalance: null,
      },
      data: {
        underlyingBalance: null,
        supplyBalance: null,
        price: null,
      },
      rules: {
        leverage: () => (this.account ? this.info.borrowBalance <= 0 : true) || this.$t('dialog.supply-redeem.rule1'),
        minBalance: () => (this.account ? Number(this.amount) <= Number(this
          .data.underlyingBalance) : true) || this.$t('dialog.supply-redeem.rule2'),
      },
    };
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
      markets: (state) => state.Session.markets,
      walletAddress: (state) => state.Session.walletAddress,
      account: (state) => state.Session.account,
    }),
    tokenBalanceUsd() {
      return this.data.underlyingBalance * this.data.price;
    },
    tokenBalance() {
      return this.data.underlyingBalance;
    },
    possibleEarnings() {
      return +this.amountEarning ? (((this.amountEarning * this.supplyRate) + (this.info
        .supplyBalance * this.supplyRate)) * this.sliderYear) : (this.info
        .interestBalance * this.sliderYear);
    },
    possibleEarningsUSD() {
      return this.possibleEarnings * this.info.underlyingPrice;
    },
    possibleEarningsPlusDeposit() {
      if (+this.amountEarning) {
        return this.possibleEarnings > this.info.interestBalance ? (+this.info
          .supplyBalance + +this.amountEarning + +this.possibleEarnings) : (this.info
          .supplyBalance * this.sliderYear);
      }
      return this.info.supplyBalance + this.possibleEarnings;
    },
    possibleEarningsPlusDepositUSD() {
      return this.possibleEarningsPlusDeposit * this.info.underlyingPrice;
    },
    supplyRate() {
      return this.info.rate / 100;
    },
    // returnYear
  },
  watch: {
    markets() {
      if (this.markets.length > 3) this.getMarketsInfo();
    },
    $route() {
      this.getMarket();
    },
    async account() {
      this.refresh();
    },
  },
  methods: {
    async menuAction() {
      if (!this.account) {
        this.showModalConnectWallet = true;
        return;
      }
      this.isLoading = true;
      this.infoLoading.loading = true;
      this.infoLoading.wallet = true;
      await this.market.supply(this.account, this.amount)
        .then(() => {
          this.infoLoading.wallet = false;
          this.market.wsInstance.on('Mint', (from) => {
            if (from === this.walletAddress) {
              if (!this.isLoading) {
                this.isLoading = true;
              }
              this.getMarket();
              this.infoLoading.loading = false;
              this.infoLoading.amount = this.amount;
              this.infoLoading.symbol = this.select.symbol;
            }
          });
        })
        .catch(this.showError);

      this.market.wsInstance.on('Failure', (from, to, amount, event) => {
        console.info(`Failure from ${from} Event: ${JSON.stringify(event)}`);
        const { error, detail, info } = event.args;
        console.log(`Error: ${error}, detail: ${detail}, info: ${info}`);
        if (this.walletAddress === from) {
          // this.showError();
          console.log('error');
        }
      });
    },
    async getMarketsInfo() {
      this.getMarkets = [];
      await this.markets.map(async (market) => {
        try {
          const data = {};
          data.symbol = await market.symbol;
          data.underlyingSymbol = await market.underlyingAssetSymbol();
          data.marketAddress = market.marketAddress;
          data.img = await this.db
            .collection('markets-symbols')
            .doc(data.symbol)
            .get()
            .then((response) => response.data().imageURL);

          this.getMarkets.push(data);
        } catch (error) {
          //
          console.error(error);
        }
      });
    },
    async updateMarketInfo() {
      this.info.underlyingSymbol = await this.market.underlyingAssetSymbol();
      this.info.rate = await this.market.supplyRateAPY();
      this.info.rate = this.info.rate.toFixed(3);
      // this.getSymbolImg();
      if (this.chainId) {
        this.info.underlyingPrice = await this.market.underlyingCurrentPrice(this.chainId);
      }
      if (this.walletAddress) {
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        this.info.supplyBalance = await this.market
          .currentBalanceOfCTokenInUnderlying(this.walletAddress);
        this.info.borrowBalance = await this.market
          .borrowBalanceCurrent(this.walletAddress);
        this.info.interestBalance = await this.market.getEarnings(this.walletAddress);
      }
    },
    async refresh() {
      if (this.account) {
        this.data.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        this.data.price = await this.market.underlyingCurrentPrice(this.chainId);
      }
      this.data.supplyBalance = await this.market
        .currentBalanceOfCTokenInUnderlying(this.walletAddress);
    },
    isCRbtc() {
      return Market.isCRbtc(this.marketAddress);
    },
    async updateSelect() {
      this.select.symbol = await this.market.symbol;
      this.select.underlyingSymbol = await this.market.underlyingAssetSymbol();
      this.select.img = await this.db
        .collection('markets-symbols')
        .doc(this.select.symbol)
        .get()
        .then((response) => response.data().imageURL);
    },
    updateRoute(market) {
      if (this.$route.params.id !== market.marketAddress) {
        const to = { name: this.$route.name, params: { id: market.marketAddress } };
        this.$router.push(to);
      }
    },
    async getMarket() {
      this.marketAddress = this.$route.params.id;
      this.isCRbtc()
        .then((isCRbtc) => {
          this.market = isCRbtc ? new CRbtc(this.marketAddress, this.chainId)
            : new CToken(this.marketAddress, this.chainId);
          this.updateMarketInfo();
          this.updateSelect();
          this.refresh();
          this.reset();
        })
        .catch(console.error);
    },
    outsideConnectWallet() {
      this.showModalConnectWallet = false;
    },
    setAmount() {
      this.amount = (this.sliderAmountPercentage * this.tokenBalance) / 100;
      this.amount = this.amount.toFixed(10);
    },
    reset() {
      this.sliderAmountPercentage = 0;
      this.amount = null;
    },
    closeDialog() {
      this.isLoading = false;
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getMarket();
    this.getMarketsInfo();
  },
};
</script>
