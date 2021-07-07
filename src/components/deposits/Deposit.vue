<template>
    <div class="deposit">
      <h2 class="h2-heading text-primary">{{ $t('deposit.title')}}</h2>
      <div class="h3-sections-heading text-deposit text-detail mb-9 ">
        {{ $t('deposit.subtitle')}}
      </div>
      <div class="d-flex justify-center">
        <v-card width="888" height="869" elevation="0"
          class="deposit-card secondary-color mb-16">
          <v-row class="mb-6">
            <v-col md="4">
            <div class="p1-descriptions mb-3">{{ $t('deposit.description1')}}</div>
            <div class="primary-bg select-box">
              <v-menu>
                <template v-slot:activator="{ on, attrs }">
                  <div class="selected-item d-flex align-center"
                    v-bind="attrs" v-on="on">
                    <img class="ml-6 mr-3" :src="select.img" />
                    <span class="h3-sections-heading text-uppercase">
                      {{ select.underlyingSymbol }}
                    </span>
                    <v-icon class="select-icon" large color="text-primary">
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
                      <span class="h3-sections-heading text-uppercase">
                        {{ market.underlyingSymbol }}
                      </span>
                    </div>
                  </v-list-item>
                </v-list>
              </v-menu>

            </div>
            </v-col>
            <v-col md="8">
              <div class="p1-descriptions mb-3 text-info">
                {{ $t('deposit.description2')}}
              </div>
              <v-row class="ma-0 input-box primary-bg"
              >
                <v-col class="pa-0">
                  <v-text-field type="number" dark class="h1-title text-info pa-0"
                    dense full-width single-line flat height="62"
                    v-model="amount"
                    :rules="[rules.leverage, rules.minBalance, rules
                        .marketCash, rules.supplyBalance]"
                    :placeholder="'0 ' + select.underlyingSymbol"
                  />
                </v-col>
                <v-col cols="auto" class="pa-0 d-flex justify-end pt-3">
                  <v-btn height="40" text>
                    <span class="text-primary">MÁX</span>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="mb-9">
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">{{ $t('deposit.description3')}}</div>
              <div class="p2-reading-values text-info">
                {{tokenBalance | formatDecimals}} {{select.underlyingSymbol}}
              </div>
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
                <v-col class="pa-0 d-flex justify-end mr-3">
                  <span class="p1-descriptions">100%</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">
                {{ $t('deposit.description4')}}
              </div>
              <div class="p2-reading-values text-info">
                {{ info.rate }} %
              </div>
            </v-col>

            <v-col md="8">
              <v-btn text class="btn-action"
                :disabled="(amount === null || amount === '') ? true : false"
                :class="amount ? 'primary-color' : 'secondary-bg'"
                 @click="menuAction"
              >
                <span class="b1-main white--text">

                  {{
                    account ? $t('deposit.btn2') : $t('deposit.btn1')
                  }}
                </span>
              </v-btn>
            </v-col>
          </v-row>

          <v-divider class="divider"></v-divider>

          <v-row>
            <v-col md="4">
              <h3 class="h3-sections-heading text-detail">
                {{ $t('deposit.calculator.title')}}
              </h3>
            </v-col>
          </v-row>

          <v-row class="mb-9">
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">
                {{ $t('deposit.calculator.description1')}}
              </div>
              <div class="p2-reading-values text-info">0 RBTC</div>
              <div class="p3-USD-values text-info">$0 USD</div>
            </v-col>

            <v-col md="8">
              <div class="p1-descriptions mb-3 text-info">
                {{ $t('deposit.calculator.description2')}}
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

          <v-row class="mb-10">
            <v-col md="4">
              <div class="p1-descriptions text-info mb-1">
                {{ $t('deposit.calculator.description3')}}
              </div>
              <div class="p2-reading-values text-info">0 RBTC</div>
              <div class="p3-USD-values text-info">$0 USD</div>
            </v-col>

            <v-col md="8">
              <div class="p1-descriptions text-info">
                {{ $t('deposit.calculator.description4')}}
              </div>
              <v-slider
                class="mt-3 deposit-slider"
                min="0"
                max="100"
                color="#4CB163"
                track-color=" #4CB163"
                tick-size="10"
                thumb-label
              />
              <v-row class="ma-0">
                <v-col class="pa-0 d-flex justify-start">
                  <span class="p1-descriptions">1%</span>
                </v-col>
                <v-col class="pa-0 d-flex justify-end mr-3">
                  <span class="p1-descriptions">100%</span>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row class="d-flex justify-center mt-16">
            <div class="p1-descriptions text-info mr-6">
              {{ $t('deposit.description5')}}
            </div>
            <div class="p1-descriptions text-info">{{ $t('deposit.description6')}}</div>
          </v-row>

        </v-card>

        <template v-if="showModalConnectWallet">
          <connect-wallet
            :showModal="showModalConnectWallet"
            @closed="outsideConnectWallet"
          />
        </template>

      </div>
    </div>
</template>
<script>
// import SupplyRedeem from '@/components/dialog/SupplyRedeem.vue';
import { mapState } from 'vuex';
import ConnectWallet from '@/components/dialog/ConnectWallet.vue';
import * as constants from '@/store/constants';
import {
  CToken,
  CRbtc,
  Market,
  Comptroller,
} from '@/middleware';
// import WalletIcon from '@/assets/icons/wallet.svg';
// import PigIcon from '@/assets/icons/pig.svg';

export default {
  components: {
    ConnectWallet,
  },
  data() {
    return {
      constants,
      db: this.$firebase.firestore(),
      comptroller: undefined,
      getMarkets: [],
      market: null,
      select: {
        symbol: '',
        img: '',
      },
      showModalConnectWallet: false,
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
    tokenBalance() {
      return this.data.underlyingBalance;
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
    async account() {
      this.refresh();
    },
  },
  methods: {
    async menuAction() {
      if (!this.account) {
        this.showModalConnectWallet = true;
        return;
      }
      this.allMarkets = await this.comptroller.allMarkets;
      if (assetsIn.indexOf(this.marketAddress) === -1) {
        await this.comptroller.enterMarkets(this.account, this.allMarkets);
      }
      // this.txSummaryDialog = true; // TODO
      this.showWaiting();
      await this.market.supply(this.account, this.amount)
        .then(() => {
          this.market.wsInstance.on('Mint', (from) => {
            if (from === this.walletAddress) {
              this.showSuccess();
              this.updateMarketInfo();
            }
          });
        })
        .catch(this.showError);
    },
    async getMarketsInfo() {
      this.getMarkets = [];
      await this.markets.map(async (market) => {
        // const subsidy = await market.getSubsidyFound();
        try {
          const data = {};
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
    async refresh() {
      console.log('refres');
      if (this.account) {
        this.data.underlyingBalance = await this.market
          .balanceOfUnderlyingInWallet(this.account);
        console.log(this.data.underlyingBalance);
      }
      this.data.supplyBalance = await this.market
        .currentBalanceOfCTokenInUnderlying(this.walletAddress);
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
          this.refresh();
          this.reset();
        })
        .catch(console.error);
    },
    outsideConnectWallet() {
      this.showModalConnectWallet = false;
    },
    setAmount() {
      this.amount = (this.sliderAmountPercentage * this.tokenBalance) / 100;
      this.amount = this.amount.toFixed(10);
    },
    reset() {
      this.sliderAmountPercentage = 0;
      this.amount = null;
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.getMarket();
    this.getMarketsInfo();
  },
  updated() {
  },
};
</script>
