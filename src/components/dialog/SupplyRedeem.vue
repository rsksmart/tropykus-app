<template>
  <div>
    <v-dialog v-model="dialog" width="350">
      <v-card class="modal-save d-flex justify-center flex-column" v-click-outside="onClickOutside">
        <v-row class="button ma-0 mt-3 d-flex justify-center justify-space-around">
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
              En tu billetera:
            </p>
            <p class="ma-0 p-bold p-name-data">
              {{ info.underlyingBalance | twoDecimals }} {{ info.underlyingSymbol }}
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
            <p class="ma-0 mt-5 mb-2">Escribe la cantidad que vas a ahorrar</p>
          </div>
          <v-text-field placeholder="Escribe el monto" type="number"
                        v-model="amount" solo dense />
          <v-btn class="modal-button mb-6" height="42" :color="buttonColor"
                 width="300" :disabled="!validAmount" @click="supplyOrRedeem">
            {{ buttonLabel }}
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import WalletIcon from '@/assets/icon-wallet.png';
import PigIcon from '@/assets/icon-pig.png';

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
    buttonColor() {
      return this.inSupplyMenu ? '#4CB163' : '#51C1AF';
    },
    buttonLabel() {
      return this.inSupplyMenu ? 'Depositar' : 'Retirar';
    },
    validAmount() {
      return this.amount > 0;
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
        amount: this.amount,
        action: this.buttonLabel,
      });
    },
  },
  created() {
    this.getSymbolImg();
  },
};
</script>
