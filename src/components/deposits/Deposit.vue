<template>
    <div class="deposit">
      <h2 class="h2-heading text-primary">Deposita tus criptos y obten ganancias</h2>
      <div class="h3-sections-heading text-deposit text-detail mb-9 ">
        Depositar
      </div>
      <div class="d-flex justify-center">
        <v-card width="888" height="869" elevation="0"
          class="deposit-card secondary-color mb-16">
          <v-row class="mb-6">
            <v-col md="4">
            <div class="p1-descriptions mb-3">Selecciona la cripto a depositar</div>
            <div class="primary-bg select-box">
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <div class="selected-item d-flex align-center"
                    v-bind="attrs" v-on="on">
                    <img class="ml-6 mr-3" :src="select.img" />
                    <span class="h3-sections-heading">{{ select.symbol }}</span>
                    <v-icon large color="text-primary">
                      mdi-chevron-down
                    </v-icon>
                  </div>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(market, index) in getMarkets"
                    :key="index"
                    class="select-menu-item"
                    @click="updateRoute(market)"
                  >
                    <div class="d-flex">
                      <img :src="market.img" class="ml-2 mr-3"/>
                      <span class="h3-sections-heading">{{ market.symbol }}</span>
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>

            </div>
            </v-col>
            <v-col md="8">
              <div class="p1-descriptions mb-3 text-info">
                Escribe la cantidad que vas a depositar
              </div>
              <v-row class="ma-0 input-box primary-bg"
                :class="[ validAmount
                ? 'valid' : amount === null ? '' : 'invalid' ]"
              >
                <v-col class="pa-0">
                  <v-text-field type="number" dark class="h1-title text-info pa-0"
                    dense full-width single-line flat height="62"
                    v-model="amount"
                    :rules="[rules.leverage, rules.minBalance, rules
                        .marketCash, rules.supplyBalance]"
                        @change="setPercentageSlider"
                  />
                </v-col>
                <v-col cols="auto" class="pa-0 d-flex justify-end pt-3">
                  <v-btn height="40" text class="text-primary">
                    MÁX
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mb-9">
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">Tienes en tu billetera</div>
              <div class="p2-reading-values text-info">1,000000 RBTC</div>
              <div class="p3-USD-values text-info">$50.000 USD</div>
            </v-col>

            <v-col md="8">
              <v-slider
                class="mt-3 deposit-slider"
                min="0"
                max="100"
                color="#4CB163"
                track-color=" #4CB163"
                tick-size="10"
                thumb-label
                v-model="sliderAmountPercentage" @click="setAmount"
              />
              <v-row class="ma-0">
                <v-col class="pa-0 d-flex justify-start">
                  <span class="p1-descriptions">1%</span>
                </v-col>
                <v-col class="pa-0 d-flex justify-end">
                  <span class="p1-descriptions">100%</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">
                Tasa de ganancia anual dinámica actual
              </div>
              <div class="p2-reading-values text-info">
                {{ info.rate }} %
              </div>
            </v-col>

            <v-col md="8">
              <v-btn text class="secondary-bg btn-action">
                <span class="b1-main white--text">Depositar</span>
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="divider"></v-divider>

          <v-row>
            <v-col md="4">
              <h3 class="h3-sections-heading text-detail">Calcular ganancias</h3>
            </v-col>
          </v-row>

          <v-row class="mb-9">
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">Total ganancias</div>
              <div class="p2-reading-values text-info">0 RBTC</div>
              <div class="p3-USD-values text-info">$0 USD</div>
            </v-col>

            <v-col md="8">
              <div class="p1-descriptions mb-3 text-info">
                Escribe la cantidad que vas a depositar
              </div>
              <v-row class="ma-0 input-box primary-bg">
                <v-col class="pa-0">
                  <v-text-field type="number" dark class="h1-title text-info pa-0"
                    dense full-width single-line flat height="62"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mb-9">
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">Total  ganancias + depósito</div>
              <div class="p2-reading-values text-info">0 RBTC</div>
              <div class="p3-USD-values text-info">$0 USD</div>
            </v-col>

            <v-col md="8">
              <div class="p1-descriptions text-info">Elige el periodo de tiempo del depósito</div>
              <v-slider
                class="mt-3 deposit-slider"
                min="0"
                max="100"
                color="#4CB163"
                track-color=" #4CB163"
                tick-size="10"
                thumb-label
              />
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center ">
            <div class="p1-descriptions text-info mr-6">
              ¿Quieres tener más posibilidades de ganar usando tus fondos?
            </div>
            <div class="p1-descriptions text-info">Échale un vistazo a estratégias</div>
          </v-row>

        </v-card>
        <!-- <supply-redeem
          :info="{ market, ...info }"
          :inBorrowMenu="true"
          :showModal="supplyBorrowDialog"
        /> -->
      </div>
    </div>
</template>
<script>
// import SupplyRedeem from '@/components/dialog/SupplyRedeem.vue';
import { mapState } from 'vuex';
import * as constants from '@/store/constants';
import {
  CToken,
  CRbtc,
  Market,
  Comptroller,
} from '@/middleware';
import WalletIcon from '@/assets/icons/wallet.svg';
import PigIcon from '@/assets/icons/pig.svg';

