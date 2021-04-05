<template>
  <v-card width="100%" class="card container" color="rgba(1, 62, 47, 1)">
    <v-row class="ma-2">
      <v-col cols="7" class="pa-0">
        <v-row class="mx-0">
          <v-col class="pa-0 d-flex justify-start">
            <v-img position="left center" height="40" :src="marketImg" contain />
          </v-col>
          <v-col class="pa-0">
            <h1>{{ symbol }}</h1>
          </v-col>
          <v-col class="pa-0 d-flex justify-center align-center">
            <a :href="marketURL" target="_blank">
              <v-img height="16" src="@/assets/icon-link.svg" contain />
            </a>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="5" class="pa-0">
        <v-row class="mx-0 d-flex justify-end">
          <h2 class="text-right">{{ rate }}%</h2>
        </v-row>
        <v-row class="mx-0 d-flex justify-end">
          <p class="text-right">{{ rateLabel }}</p>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mx-0">
      <v-divider color="#BEBEBE"/>
    </v-row>
    <v-row class="mx-0">
      <v-col cols="7">
        <v-row class="mx-0">
          <p>{{ detailsLabel }}</p>
        </v-row>
        <v-row class="mx-0">
          <p class="boldie">1 {{ marketIncome }} =</p>
          <p class="italique"> $ {{ marketIncomeUSD }}</p>
        </v-row>
      </v-col>
    </v-row>
    <v-row class="mx-0">
      <template v-if="hiddenButton">
        <v-btn
            @click="showModalSave = true"
            class="mt-5 mb-6"
            depressed
            color="#51C1AF"
            width="35%"
        >
          Ahorrar
        </v-btn>
        <template v-if="showModalSave">
          <!-- <modal-save :showModal="showModalSave" :data="data" @closed="onClickOutside" /> -->
        </template>
      </template>
      <template v-else>
        <v-btn
            @click="showModalBorrow = true"
            class="mt-5 mb-6"
            depressed
            color="#FF9153"
            width="38%"
        >
          Pedir prestado
        </v-btn>
        <template v-if="showModalBorrow">
        <!-- <modal-borrow :showModal="showModalBorrow" :data="data" @closed="onClickOutside" /> -->
        </template>
      </template>
    </v-row>
  </v-card>
</template>

<script>
import { CToken } from '@/middleware';
import * as constants from '@/store/constants';
import rUSDT from '@/assets/symbols/rUSDT.svg';
import RIF from '@/assets/symbols/RIF.svg';
import DOC from '@/assets/symbols/DOC.svg';
import RBTC from '@/assets/symbols/RBTC.svg';

// import ModalBorrow from '@/components/ModalBorrow.vue';
// import ModalSave from '@/components/ModalSave.vue';

export default {
  name: 'Card',
  // components: {
  //   ModalSave,
  //   ModalBorrow,
  // },
  props: {
    hiddenButton: {
      require: true,
      type: Boolean,
    },
    showInfoMyWallet: {
      require: true,
      type: Boolean,
    },
    marketAddress: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      showModalSave: false,
      showModalBorrow: false,
      name: null,
      symbol: null,
      rate: 6.54,
      savings: 4.5,
      price: 4.23,
    };
  },
  computed: {
    marketUnderlyingPrice() {
      return (50000).toFixed(2);
    },
    marketCTokenPrice() {
      const exhangeRate = 50;
      return (exhangeRate * this.marketUnderlyingPrice).toFixed(2);
    },
    marketIncomeUSD() {
      return this.showInfoMyWallet ? this.marketUnderlyingPrice : this.marketCTokenPrice;
    },
    marketUnderlying() {
      if (this.symbol === constants.cDOC) return constants.DOC;
      if (this.symbol === constants.cRIF) return constants.RIF;
      if (this.symbol === constants.crUSDT) return constants.rUSDT;
      return constants.RBTC;
    },
    marketCToken() {
      if (this.symbol === constants.cDOC) return constants.cDOC;
      if (this.symbol === constants.cRIF) return constants.cRIF;
      if (this.symbol === constants.crUSDT) return constants.crUSDT;
      return constants.RBTC;
    },
    marketIncome() {
      return this.showInfoMyWallet ? this.marketUnderlying : this.marketCToken;
    },
    marketURL() {
      if (this.symbol === constants.cDOC) return 'https://moneyonchain.com/doc-bitcoin-stablecoin/';
      if (this.symbol === constants.cRIF) return 'https://developers.rsk.co/rif/token/';
      if (this.symbol === constants.crUSDT) return 'https://tether.to/';
      return 'https://developers.rsk.co/rsk/rbtc/';
    },
    marketImg() {
      if (this.symbol === constants.cDOC) return DOC;
      if (this.symbol === constants.cRIF) return RIF;
      if (this.symbol === constants.crUSDT) return rUSDT;
      return RBTC;
    },
    rateLabel() {
      return this.hiddenButton ? 'Rendimiento anual' : 'Interés anual';
    },
    detailsLabel() {
      return this.showInfoMyWallet ? 'Precio actual' : 'Tienes en tu billetera';
    },
  },
  methods: {
    onClickOutside() {
      this.showModalSave = false;
      this.showModalBorrow = false;
    },
  },
  async created() {
    const cToken = new CToken(this.marketAddress);
    this.name = await cToken.name;
    this.symbol = await cToken.symbol;
  },
};
</script>
