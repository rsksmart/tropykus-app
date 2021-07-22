<template>
    <div class="deposit">
      <h2 class="h2-heading text-detail">{{ $t('deposit.title')}}</h2>
      <div class="d-flex">
        <div text @click="tabMenu = true" class="mr-10">
          <span class="h3-sections-heading pb-1 tab"
          :class="tabMenu ? 'text-detail text-active' : 'text-inactive'"
          >Deposit</span>
        </div>
        <div v-if="info.supplyBalance" text @click="tabMenu = false">
          <span class="h3-sections-heading pb-1 tab"
          :class="tabMenu ? 'text-inactive' : 'text-detail text-active'"
          >{{ $t('dialog.supply-redeem.title2') }}</span>
        </div>
      </div>

      <div class="d-flex justify-space-between mb-12 mt-9">
        <div>
          <div class="p1-descriptions mb-3">
            {{ tabMenu ? $t('deposit.description1') : $t('withdraw.description1') }}
          </div>
          <div class="primary-bg select-box">
            <v-menu>
              <template v-slot:activator="{ on, attrs }">
                <div class="selected-item d-flex align-center"
                  v-bind="attrs" v-on="on">
                  <img v-if="select.img" class="ml-6 mr-3" :src="select.img" />
                  <span v-if="select.underlyingSymbol"
                    class="h3-sections-heading text-uppercase">
                    {{ select.underlyingSymbol }}
                  </span>
                  <v-icon class="select-icon" large color="text-primary">
                    mdi-chevron-down
                  </v-icon>
                </div>
              </template>
              <v-list>
                <v-list-item
                  v-for="(market, index) in getMarkets" :key="index" class="select-menu-item"
                  :class="market.underlyingSymbol === select.underlyingSymbol ? 'active' : ''"
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
        </div>
        <div>
          <div class="p1-descriptions mb-3 text-info">
            {{ tabMenu ? $t('deposit.description2') : $t('withdraw.description2') }}
          </div>
          <div class="input-box primary-bg"
            :class="!activeButton && amount > 0 ? 'alert' : ''"
          >
            <div class="d-flex">
              <v-text-field
                type="number"
                v-model="amount"
                :rules="[rules.leverage, rules.minBalance]"
                class="h1-title text-info pa-0 ma-0"
                background-color="#CFE7DA"
                color="#47B25F"
                :placeholder="'0 ' + (select.underlyingSymbol ? select.underlyingSymbol : '')"
                filled
                rounded
                dense
              ></v-text-field>
              <v-btn @click="setMaxAmount" height="40" text>
                <span class="text-primary">MÁX</span>
              </v-btn>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex justify-space-between mb-12">
        <div>
          <div class="p1-descriptions text-info mb-1">
            {{ tabMenu ? $t('deposit.description3') : $t('withdraw.description3') }}
            </div>
          <div class="p2-reading-values text-uppercase text-info">
            {{ !tokenBalance ? 0 : tokenBalance | formatDecimals(select.underlyingSymbol) }}
            {{select.underlyingSymbol}}
          </div>
          <div class="p3-USD-values text-info">
            {{ !tokenBalanceUsd ? 0 : tokenBalanceUsd | formatPrice}}
          </div>
        </div>

        <div>
          <v-slider
            class="mt-3 slider-box"
            min="0"
            max="100"
            color="#4CB163"
            track-color="#C8DEDD"
            tick-size="10"
            thumb-label
            v-model="sliderAmountPercentage" @click="setAmount"
          />
          <div class="ma-0">
            <v-col class="pa-0 d-flex justify-space-between">
              <span class="p1-descriptions">0%</span>
              <span class="p1-descriptions">100%</span>
            </v-col>
          </div>
        </div>
      </div>

      <div class="d-flex" :class="tabMenu ? 'justify-space-between' : 'justify-end'"  >
        <div v-if="tabMenu">
          <div class="p1-descriptions text-info mb-1 d-flex">
            <div class="text-rate">
              {{ $t('deposit.description4')}}
            </div>
            <div class="tooltip-info ml-7 mt-1">
              <v-tooltip right content-class="secondary-color box-shadow-tooltip" max-width="180">
                <template v-slot:activator="{ on, attrs }">
                  <v-img v-bind="attrs" v-on="on" width="12" height="12"
                        src="@/assets/icons/info.svg" contain/>
                </template>
                <span class="p5-feedback text-info">
                  {{ $t('deposit.tooltip1') }}
                </span>
              </v-tooltip>
            </div>
          </div>
          <div class="p2-reading-values text-info">
            {{ info.rate }} %
          </div>
        </div>

        <div class="d-flex se-end">
          <v-btn text class="btn-action"
            :disabled="!activeButton"
            :class="activeButton ? 'primary-color' : 'secondary-bg'"
            @click="menuAction"
          >
            <span class="white--text">
              {{ tabMenu
                  ? account ? $t('deposit.btn2') : $t('deposit.btn1')
                  : account ? $t('withdraw.btn2') : $t('withdraw.btn1')
              }}
            </span>
          </v-btn>
        </div>
      </div>
      <template v-if="tabMenu">

        <v-divider class="divider"></v-divider>

        <v-row class="mb-5">
          <v-col md="4">
            <h3 class="h3-sections-heading text-detail">
              {{ $t('deposit.calculator.title')}}
            </h3>
          </v-col>
        </v-row>

        <div class="d-flex justify-space-between mb-10">
          <div>
            <div class="p1-descriptions text-info mb-1 d-flex justify-space-between">
              {{ $t('deposit.calculator.description1')}}
              <div class="tooltip-info ">
                <v-tooltip right content-class="secondary-color box-shadow-tooltip" max-width="200">
                  <template v-slot:activator="{ on, attrs }">
                    <v-img v-bind="attrs" v-on="on" width="12" height="12"
                          src="@/assets/icons/info.svg" contain/>
                  </template>
                  <span class="p5-feedback text-info">
                    {{ $t('deposit.tooltip2') }}
                  </span>
                </v-tooltip>
              </div>
            </div>
            <div class="p2-reading-values box-number text-uppercase text-info">
                {{ !possibleEarnings ? 0 : possibleEarnings | formatDecimals }}
                {{ info.underlyingSymbol }}
            </div>
            <div class="p3-USD-values box-number text-info">
              {{ !possibleEarningsUSD ? 0 : possibleEarningsUSD | formatPrice }} USD
            </div>
          </div>

          <div>
            <div class="p1-descriptions mb-3 text-info">
              {{ $t('deposit.calculator.description2')}}
            </div>
            <div class="input-box primary-bg">
              <div class="d-flex">
                <v-text-field
                  type="number"
                  v-model="amountEarning"
                  class="h1-title text-info pa-0 ma-0"
                  background-color="#CFE7DA"
                  color="#47B25F"
                  :placeholder="'0 ' + (select.underlyingSymbol ? select.underlyingSymbol : '')"
                  filled
                  rounded
                  dense
                ></v-text-field>
              </div>
            </div>
          </div>
        </div>

        <div class="d-flex justify-space-between mb-10">
          <div>
            <div class="p1-descriptions text-info mb-1">
              {{ $t('deposit.calculator.description3')}}
            </div>
            <div class="p2-reading-values box-number text-info">
              {{ !possibleEarningsPlusDeposit ? 0 : possibleEarningsPlusDeposit | formatDecimals }}
              {{ info.underlyingSymbol }}
            </div>
            <div class="p3-USD-values box-number text-info">
              {{ possibleEarningsPlusDepositUSD
                ? 0
                : possibleEarningsPlusDepositUSD | formatPrice
              }} USD
            </div>
          </div>

          <div>
            <div class="p1-descriptions text-info">
              {{ $t('deposit.calculator.description4')}}
            </div>
            <v-slider
              class="mt-3 slider-box"
              min="1"
              max="5"
              color="#4CB163"
              track-color="#C8DEDD"
              tick-size="10"
              thumb-label
              v-model="sliderYear"
            />
            <div>
              <v-col class="pa-0 d-flex justify-space-between">
                <span class="p1-descriptions">
                  1 {{ $t('deposit.calculator.time1')}}
                </span>
                <span class="p1-descriptions">
                  5 {{ $t('deposit.calculator.time2')}}
                </span>
              </v-col>
            </div>
          </div>
        </div>
      </template>

      <template v-if="showModalConnectWallet">
        <connect-wallet
          :showModal="showModalConnectWallet"
          @closed="outsideConnectWallet"
        />
      </template>

      <template v-if="isLoading">
        <loading :showModal="isLoading" :data="infoLoading" @closed="closeDialog" />
      </template>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import ConnectWallet from '@/components/dialog/ConnectWallet.vue';
