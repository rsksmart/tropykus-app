<template>
  <v-dialog v-model="dialog" width="350">
    <v-card class="user-action" v-click-outside="onClickOutside">
      <v-row class="button ma-0 pt-3 d-flex justify-center justify-space-around">
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
      <v-row class="d-flex justify-center ma-0 ">
        <div class="modal-container mt-6 ml-6">
          <v-img :src="actionIcon" class="my-3" width="64"
                 alt="action icon" contain />
          <p class="title-modal-rate ma-0">
            {{ actionBalance }}
          </p>
          <p class="ma-0 p-bold p-name-data">
            {{ tokenBalance | formatDecimals }} {{ info.underlyingSymbol }}
          </p>
          <p class="ma-0 mb-6 p-italic">
            ={{ tokenPrice | formatPrice }} USD
          </p>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex flex-column modal-container-img mr-6 mt-6">
          <div :class="isInBorrowMenu ? 'modal-icon' : 'modal-icon-click'">
            <v-img class="mr-2" width="42" height="42" :src="symbolImg" contain />
            <div>
              <p class="ma-0 p-bold p-name mt-2">
                1 {{ info.underlyingSymbol }}
              </p>
              <p class="ma-0 p-italic">= {{ info.underlyingPrice | formatPrice }} USD</p>
            </div>
          </div>
          <template v-if="isInBorrowMenu">
            <p class="ma-0 mb-1">Interés Anual</p>
            <p class="ma-0 modal-rate">{{ info.rate }} %</p>
          </template>
        </div>
      </v-row>
      <v-row class="d-flex align-center flex-column ma-0">
        <div class="modal-line"/>
        <div class="d-flex justify-start modal-contain-subtitle">
          <p class="ma-0 mt-5 mb-2">{{ actionDescription }}</p>
        </div>
        <v-text-field placeholder="Escribe el monto" type="number"
                      v-model="amount" solo dense
                      :rules="[rules.marketCash, rules.liquidity,
                      rules.minBalance, rules.borrowBalance]" />
        <v-btn class="modal-button mb-6" height="42" :color="buttonColor"
               width="300" :disabled="!validAmount" @click="borrowOrRepay">
          {{ buttonLabel }}
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import * as constants from '@/store/constants';
import Borrow from '@/assets/icons/borrow.svg';
import Pay from '@/assets/icons/pay.svg';

export default {
  name: 'BorrowRepay',
  data() {
    return {
      showModalConnectWallet: false,
      dialog: this.showModal,
      isInBorrowMenu: this.inBorrowMenu,
      amount: null,
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
    actionIcon() {
      return this.isInBorrowMenu ? Borrow : Pay;
    },
    actionBalance() {
      return this.isInBorrowMenu ? 'Puedes pedir prestado:' : 'Debes pagar:';
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
  },
  methods: {
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
  },
};
</script>
