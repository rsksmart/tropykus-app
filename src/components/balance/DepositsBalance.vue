<template>
  <div class="balance-deposit balance-style">
    <div class="d-flex">
      <div class="tooltip-info">
        <v-tooltip bottom
          content-class="secondary-color box-shadow-tooltip" max-width="180">
          <template v-slot:activator="{ on, attrs }">
            <v-img v-bind="attrs" v-on="on" src="@/assets/icons/info2.svg" contain/>
          </template>
          <span class="p5-feedback text-info">
            {{$t('balance.tooltip1')}}
          </span>
        </v-tooltip>
      </div>
      <img src="@/assets/icons/pig2.svg" alt="Deposit">
      <div class="ml-5">
        <div class="p1-descriptions mb-2">
          {{$t('balance.deposit.description1')}}
        </div>
        <div class="p2-reading-values mb-1">
          {{totalDepositsByIntereses}} USD
        </div>
        <div class="p3-USD-values">
          {{!totalRbtc ? 0 : totalRbtc}} RBTC<br />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { addresses } from '@/middleware/contracts/constants';
import {
  CRbtc,
} from '@/middleware';

export default {
  name: 'DepositsBalance',
  props: {
    infoDeposits: {
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
    totalRbtc() {
      return (Number(this.totalDepositsByIntereses) / this.priceRbtc).toFixed(6);
    },
    totalDeposits() {
      return Object.entries(this.infoDeposits).length > 0
        ? this.infoDeposits.totalDeposits.toFixed(2) : 0;
    },
    totalDepositsByIntereses() {
      return Object.entries(this.infoDeposits).length > 0
        ? this.infoDeposits.totalDepositsByIntereses.toFixed(2) : 0;
    },
    totalIntereses() {
      return Object.entries(this.infoDeposits).length > 0
        ? (this.infoDeposits.totalDepositsByIntereses - this.infoDeposits.totalDeposits).toFixed(2)
        : 0;
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
