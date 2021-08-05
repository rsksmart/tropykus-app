<template>
  <div class="balance-deposit balance-style">
    <div class="d-flex">
      <img src="@/assets/icons/pig2.svg" alt="Deposit">
      <div class="tooltip-info">
        <v-tooltip bottom
          content-class="secondary-color box-shadow-tooltip" max-width="180">
          <template v-slot:activator="{ on, attrs }">
            <v-img v-bind="attrs" v-on="on"
                  src="@/assets/icons/info2.svg" contain/>
          </template>
          <span class="p5-feedback text-info">
            {{$t('balance.tooltip1')}}
          </span>
        </v-tooltip>
      </div>
      <div class="ml-5 p2-reading-values">
        {{totalDepositsByIntereses}} USD <br />
        <span class="p1-descriptions">{{$t('balance.deposit.description1')}}</span>
      </div>
    </div>
    <v-divider class="mt-4 mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <div class="p6-reading-values">
        {{totalDeposits}} USD<br />
        <span class="p1-descriptions">
          {{$t('balance.deposit.description2')}}
        </span>
      </div>
      <div class="p6-reading-values">
        {{totalIntereses}} USD <br />
        <span class="p1-descriptions">
          {{$t('balance.deposit.description3')}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
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
    };
  },
  computed: {
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
};
</script>
