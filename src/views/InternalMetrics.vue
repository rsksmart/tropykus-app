<template>
  <div class="home">
    <div class="metrics">
      <div class="container d-flex align-center flex-column">
        <div
          class="d-flex justify-start mb-9"
          style="width: 693px;"
          >
          <div class="metric-title h2-heading text-left align-self-start">
            {{ $t('internal-metrics.title') }}
          </div>
        </div>
        <v-card
          class="d-flex justify-center align-center"
          style="width: 693px; height: 169px; border-radius: 10px;"
          color="#013E2F"
          >
          <v-row class="mx-5">
            <v-col class="ml-7">
                <div style="width:125px" class="p1-descriptions mb-4">
                    {{ $t('internal-metrics.number-addresses') }}
                </div>
                <div class="p2-reading-values">
                    {{ users }}
                </div>
              </v-col>
                <v-col style="width:125px; padding-left: 95px;" class="ml-9">
                  <div class="p1-descriptions mb-1">
                    {{ $t('internal-metrics.total-subsidy') }}
                  </div>
                  <div class="p2-reading-values">
                    {{ subsidy }} BTC
                  </div>
                  <div class="font-italic white--text">{{ subsidy_usd }} USD</div>
                </v-col>
              </v-row>
            </v-card>
            <v-card
              style="width: 693px; height: 509px; border-radius: 10px;"
              color="#013E2F"
              class="market-description"
            >
              <div class="market-table">
                <div class="market-table-head">
                  <div class="title-head">
                    {{ $t('internal-metrics.market') }}
                  </div>
                  <div class="title-head" style="width: 151px">
                    {{ $t('internal-metrics.total-reserves') }}
                  </div>
                </div>
                <div class="line-market"></div>
                <div class="market-table-body">
                  <div class="market-table-content"
                    v-for="market in getMarkets"
                    :key="market.symbol"
                    >
                    <div class="market">
                      <div class="img">
                        <img :src="market.img">
                      </div>
                      <div class="market-info">
                        <div class="name">{{market.name}}</div>
                        <div class="id text-uppercase">{{market.symbol}}</div>
                      </div>
                    </div>
                      <div class="description" style="width: 139px">
                        <div class="coin">
                          {{market.reserves | formatDecimals }}
                          <span class="text-uppercase">{{market.symbol}}</span>
                        </div>
                        <div class="usd">
                          {{ market.reserve_usd | formatPrice }} USD
                        </div>
                      </div>
                  </div>
                </div>
              </div>
          </v-card>
        </div>
      </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { Comptroller } from '@/middleware';

export default {
  name: 'InternalMetrics',
  data() {
    return {
      db: this.$firebase.firestore(),
      comptroller: null,
      symbol: null,
      reserves: null,
      subsidy_usd: null,
      subsidy: null,
      users: null,
      symbolImg: '',
      getMarkets: [],
    };
  },
  computed: {
    ...mapState({
      markets: (state) => state.Session.markets,
      chainId: (state) => state.Session.chainId,
    }),
  },
  watch: {
    markets() {
      console.log(`markets watcher: ${this.markets}`);
      if (this.markets.length > 3) this.getMarketsInfo();
    },
  },
  methods: {
    async getMarketsInfo() {
      await this.markets.map(async (market) => {
        // const subsidy = await market.getSubsidyFound();
        try {
          const data = {};
          data.symbol = await market.symbol;
          data.reserve_usd = await market.reservesInUSD(this.chainId);
          data.name = await market.underlyingAssetName();
          data.price = await market.underlyingCurrentPrice(this.chainId);
          data.reserves = await market.getReserves();

          const subsidy = await market.getSubsidyFound();

          this.subsidy = subsidy;
          this.subsidy_usd = data.price * subsidy;

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
      const address = await this.comptroller.getTotalRegisteredAddresses();
      console.log('address', address);

      // for (let i = 0; i < this.markets.length; i += 1) {
      //   // const i = 3;
      //   const data = {};
      //   this.markets[i].symbol
      //     .then(async (symbol) => {
      //       this.symbol = symbol;
      //       data.symbol = symbol;
      //       // console.log(`symbol: ${this.symbol}`);
      //       data.reserve_usd = await this.markets[i].reservesInUSD(this.chainId);
      //       data.name = await this.markets[i].underlyingAssetName() || 0;
      //       data.price = await this.markets[i].underlyingCurrentPrice(this.chainId);
      //       //
      //       data.img = await this.db
      //         .collection('markets-symbols')
      //         .doc(symbol)
      //         .get()
      //         .then((response) => response.data().imageURL);

      //       return this.markets[i].getReserves();
      //     })
      //     .then(async (reserves) => {
      //       this.reserves = reserves;
      //       // console.log(`reserves: ${this.reserves}`);
      //       // data.price_usd *= reserves;
      //       data.reserves = reserves;

      //       return this.markets[i].getSubsidyFound();
      //     })
      //     .then((subsidy) => {
      //       this.subsidy = subsidy;
      //       // console.log(`subsidy: ${this.subsidy}`);
      //       this.subsidy_usd = data.price * subsidy;
      //       // console.log(`Comptroller: ${this.comptroller.comptrollerAddress}`);
      //       return this.comptroller.getTotalRegisteredAddresses();
      //     })
      //     .then((users) => {
      //       this.users = users;
      //       console.log(`users: ${this.users}`);
      //     })
      //     .catch('error: ', console.error);

      //   this.getMarkets.push(data);
      // }
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
  },
};
</script>
