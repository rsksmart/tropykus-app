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
          <modal-save :showModal="showModalSave" :info="info" @closed="onClickOutside" />
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
import { mapState } from 'vuex';
import { Market } from '@/middleware';

// import ModalBorrow from '@/components/ModalBorrow.vue';
import ModalSave from '@/components/market/ModalSave.vue';

export default {
  name: 'Card',
  components: {
    ModalSave,
    //   ModalBorrow,
  },
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
      info: {
        name: null,
        symbol: null,
        rate: null,
        savings: null,
        price: null,
        underlyingPrice: null,
        available: null,
        underlying: null,
      },
    };
  },
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.account,
      chainId: (state) => state.Session.chainId,
    }),
  },
  methods: {
    onClickOutside() {
      this.showModalSave = false;
      this.showModalBorrow = false;
    },
  },
  async created() {
    const cToken = new Market(this.marketAddress);
    this.info.name = await cToken.name;
    this.info.symbol = await cToken.symbol;
    this.info.underlyingSymbol = await cToken.underlyingAssetSymbol;
    this.info.rate = await cToken.supplyRateAPY();
    this.info.underlying = await cToken.underlying();
    this.info.underlyingPrice = await cToken.underlyingCurrentPrice(this.chainId);
    if (this.walletAddress) {
      this.info.savings = await cToken.balanceOfUnderlying(this.walletAddress);
      this.info.available = await cToken.balanceOfUnderlyingInWallet(this.walletAddress);
    }
  },
};
</script>
