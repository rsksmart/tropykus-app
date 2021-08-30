<template>
  <div class="home">
    <div class="metrics">
      <metrics-dropdown />
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
          width="693" height="169"
          color="#47B25F"
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
                  <v-tooltip top color="#52826E">
                    <template v-slot:activator="{ on, attrs }">
                      <div class="p2-reading-values" v-bind="attrs" v-on="on">
                        {{ subsidy | formatDecimals }} BTC
                      </div>
                    </template>
                    <span>{{ subsidy }}</span>
                  </v-tooltip>
                  <div class="p3-USD-values">{{ subsidy_usd | formatPrice}} USD</div>
                </v-col>
              </v-row>
            </v-card>
            <v-card
              style="width: 693px; border-radius: 10px;"
              color="#47B25F"
              class="market-description"
            >
              <div class="container">
                <v-row class="ma-0">
                  <v-col>
                    <span class="p1-descriptions">
                     {{ $t('internal-metrics.market') }}
                    </span>
                  </v-col>
                  <v-col>
                    <span class="p1-descriptions">
                    {{ $t('internal-metrics.total-reserves') }}
                    </span>
                  </v-col>
                </v-row>
                <v-divider />
                <v-row class="ma-0" v-for="market in getMarkets" :key="market.kTokenSymbol">
                  <v-col>
                    <v-col cols="auto" class="pa-0">
                      <v-img width="30" height="30" :src="market.img" />
                    </v-col>
                    <v-col class="pa-0">
                      <v-row class="ma-0">
                        {{market.name}}
                      </v-row>
                      <v-row class="ma-0">
                        {{market.symbol}}
                      </v-row>
                    </v-col>
                  </v-col>
                  <v-col>
                    <v-tooltip bottom content-class="secondary-color box-shadow-tooltip" max-width="180">-->
                      <template v-slot:activator="{ on, attrs }">
                        <div class="p2-reading-values" v-bind="attrs" v-on="on">
                          {{market.reserves | formatDecimals }}
                          <span class="">{{market.symbol}}</span>
                        </div>
                      </template>
                      <span>{{market.reserves }}</span>
                    </v-tooltip>
                    <div class="p3-USD-values">
                      {{ market.reserve_usd | formatPrice }} USD
                    </div>
                  </v-col>
                </v-row>
              </div>
          </v-card>
        </div>
      </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import MetricsDropdown from '@/components/general/MetricsDropdown';
import { Comptroller } from '@/middleware';
import * as constants from '@/store/constants';

export default {
  name: 'InternalMetrics',
  data() {
    return {
      db: this.$firebase.firestore(),
      comptroller: null,
      symbol: null,
      reserves: null,
      subsidy_usd: 0,
      subsidy: 0,
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
      if (this.markets.length > 3) this.getMarketsInfo();
    },
  },
  methods: {
    async getMarketsInfo() {
      await this.markets.map(async (market) => {
        try {
          const data = {};
          data.kTokenSymbol = await market.symbol;
          data.symbol = await market.underlyingAssetSymbol();
          data.reserve_usd = await market.reservesInUSD(this.chainId);
          data.name = await market.underlyingAssetName();
          data.price = await market.underlyingCurrentPrice(this.chainId);
          data.reserves = await market.getReserves();
          if (constants.CSAT_SYMBOL === data.kTokenSymbol) {
            const subsidy = await market.getSubsidyFound();
            this.subsidy = subsidy;
            this.subsidy_usd = data.price * subsidy;
            data.name += ' microsaving';
          }

          data.img = await this.db
            .collection('markets-symbols')
            .doc(data.symbol)
            .get()
            .then((response) => response.data().imageURL);

          this.getMarkets.push(data);
        } catch (error) {
          console.error(error);
        }
      });
      this.users = await this.comptroller.getTotalRegisteredAddresses();
    },
  },
  components: {
    MetricsDropdown,
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
  },
};
</script>
