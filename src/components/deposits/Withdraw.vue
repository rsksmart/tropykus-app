<template>
  <div>
    <div class="d-flex justify-space-between mb-12 mt-9">
      <div>
        <div class="p1-descriptions mb-3">Selecciona la cripto a retirar</div>
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
      </div>
      <div>
        <div class="p1-descriptions mb-3 text-info">
          Escribe la cantidad que vas a retirar
        </div>
        <div class="input-box primary-bg">
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
            <!-- <v-btn @click="setMaxAmount" height="40" text>
              <span class="text-primary">MÁX</span>
            </v-btn> -->
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-space-between mb-12">
      <div>
        <div class="p1-descriptions text-info mb-1">
          Tienes depositado
        </div>
        <div class="p2-reading-values text-uppercase text-info">
          {{tokenBalance | formatDecimals(select.underlyingSymbol) }}
          {{select.underlyingSymbol}}
        </div>
        <div class="p3-USD-values text-info">
          {{tokenBalanceUsd | formatPrice}}
        </div>
      </div>

      <div>
        <v-slider
          class="mt-3 slider-box"
          min="0"
          max="100"
          color="#4CB163"
          track-color=" #4CB163"
          tick-size="10"
          thumb-label
        />
        <div class="ma-0">
          <v-col class="pa-0 d-flex justify-space-between">
            <span class="p1-descriptions">0%</span>
            <span class="p1-descriptions">100%</span>
          </v-col>
        </div>
      </div>
    </div>
    <div class="d-flex justify-end">
      <v-btn text class="btn-action"
        :class="(amount > 0) ? 'primary-color' : 'secondary-bg'"
          @click="menuAction"
      >
        <span class="white--text">

          {{
            account ? $t('deposit.btn2') : $t('deposit.btn1')
          }}
        </span>
      </v-btn>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import * as constants from '@/store/constants';

export default {
  props: {
    infoMarket: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      constants,
      amount: null,
      select: {},
      getMarkets: [],
      info: {},
      market: {},
      rules: {
        leverage: () => (this.account ? this.info.borrowBalance <= 0 : true) || this.$t('dialog.supply-redeem.rule1'),
        minBalance: () => (this.account ? Number(this.amount) <= Number(this
          .info.underlyingBalance) : true) || this.$t('dialog.supply-redeem.rule2'),
      },
    };
  },
  computed: {
    ...mapState({
      account: (state) => state.Session.account,
      selectStore: (state) => state.Market.select,
      marketsStore: (state) => state.Market.getMarkets,
      marketStore: (state) => state.Market.market,
    }),
    tokenBalance() {
      return this.info.supplyBalance;
    },
    tokenBalanceUsd() {
      return this.info.supplyBalance * this.info.price;
    },
  },
  watch: {
    infoMarket() {
      this.info = this.infoMarket;
    },
    selectStore() {
      this.select = this.selectStore;
    },
    marketStore() {
      this.market = this.marketStore;
    },
    $route() {
      this.getMarket();
    },
  },
  methods: {
    menuAction() {
      this.showWaiting();
      this.market.redeem(this.account, this.amount)
        .then(() => {
          this.market.wsInstance.on('Redeem', (from) => {
            if (from === this.walletAddress) {
              this.getMarket();
            }
          });
        })
        .catch(console.log('error'));
    },
    getMarket() {
      const data = {
        marketAddress: this.$route.params.id,
        walletAddress: this.walletAddress,
        account: this.account,
      };
      this.getMarkets = this.marketsStore;
      this.$store.dispatch({
        type: constants.MARKET_GET_MARKET,
        ...data,
      });
    },
    updateRoute(data) {
      this.$emit('update-select', data);
    },
  },
  created() {
    this.getMarket();
  },
};
</script>
