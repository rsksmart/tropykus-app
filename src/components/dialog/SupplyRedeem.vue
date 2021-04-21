<template>
  <v-dialog v-model="dialog" width="350" >
    <v-card class="user-action" v-click-outside="onClickOutside">
      <v-row class="button ma-0 pt-3 d-flex justify-center justify-space-around">
        <v-btn
            depressed
            color="transparent"
            @click="inSupplyMenu = true"
            :class="inSupplyMenu ? 'button-save' : 'button-save-click'"
        >
          Depositar
        </v-btn>
        <v-btn
            depressed
            color="transparent"
            @click="inSupplyMenu = false"
            :class="inSupplyMenu ? 'button-withdraw' : 'button-withdraw-click'"
        >
          Retirar
        </v-btn>
      </v-row>
      <v-row class="d-flex justify-center ma-0 ">
        <div class="modal-container mt-6 ml-6">
          <v-img :src="actionIcon" class="my-3" :width="actionIconWidth"
                 alt="action icon" contain />
          <p class="title-modal-rate ma-0">
            {{ actionBalance }}
          </p>
          <p class="ma-0 p-bold p-name-data">
            {{ tokenBalance | formatDecimals }} {{ info.underlyingSymbol }}
          </p>
          <p class="ma-0 mb-6 p-italic">
            ={{ info.underlyingBalance * info.underlyingPrice | formatPrice }} USD
          </p>
        </div>
        <v-spacer></v-spacer>
        <div class="d-flex flex-column modal-container-img mr-6 mt-6">
          <div :class="inSupplyMenu ? 'modal-icon' : 'modal-icon-click'">
            <v-img class="mr-2" width="42" height="42" :src="symbolImg" contain />
            <div>
              <p class="ma-0 p-bold p-name mt-2">
                1 {{ info.underlyingSymbol }}
              </p>
              <p class="ma-0 p-italic">= {{ info.underlyingPrice | formatPrice }} USD</p>
            </div>
          </div>
          <template v-if="inSupplyMenu">
            <p class="ma-0 mb-1">Rendimiento Anual</p>
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
                      :rules="[rules.minBalance, rules.marketCash, rules.supplyBalance]" />
        <v-btn class="modal-button mb-6" height="42" :color="buttonColor"
               width="300" :disabled="!validAmount" @click="supplyOrRedeem">
          {{ buttonLabel }}
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import * as constants from '@/store/constants';
import WalletIcon from '@/assets/icons/wallet.svg';
import PigIcon from '@/assets/icons/pig.svg';

export default {
  name: 'SupplyRedeem',
  data() {
    return {
      showModalConnectWallet: false,
      dialog: this.showModal,
      inSupplyMenu: true,
      amount: null,
      db: this.$firebase.firestore(),
      symbolImg: null,
      rules: {
        minBalance: () => (this.inSupplyMenu ? Number(this.amount) <= Number(this
          .info.underlyingBalance) : true) || 'No tienes fondos suficientes',
        supplyBalance: () => (!this.inSupplyMenu ? Number(this.amount) <= Number(this
          .info.supplyBalance) : true) || 'No tienes suficiente depositado',
        marketCash: () => (!this.inSupplyMenu ? Number(this.amount) <= Number(this
          .info.cash) : true) || 'Este mercado no tiene fondos suficientes',
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
  },
  computed: {
    actionIcon() {
      return this.inSupplyMenu ? WalletIcon : PigIcon;
    },
    actionIconWidth() {
      return this.inSupplyMenu ? 42 : 50;
    },
    actionBalance() {
      return this.inSupplyMenu ? 'En tu billetera:' : 'Tienes depositado:';
    },
    actionDescription() {
      const desc = 'Escribe la cantidad que vas a';
      return this.inSupplyMenu ? `${desc} depositar` : `${desc} retirar`;
    },
    buttonColor() {
      return this.inSupplyMenu ? '#4CB163' : '#51C1AF';
    },
    buttonLabel() {
      return this.inSupplyMenu ? 'Depositar' : 'Retirar';
    },
    tokenBalance() {
      return this.inSupplyMenu ? this.underlyingBalance : this.info.supplyBalance;
    },
    validAmount() {
      return this.amount > 0 && typeof this
        .rules.minBalance() !== 'string';
    },
  },
  watch: {
    inSupplyMenu() {
      this.amount = null;
    },
  },
  methods: {
    getSymbolImg() {
      this.db
        .collection('markets-symbols')
        .doc(this.info.symbol)
        .get()
        .then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
    },
    outsideConnectWallet() {
      this.showModalConnectWallet = false;
    },
    onClickOutside() {
      this.dialog = false;
      this.$emit('closed');
    },
    supplyOrRedeem() {
      this.$emit('action', {
        amountIntended: this.amount,
        action: this.inSupplyMenu ? constants.USER_ACTION_MINT : constants.USER_ACTION_REDEEM,
      });
    },
  },
  created() {
    this.getSymbolImg();
  },
};
</script>
