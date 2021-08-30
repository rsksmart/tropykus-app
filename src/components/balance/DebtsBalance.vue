<template>
  <div class="balance-borrow balance-style">
    <div class="d-flex">
      <div class="tooltip-info">
        <v-tooltip bottom
          content-class="secondary-color box-shadow-tooltip" max-width="180">
          <template v-slot:activator="{ on, attrs }">
            <v-img v-bind="attrs" v-on="on"
                  src="@/assets/icons/info2.svg" contain/>
          </template>
          <span class="p5-feedback text-info">
            {{$t('balance.tooltip2')}}
          </span>
        </v-tooltip>
      </div>
      <img src="@/assets/icons/pay2.svg" alt="Deposit">
      <div class="ml-5">
        <div class="p1-descriptions mb-2">{{$t('balance.debts.description1')}}</div>
        <div class="p2-reading-values mb-1">
          {{totalBorrowsByIntereses}} USD
        </div>
        <div class="p3-USD-values">
          {{!totalRbtc ? 0 : totalRbtc}} RBTC
        </div>
      </div>
    </div>
    <!-- <v-divider class="mt-4 mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <div class="p6-reading-values">
        {{totalBorrows}} USD <br />
        <span class="p1-descriptions">
          {{$t('balance.debts.description2')}}
        </span>
      </div>
      <div class="p6-reading-values">
        {{totalIntereses}} USD <br />
        <span class="p1-descriptions">
          {{$t('balance.debts.description3')}}
        </span>
      </div>
    </div> -->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { addresses } from '@/middleware/contracts/constants';
import {
  CRbtc,
} from '@/middleware';

export default {
  name: 'DebtsBalance',
  props: {
    infoBorrows: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      priceRbtc: 0,
    };
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
    }),
    totalBorrows() {
      return Object.entries(this.infoBorrows).length > 0
        ? this.infoBorrows.totalBorrows.toFixed(2) : 0;
    },
    totalBorrowsByIntereses() {
      return Object.entries(this.infoBorrows).length > 0
        ? this.infoBorrows.totalBorrowsByIntereses.toFixed(2) : 0;
    },
    totalIntereses() {
      return Object.entries(this.infoBorrows).length > 0
        ? (this.infoBorrows.totalBorrowsByIntereses - this.infoBorrows.totalBorrows).toFixed(2)
        : 0;
    },
    totalRbtc() {
      return (Number(this.totalBorrowsByIntereses) / this.priceRbtc).toFixed(6);
    },
  },
  methods: {
    async getPrice() {
      this.rbtc = addresses[this.chainId].kRBTC;

      const market = new CRbtc(this.rbtc, this.chainId);
      this.priceRbtc = await market.underlyingCurrentPrice(this.chainId);
    },
  },
  created() {
    this.getPrice();
  },
};
</script>
