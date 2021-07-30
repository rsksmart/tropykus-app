<template>
  <div class="balance-history">
    <div class="d-flex mb-10">
      <div @click="tabMenu = 'activity'" class="mr-10">
        <span class="b1-main pb-1 tab"
        :class="tabMenu === 'activity' ? 'text-detail text-active' : 'text-inactive'"
        >Mi actividad</span>
      </div>
      <div @click="tabMenu = 'deposit'" class="mr-10">
        <span class="b1-main pb-1 tab"
        :class="tabMenu === 'deposit' ? 'text-detail text-active' : 'text-inactive'"
        >Mis depósitos</span>
      </div>
      <div @click="tabMenu = 'debts'">
        <span class="b1-main pb-1 tab"
        :class="tabMenu === 'debts' ? 'text-detail text-active' : 'text-inactive'"
        >Mis deudas</span>
      </div>
    </div>

    <div class="results">
      <template v-for="(market, i) in getMarkets" >

      <!-- Depositos -->
      <div class="d-flex justify-space-between activity mt-8" :key="i"
        v-if="market.supplyBalance > 0 && tabMenu === 'deposit'"
      >
        <div class="d-flex">
          <img :src="market.img">
          <div class="h2-heading">
            <span class="text-uppercase">{{market.symbol}}</span>
          </div>
        </div>
        <div class="p7-graphics">
          Total depositado <br />
          <div class="p6-reading-values">
            {{market.supplyBalance | formatDecimals(market.symbol)}}
            <span class="text-uppercase">{{market.symbol}}</span>
          </div>
          <div class="p3-USD-value">
            {{market.blanceUsd | formatPrice}}
          </div>
        </div>
        <div class="p7-graphics">
          Ganancias acumuladas <br />
          <div class="p6-reading-values">
            {{market.interestBalance | formatDecimals(market.symbol)}}
            <span class="text-uppercase">{{market.symbol}}</span>
          </div>
          <div class="p3-USD-value">
            {{market.interesUsd | formatPrice}}
          </div>
        </div>
        <div class="p7-graphics">
          Tasa de ganancia anual <br /> dinámica actual
          <br />
          <div class="p6-reading-values">
            {{market.rate}}%
          </div>
        </div>
        <div class="mt-2 actions">
          <v-btn text class="btn1 mr-1">
            <span class="text-primary">Depositar</span>
          </v-btn>
          <v-btn text class="btn2">
            <span class="text-primary">Retirar</span>
          </v-btn>
        </div>
      </div>

      <!-- Deudas -->
      <div class="d-flex justify-space-between activity mt-8" :key="i"
      v-if="market.borrowBalance > 0 && tabMenu === 'debts'"
      >
        <div class="d-flex">
          <img :src="market.img">
          <div class="h2-heading">
            <span class="text-uppercase">{{market.symbol}}</span>
          </div>
        </div>
        <div class="p7-graphics">
          Pediste Prestado <br />
          <div class="p6-reading-values">
            {{market.borrowBalance - market.interestBorrow | formatDecimals}}
            <span class="text-uppercase">{{market.symbol}}</span>
          </div>
          <div class="p3-USD-value">
            {{market.borrowUsd | formatPrice}}
          </div>
        </div>
        <div class="p7-graphics">
          Intereses acumulados <br />
          <div class="p6-reading-values">
            {{market.interestBorrow | formatDecimals(market.symbol)}}
            <span class="text-uppercase">{{market.symbol}}</span>
          </div>
          <div class="p3-USD-value">
            {{market.interestBorrowUsd | formatPrice}}
          </div>
        </div>
        <div class="p7-graphics">
          Tasa de interés anual <br /> dinámica actual
          <br />
          <div class="p6-reading-values">
            {{market.rate}}%
          </div>
        </div>
        <div v-if="tabMenu === 'deposit'" class="mt-2 actions">
          <v-btn text class="btn1 mr-1">
            <span class="text-primary">Depositar</span>
          </v-btn>
          <v-btn text class="btn2">
            <span class="text-primary">Retirar</span>
          </v-btn>
        </div>
        <div v-if="tabMenu === 'debts'" class="mt-2 actions">
          <v-btn text class="btn1 mr-1">
            <span class="text-primary">Pagar</span>
          </v-btn>
          <v-btn text class="btn2">
            <span class="text-primary">Pedir Prestado</span>
          </v-btn>
        </div>
      </div>
      </template>

    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import * as constants from '@/store/constants';

export default {
  data() {
    return {
      constants,
      db: this.$firebase.firestore(),
      tabMenu: 'activity',
      getMarkets: [],
    };
  },
  computed: {
    ...mapState({
      markets: (state) => state.Session.markets,
      chainId: (state) => state.Session.chainId,
      walletAddress: (state) => state.Session.walletAddress,
      account: (state) => state.Session.account,
    }),
  },
  watch: {
    account() {
      this.getMarketsInfo();
    },
  },
  methods: {
    async getMarketsInfo() {
      if (!this.walletAddress) return;
      const data = [];
      await this.markets.map(async (market) => {
        try {
          const info = {};
          // General
          info.rate = await market.supplyRateAPY();
          info.rate = info.rate.toFixed(2);
          info.symbol = await market.underlyingAssetSymbol();
          info.price = await market.underlyingCurrentPrice(this.chainId);
          info.img = await this.db
            .collection('markets-symbols')
            .doc(info.symbol)
            .get()
            .then((response) => response.data().imageURL);

          // Supply
          info.supplyBalance = await market.currentBalanceOfCTokenInUnderlying(this.walletAddress);
          info.interestBalance = await market.getEarnings(this.walletAddress);
          info.blanceUsd = info.supplyBalance * info.price;
          info.interesUsd = info.interestBalance * info.price;

          // Borrow
          info.borrowBalance = await market.borrowBalanceCurrent(this.walletAddress);
          info.interestBorrow = await market.getDebtInterest(this.walletAddress);
          info.borrowUsd = (info.borrowBalance - info.interestBalance) * info.price;
          info.interestBorrowUsd = info.interestBorrow * info.price;

          data.push(info);
          this.getMarkets = data;
        } catch (error) {
          console.error(error);
        }
      });
    },
  },
  created() {
    this.getMarketsInfo();
  },
};
</script>
