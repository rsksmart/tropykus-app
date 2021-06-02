<template>
  <v-dialog v-model="dialog" width="600" overlay-color="#000" overlay-opacity="0.8">
    <v-card class="user-action" v-click-outside="onClickOutside">
      <v-row class="button ma-0 d-flex justify-center justify-space-around">
        <v-btn
          height="80"
          depressed
          color="transparent"
          @click="inSupplyMenu = true"
          :class="inSupplyMenu ? 'button-save' : 'button-save-click'"
        >
          <span class="b1-main">{{ $t('dialog.supply-redeem.title1') }}</span>
        </v-btn>
        <v-btn
          height="80"
          depressed
          color="transparent"
          @click="inSupplyMenu = false"
          :class="inSupplyMenu ? 'button-withdraw' : 'button-withdraw-click'"
        >
          <span class="b1-main">{{ $t('dialog.supply-redeem.title2') }}</span>
        </v-btn>
      </v-row>
      <v-row class="ma-0 mt-5">
        <v-col cols="auto" class="px-0 py-2">
          <v-img class="mr-2" width="32" height="32" :src="symbolImg" contain/>
        </v-col>
        <v-col class="py-2">
          <h2 class="h2-heading">{{ info.underlyingSymbol }}</h2>
        </v-col>
      </v-row>
      <v-row class="ma-0 d-flex justify-space-between">
        <v-col cols="7" class="px-0 py-2">
          <v-row class="ma-0">
            <v-col class="pa-0 d-flex align-center">
              <p class="p1-descriptions">
                {{ actionBalance }}
              </p>
            </v-col>
            <v-col cols="auto" class="pa-0">
              <v-btn icon @click="refresh">
                <v-img width="16" height="16" src="@/assets/icons/refresh.svg" contain/>
              </v-btn>
            </v-col>
          </v-row>
          <v-row class="ma-0">
            <p class="p2-reading-values">
              {{ tokenBalance | formatDecimals }} {{ info.underlyingSymbol }}
            </p>
          </v-row>
          <v-row class="ma-0">
            <p class="p3-USD-values">
              {{ tokenPrice | formatPrice }} USD
            </p>
          </v-row>
        </v-col>
        <template v-if="inSupplyMenu" class="d-flex justify-end">
          <v-col cols="4" class="px-0 py-2">
            <v-row class="ma-0">
              <v-col class="pa-0 mt-2">
                <p class="p1-descriptions">
                  {{ $t('dialog.deposit.description2') }}
                  {{ $t('dialog.deposit.description3') }}
                </p>
              </v-col>
              <v-col cols="auto" class="pa-0 mt-1">
                <v-tooltip right color="#52826E">
                  <template v-slot:activator="{ on, attrs }">
                    <v-img v-bind="attrs" v-on="on" width="16" height="16"
                           src="@/assets/icons/info.svg" contain/>
                  </template>
                  <span class="p5-feedback">
                    {{ $t('dialog.deposit.tooltip1') }} <br>
                    {{ $t('dialog.deposit.tooltip2') }} <br>
                    {{ $t('dialog.deposit.tooltip3') }}
                  </span>
                </v-tooltip>
              </v-col>
            </v-row>
            <v-row class="ma-0 mt-4">
              <p class="p2-reading-values">
                {{ info.rate }} %
              </p>
            </v-row>
          </v-col>
        </template>
      </v-row>
      <v-divider color="#FFF" class="my-3"/>
      <v-row class="ma-0 mb-3">
        <p class="p1-descriptions">{{ actionDescription }}</p>
      </v-row>
      <v-row class="ma-0 input-box" v-bind:class="[ validAmount
      ? 'valid' : amount === null ? '' : 'invalid' ]">
        <v-col class="pa-0">
          <v-text-field type="number" v-model="amount" dark
                        :rules="[rules.leverage, rules.minBalance, rules
                        .marketCash, rules.supplyBalance]" class="input-text"
                        dense full-width single-line solo flat
                        height="62" @change="setPercentageSlider"/>
        </v-col>
        <v-col cols="auto" class="pa-0 d-flex justify-end pt-3">
          <v-btn height="40" text color="#A3B8A7" @click="setMaxAmount">
            MÁX
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-slider
          hide-details
          min="1"
          max="100"
          color="#4CB163"
          track-color=" #4CB163"
          tick-size="4"
          thumb-label
          v-model="sliderAmountPercentage" class="mt-3" @click="setAmount"/>
      </v-row>
      <v-row class="ma-0">
        <v-col class="pa-0 d-flex justify-start">
          <span class="p1-descriptions">1%</span>
        </v-col>
        <v-col class="pa-0 d-flex justify-end">
          <span class="p1-descriptions">100%</span>
        </v-col>
      </v-row>
      <template v-if="inSupplyMenu">
        <v-divider color="#FFF" class="my-3"/>
        <v-row class="ma-0">
          <v-col class="pa-0">
            <p class="p1-descriptions">
              {{ $t('dialog.deposit.description6') }}
            </p>
          </v-col>
          <v-col class="pa-0" cols="auto">
            <v-tooltip right color="#52826E">
              <template v-slot:activator="{ on, attrs }">
                <v-img v-bind="attrs" v-on="on" width="16" height="16"
                       src="@/assets/icons/info.svg" contain/>
              </template>
              <span class="p5-feedback">
                      Esta calculadora solo simula las<br>
                      ganancias que se podrían obtener en<br>
                      cierto periodo de tiempo. Las cifras<br>
                      mostradas varian segùn la tasa anual<br>
                      de ganancia dinámica y los precios de<br>
                      las criptomonedas, por lo tanto no es<br>
                      una garantia de las gananicas futuras.
                    </span>
            </v-tooltip>
          </v-col>
        </v-row>
        <v-row class="ma-0 mt-3">
          <v-slider
            hide-details
            min="1"
            max="5"
            color="#4CB163"
            track-color=" #4CB163"
            tick-size="4"
            thumb-label
            v-model="sliderYear"/>
        </v-row>
        <v-row class="ma-0">
          <v-col class="pa-0 d-flex justify-start">
            <span class="p1-descriptions">1 {{ $t('dialog.deposit.description9') }}</span>
          </v-col>
          <v-col class="pa-0 d-flex justify-end">
            <span class="p1-descriptions">5 {{ $t('dialog.deposit.description10') }}</span>
          </v-col>
        </v-row>
        <v-row class="ma-0 mt-6">
          <v-col class="pa-0">
            <p class="p1-descriptions">{{ $t('dialog.deposit.description7') }}</p>
          </v-col>
          <v-col class="pa-0">
            <p class="p6-reading-values">
              {{ possibleEarnings | formatDecimals }} {{ info.underlyingSymbol }}
            </p>
          </v-col>
          <v-col class="pa-0">
            <p class="p3-USD-values">{{ possibleEarningsUSD | formatPrice }} USD</p>
          </v-col>
        </v-row>
        <v-row class="ma-0">
          <v-col class="pa-0">
            <p class="p1-descriptions">{{ $t('dialog.deposit.description8') }}</p>
          </v-col>
          <v-col class="pa-0">
            <p class="p6-reading-values">
              {{ possibleEarningsPlusDeposit | formatDecimals }} {{ info.underlyingSymbol }}
            </p>
          </v-col>
          <v-col class="pa-0">
            <p class="p3-USD-values">{{ possibleEarningsPlusDepositUSD | formatPrice }} USD</p>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <div class="custom-spacer" />
        <!--        <v-divider color="#FFF" class="my-3"/>-->
        <!--        <v-row class="ma-0 mb-6">-->
        <!--          <p class="p1-descriptions">-->
        <!--            Si no quieres que tus fondos sean enviados desde Tropykus a la>-->
        <!--            billetera desde la <br>-->
        <!--            que estás conectado, escribe la dirección RSK en donde quieres-->
        <!--            retirar tus fondos.-->
        <!--          </p>-->
        <!--        </v-row>-->
        <!--        <v-row class="ma-0 simple-input">-->
        <!--          <v-text-field v-model="rskAddress" type="text" solo dense flat dark-->
        <!--                        label="Escribe la dirección RSK (Opcional)"/>-->
        <!--        </v-row>-->
      </template>
      <v-row class="ma-0 mt-6">
        <v-btn class="button" height="42" color="#4CB163" block
               width="300" :disabled="!validAmount" @click="supplyOrRedeem">
          <span class="b1-main">{{ buttonLabel }}</span>
        </v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import * as constants from '@/store/constants';