export default {
  components: {
    // SupplyRedeem,
  },
  data() {
    return {
      constants,
      db: this.$firebase.firestore(),
      select: {
        symbol: '',
        img: '',
      },
      comptroller: undefined,
      getMarkets: [],
      market: null,
      sliderAmountPercentage: 0,
      amount: null,
      marketAddress: null,
      info: {
        underlyingSymbol: null,
        cash: null,
        rate: null,
        totalBorrows: null,
        totalBalance: null,
        underlyingPrice: null,
        underlyingBalance: null,
        liquidity: null,
        interestBalance: null,
        supplyBalance: null,
        borrowBalance: null,
      },
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
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
      markets: (state) => state.Session.markets,
      walletAddress: (state) => state.Session.walletAddress,
      account: (state) => state.Session.account,
    }),
    supplyRate() {
      return this.info.rate / 100;
    },
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
      return +this.amount ? ((this.amount * this.supplyRate) + (this.info
        .supplyBalance * this.supplyRate) * this.sliderYear) : (this.info
        .interestBalance * this.sliderYear);
    },
    possibleEarningsUSD() {
      return this.possibleEarnings * this.info.underlyingPrice;
    },
    possibleEarningsPlusDeposit() {
      if (+this.amount) {
        return this.possibleEarnings > this.info.interestBalance ? (+this.info
          .supplyBalance + +this.amount + +this.possibleEarnings) : (this.info
          .supplyBalance * this.sliderYear);
      }
      return this.info.supplyBalance + this.possibleEarnings;
    },
    possibleEarningsPlusDepositUSD() {
      return this.possibleEarningsPlusDeposit * this.info.underlyingPrice;
    },
  },
  watch: {
    markets() {
      console.log('markets watcher:', this.markets);
      if (this.markets.length > 3) this.getMarketsInfo();
    },
    $route() {
      this.getMarket();
    },
  },
  methods: {
    setAmount() {
      this.amount = (this.sliderAmountPercentage * this.tokenBalance) / 100;
      this.amount = this.amount.toFixed(10);
    },
    setPercentageSlider() {
      this.sliderAmountPercentage = (this.amount * 100) / this.tokenBalance;
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
    async refresh() {
      this.data.underlyingBalance = await this.info.market
        .balanceOfUnderlyingInWallet(this.account);
      this.data.supplyBalance = await this.info.market
        .currentBalanceOfCTokenInUnderlying(this.walletAddress);
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
    async getMarketsInfo() {
      console.log('all info markets', this.markets);
      this.getMarkets = [];
      await this.markets.map(async (market) => {
        // const subsidy = await market.getSubsidyFound();
        try {
          const data = {};
          // const m = {};
          data.symbol = await market.symbol;
          data.underlyingSymbol = await market.underlyingAssetSymbol();
          data.marketAddress = market.marketAddress;
          // data.reserve_usd = await market.reservesInUSD(this.chainId);
          // data.name = await market.underlyingAssetName();
          // data.price = await market.underlyingCurrentPrice(this.chainId);
          // data.reserves = await market.getReserves();

          data.img = await this.db
            .collection('markets-symbols')
            .doc(data.symbol)
            .get()
            .then((response) => response.data().imageURL);

          // m.symbol = data.symbol;
          // m.price = data.price;
          // this.data.push(m.symbol);
          this.getMarkets.push(data);
        } catch (error) {
          //
          console.error(error);
        }
      });
    },
    async updateMarketInfo() {
      this.info.underlyingSymbol = await this.market.underlyingAssetSymbol();
      this.info.cash = await this.market.getCash();
      this.info.symbol = await this.market.symbol;
      this.info.rate = this.inBorrowMenu
        ? await this.market.borrowRateAPY()
        : await this.market.supplyRateAPY();
      this.info.rate = this.info.rate.toFixed(3);
      this.info.totalBorrows = await this.market.totalBorrowsInUnderlying();
      // this.getSymbolImg();
      if (this.chainId) {
        this.info.underlyingPrice = await this.market.underlyingCurrentPrice(this.chainId);
      }
      if (this.walletAddress) {
        this.info.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        this.info.interestBalance = this.inBorrowMenu
          ? await this.market.getDebtInterest(this.walletAddress)
          : await this.market.getEarnings(this.walletAddress);
        this.info.liquidity = await this.comptroller.getAccountLiquidity(this.walletAddress);
        this.info.supplyBalance = await this.market
          .currentBalanceOfCTokenInUnderlying(this.walletAddress);
        this.info.borrowBalance = await this.market
          .borrowBalanceCurrent(this.walletAddress);
        this.info.interestBalance = this.inBorrowMenu
          ? await this.market.getDebtInterest(this.walletAddress)
          : await this.market.getEarnings(this.walletAddress);
        this.info.totalBalance = this.inBorrowMenu
          ? this.info.borrowBalance
          : await this.market.currentBalanceOfCTokenInUnderlying(this.walletAddress);
      }
    },
    isCRbtc() {
      return Market.isCRbtc(this.marketAddress);
    },
    async updateSelect() {
      this.select.symbol = await this.market.symbol;
      this.select.underlyingSymbol = await this.market.underlyingAssetSymbol();
      this.select.img = await this.db
        .collection('markets-symbols')
        .doc(this.select.symbol)
        .get()
        .then((response) => response.data().imageURL);
    },
    updateRoute(market) {
      if (this.$route.params.id !== market.marketAddress) {
        const to = { name: this.$route.name, params: { id: market.marketAddress } };
        this.$router.push(to);
      }
    },
    async getMarket() {
      this.marketAddress = this.$route.params.id;
      this.isCRbtc()
        .then((isCRbtc) => {
          this.market = isCRbtc ? new CRbtc(this.marketAddress, this.chainId)
            : new CToken(this.marketAddress, this.chainId);
          this.updateMarketInfo();
          this.updateSelect();
          this.getMarketsInfo();
        })
        .catch(console.error);
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getMarket();
  },
  updated() {
  },
};
</script>
