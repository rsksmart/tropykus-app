<template>
  <div class="home">
    Market symbol: {{ symbol }}
    Reserves: {{ reserves }}
    Subsidy: {{ subsidy }}
    Users: {{ users }}
    <div class="metrics">
      <div class="container d-flex align-center flex-column">
        <div
          class="d-flex justify-start mb-9"
          style="width: 693px;"
          >
          <div class="metric-title h2-heading text-left align-self-start">
            Reservas
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
                    Numero de direcciones unicas
                </div>
                <div class="p2-reading-values">
                    150
                </div>
              </v-col>
                <v-col>
                  <div style="width:125px" class="p1-descriptions mb-4">
                    Numero de Usuarios Unicos
                  </div>
                  <div class="p2-reading-values">
                    135
                  </div>
                </v-col>
                <v-col style="width:125px">
                  <div class="p1-descriptions mb-1">
                    Total fondo de subsidio
                  </div>
                  <div class="p2-reading-values">
                    1,000000 BTC
                  </div>
                  <div class="font-italic">$100.000 USD</div>
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
                    Mercado
                  </div>
                  <div class="title-head">
                    Total Reservas
                  </div>
                </div>
                <div class="line-market"></div>
                <div class="market-table-body">
                  <div class="market-table-content"
                    v-for="market in data"
                    :key="market.id"
                    >
                    <div class="market">
                      <div class="img">
                          <img :src="market.img">
                      </div>
                      <div class="market-info">
                          <div class="name">{{market.name}}</div>
                          <div class="id">{{market.coinId}}</div>
                      </div>
                    </div>
                      <div class="description">
                        <div class="coin">
                          {{market.coin}}
                        </div>
                        <div class="usd">
                          {{market.usd}}
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
  name: 'Metric',
  data() {
    return {
      data: [
        {
          id: 1,
          img: 'https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/markets%2FRBTC.svg?alt=media&token=65f6dd30-5bcc-42c1-bbda-7795c64cccdd',
          name: 'RSK Bitcoin',
          coinId: 'BTC',
          coin: '100.000 RBTC',
          usd: '100.000 RBTC',
        },
        {
          id: 2,
          img: 'https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/markets%2FDOC.svg?alt=media&token=9e33e1d7-8631-47a6-8b34-02503cc438ae',
          name: 'Tether USD',
          coinId: 'USDT',
          coin: '100.000 RBTC',
          usd: '100.000 RBTC',
        },
        {
          id: 3,
          img: 'https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/markets%2FrUSDT.svg?alt=media&token=3891051f-7e12-42ce-9c9a-d10aba745717',
          name: 'Dollar on Chain',
          coinId: 'DOC',
          coin: '100.000 RBTC',
          usd: '100.000 RBTC',
        },
        {
          id: 4,
          img: 'https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/markets%2FRIF.svg?alt=media&token=f8bb86a4-2fa5-40d1-aec6-5aa402fcb067',
          name: 'RSK Infraestructure Frameworks',
          coinId: 'RIF',
          coin: '100.000 RBTC',
          usd: '100.000 RBTC',
        },
      ],
      comptroller: null,
      symbol: null,
      reserves: null,
      subsidy: null,
      users: null,
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
    getMarketsInfo() {
      this.markets[0].symbol
        .then((symbol) => {
          this.symbol = symbol;
          console.log(`symbol: ${this.symbol}`);
          return this.markets[0].getReserves();
        })
        .then((reserves) => {
          this.reserves = reserves;
          console.log(`reserves: ${this.reserves}`);
          return this.markets[0].getSubsidyFound();
        })
        .then((subsidy) => {
          this.subsidy = subsidy;
          console.log(`subsidy: ${this.subsidy}`);
          console.log(`Comptroller: ${this.comptroller.comptrollerAddress}`);
          return this.comptroller.getTotalRegisteredAddresses();
        })
        .then((users) => {
          this.users = users;
          console.log(`users: ${this.users}`);
        })
        .catch(console.error);
    },
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
  },
};
</script>