import WalletIcon from '@/assets/icons/wallet.svg';
import PigIcon from '@/assets/icons/pig.svg';
import { mapState } from 'vuex';

export default {
  name: 'SupplyRedeem',
  data() {
    return {
      rskAddress: null,
      sliderAmountPercentage: 0,
      sliderYear: 0,
      showModalConnectWallet: false,
      dialog: this.showModal,
      inSupplyMenu: this.inBorrowMenu,
      amount: null,
      db: this.$firebase.firestore(),
      symbolImg: null,
      data: {
        underlyingBalance: null,
        supplyBalance: null,
      },
      rules: {
        leverage: () => (this.inSupplyMenu ? this.info.borrowBalance <= 0
          : true) || this.$t('dialog.supply-redeem.rule1'),
        minBalance: () => (this.inSupplyMenu ? Number(this.amount) <= Number(this
          .data.underlyingBalance) : true) || this.$t('dialog.supply-redeem.rule2'),
        supplyBalance: () => (!this.inSupplyMenu ? Number(this.amount) <= Number(this
          .data.supplyBalance) : true) || this.$t('dialog.supply-redeem.rule3'),
        marketCash: () => (!this.inSupplyMenu ? Number(this.amount) <= Number(this
          .info.cash) : true) || this.$t('dialog.supply-redeem.rule4'),
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
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
      account: (state) => state.Session.account,
    }),
    actionIcon() {
      return this.inSupplyMenu ? WalletIcon : PigIcon;
    },
    actionBalance() {
      return this.inSupplyMenu ? this.$t('dialog.deposit.description1') : this.$t('dialog.withdraw.description2');
    },
    actionDescription() {
      const desc = this.$t('dialog.deposit.description4');
      return this.inSupplyMenu ? `${desc} ${this.$t('dialog.deposit.description5')}` : `${desc} ${this
        .$t('dialog.withdraw.description2')}`;
    },
    buttonLabel() {
      return this.inSupplyMenu ? this.$t('dialog.supply-redeem.title1') : this.$t('dialog.supply-redeem.title2');
    },
    tokenBalance() {
      return this.inSupplyMenu ? this.data.underlyingBalance : this.data.supplyBalance;
    },
    tokenPrice() {
      return this.tokenBalance * this.info.underlyingPrice;
    },
    validAmount() {
      return this.amount > 0 && typeof this
        .rules.minBalance() !== 'string' && typeof this
        .rules.leverage() !== 'string' && typeof this
        .rules.supplyBalance() !== 'string' && typeof this
        .rules.marketCash() !== 'string';
    },
    possibleEarnings() {
      return ((this.amount * (this.info.rate / 100)) + (this.info
        .interestBalance)) * this.sliderYear;
    },
    possibleEarningsUSD() {
      return this.possibleEarnings * this.info.underlyingPrice;
    },
    possibleEarningsPlusDeposit() {
      return this.possibleEarnings > this.info.interestBalance ? (+this.info
        .supplyBalance + +this.amount + +this.possibleEarnings) * this
        .sliderYear : this.info.supplyBalance;
    },
    possibleEarningsPlusDepositUSD() {
      return this.possibleEarningsPlusDeposit * this.info.underlyingPrice;
    },
  },
  watch: {
    inSupplyMenu() {
      this.amount = null;
      this.sliderAmountPercentage = 0;
      this.sliderYear = 0;
    },
  },
  methods: {
    getSymbolImg() {
      this.db
        .collection('markets-symbols')
        .doc(this.info.underlyingSymbol)
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
    async refresh() {
      this.data.underlyingBalance = await this.info.market
        .balanceOfUnderlyingInWallet(this.account);
      this.data.supplyBalance = await this.info.market
        .currentBalanceOfCTokenInUnderlying(this.walletAddress);
    },
    setMaxAmount() {
      if (this.inSupplyMenu) {
        this.amount = this.data.underlyingBalance.toFixed(10);
      } else {
        this.amount = this.info.cash > this.data.supplyBalance
          ? this.data.supplyBalance.toFixed(10) : this.info.cash.toFixed(10);
      }
      this.setPercentageSlider();
    },
    setAmount() {
      this.amount = (this.sliderAmountPercentage * this.tokenBalance) / 100;
      this.amount = this.amount.toFixed(10);
    },
    setPercentageSlider() {
      this.sliderAmountPercentage = (this.amount * 100) / this.tokenBalance;
    },
  },
  created() {
    this.getSymbolImg();
    this.refresh();
  },
};
</script>