import Loading from '@/components/modals/Loading.vue';
import * as constants from '@/store/constants';
import {
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
      tabMenu: true,
      comptroller: null,
      constants,
      getMarkets: [],
      market: null,
      isLoading: false,
      infoLoading: {
        type: 'deposit',
        amount: '',
        symbol: '',
        wallet: true,
        loading: true,
        deposit: true,
        success: null,
      },
      select: {},
      showModalConnectWallet: false,
      sliderAmountPercentage: 0,
      sliderYear: 0,
      amount: null,
      amountEarning: null,
      info: {},
      rules: {
        leverage: () => ((this.tabMenu && this.account && this.amount)
          ? this.info.borrowBalance <= 0 : true) || this.$t('dialog.supply-redeem.rule1'),
        minBalance: () => ((this.tabMenu && this.account && this.amount)
          ? Number(this.amount) <= Number(this.info.underlyingBalance) : true)
          || this.$t('dialog.supply-redeem.rule2'),
        supplyBalance: () => ((!this.tabMenu && this.account && this.amount)
          ? Number(this.amount) <= Number(this.info.supplyBalance) : true)
          || this.$t('dialog.supply-redeem.rule3'),
      },
    };
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
      markets: (state) => state.Session.markets,
      walletAddress: (state) => state.Session.walletAddress,
      account: (state) => state.Session.account,
      marketsStore: (state) => state.Market.getMarkets,
      infoStore: (state) => state.Market.info,
      selectStore: (state) => state.Market.select,
      marketStore: (state) => state.Market.market,
    }),
    activeButtonn() {
      return this.tabMenu
        ? (this.amount <= this.info.underlyingBalance && this.amount > 0)
        : (this.amount <= this.info.supplyBalance && this.amount > 0);
    },
    tokenBalanceUsd() {
      return this.tabMenu
        ? this.info.underlyingBalance * this.info.price
        : this.info.supplyBalance * this.info.price;
    },
    tokenBalance() {
      return this.tabMenu ? this.info.underlyingBalance : this.info.supplyBalance;
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
    activeButton() {
      return this.amount > 0 && typeof this
        .rules.minBalance() !== 'string' && typeof this
        .rules.leverage() !== 'string' && typeof this
        .rules.supplyBalance() !== 'string';
    },
  },
  watch: {
    tabMenu() {
      this.reset();
    },
    markets() {
      if (this.markets.length > 3) this.getMarketsStore(this.markets);
    },
    marketsStore() {
      this.getMarkets = this.marketsStore;
    },
    infoStore() {
      this.info = this.infoStore;
      if (this.info.supplyBalance === 0) this.tabMenu = true;
    },
    selectStore() {
      this.select = this.selectStore;
    },
    $route() {
      this.getMarket();
    },
    marketStore() {
      this.market = this.marketStore;
    },
    account() {
      this.updateMarket();
    },
    amount() {
      this.amountEarning = this.amount;
    },
  },
  methods: {
    ...mapActions({
      getMarketsStore: constants.MARKET_GET_MARKETSINFO,
    }),
    async menuAction() {
      if (!this.account) {
        this.showModalConnectWallet = true;
        return;
      }
      this.isLoading = true;
      this.infoLoading.loading = true;
      this.infoLoading.wallet = true;
      if (this.tabMenu) {
        // colocar los mercados en assetsIn
        const assetsIn = await this.comptroller.getAssetsIn(this.walletAddress);
        const allMarkets = await this.comptroller.allMarkets;
        if (assetsIn.indexOf(this.marketAddress) === -1) {
          await this.comptroller.enterMarkets(this.account, allMarkets);
        }
        await this.market.supply(this.account, this.amount)
          .then(() => {
            this.infoLoading.wallet = false;
            this.market.wsInstance.on('Mint', async (from, actualMintAmount) => {
              if (from === this.walletAddress) {
                if (!this.isLoading) {
                  this.isLoading = true;
                }
                this.infoLoading.loading = false;
                this.infoLoading.deposit = true;
                this.infoLoading.amount = actualMintAmount / 1e18;
                this.infoLoading.symbol = this.select.symbol;
                setTimeout(() => {
                  this.getMarket();
                }, 1000);
              }
            });
          })
          .catch(console.error);
      } else {
        this.market.redeem(this.account, this.amount)
          .then(() => {
            this.infoLoading.wallet = false;
            this.market.wsInstance.on('Redeem', async (from, actualMintAmount) => {
              if (from === this.walletAddress) {
                if (!this.isLoading) {
                  this.isLoading = true;
                }
                this.infoLoading.loading = false;
                this.infoLoading.deposit = false;
                this.infoLoading.amount = actualMintAmount / 1e18;
                this.infoLoading.symbol = this.select.symbol;
                setTimeout(() => {
                  this.getMarket();
                }, 1000);
              }
            });
          })
          .catch(console.error);
      }

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
    updateRoute(market) {
      if (this.$route.params.id !== market.marketAddress) {
        const to = { name: this.$route.name, params: { id: market.marketAddress } };
        this.$router.push(to);
      }
    },
    updateMarket() {
      this.$store.dispatch({
        type: constants.MARKET_UPDATE_MARKET,
        marketAddress: this.$route.params.id,
        walletAddress: this.walletAddress,
        account: this.account,
      });
    },
    getMarket() {
      const data = {
        marketAddress: this.$route.params.id,
        walletAddress: this.walletAddress,
        account: this.account,
      };

      this.$store.dispatch({
        type: constants.MARKET_GET_MARKET,
        ...data,
      });
      this.reset();
    },
    outsideConnectWallet() {
      this.showModalConnectWallet = false;
    },
    setAmount() {
      this.amount = (this.sliderAmountPercentage * this.tokenBalance) / 100;
      if (this.account) {
        this.amount = this.amount.toFixed(10);
      }
    },
    setMaxAmount() {
      if (this.account) {
        this.amount = this.tabMenu ? this.info.underlyingBalance : this.info.supplyBalance;
        this.setPercentageSlider();
      }
    },
    setPercentageSlider() {
      this.sliderAmountPercentage = (this.amount * 100) / this.tokenBalance;
    },
    reset() {
      this.sliderAmountPercentage = 0;
      this.amount = null;
    },
    closeDialog() {
      if (this.infoLoading.loading === false) {
        this.getMarket();
      }
      this.isLoading = false;
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getMarket();
    this.getMarketsStore(this.markets);
  },
};
</script>
