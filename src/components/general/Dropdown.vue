<template>
<div class="primary-bg select-box">
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <div class="selected-item d-flex align-center"
        v-bind="attrs" v-on="on">
        <img v-if="select.img" class="ml-6 mr-3" :src="select.img" />
        <div v-if="select.underlyingSymbol"
          class="h3-sections-heading">
          {{ select.underlyingSymbol }} <br/>
          <span class="microlanding text-value">
          {{ select.symbol === 'kSAT' && lending
            ? $t('market.general.micro'): ''
          }}

          </span>
        </div>
        <v-icon class="select-icon" large color="text-primary">
          mdi-chevron-down
        </v-icon>
      </div>
    </template>
    <v-list>
      <v-list-item
        v-for="(market, index) in infoMarkets" :key="index" class="select-menu-item"
        :class="market.symbol === select.symbol ? 'active' : ''"
        @click="updateRoute(market)"
      >
        <div class="list-item">
          <div class="d-flex">
            <img :src="market.img" class="ml-2 mr-3"/>
            <div class="h3-sections-heading">
              {{ market.underlyingSymbol }}
            </div>
          </div>
          <span class="microlanding text-value">
            {{market.marketAddress === addresses[chainId].kSAT.toLowerCase()
              ? $t('market.general.micro') : ''
            }}
          </span>
        </div>
      </v-list-item>
    </v-list>
  </v-menu>
</div>
</template>
<script>
import { mapState } from 'vuex';
import { addresses } from '@/middleware/contracts/constants';
import * as constants from '@/store/constants';

export default {
  props: {
    select: {
      type: Object,
      require: true,
    },
    getMarkets: {
      type: Array,
      require: true,
    },
    tabMenu: {
      type: Boolean,
      require: false,
    },
  },
  data() {
    return {
      addresses,
      constants,
      infoMarkets: [],
      lending: false,
    };
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
    }),
  },
  watch: {
    tabMenu() {
      this.updateMarkets();
    },
    getMarkets() {
      this.updateMarkets();
    },
  },
  methods: {
    updateMarkets() {
      this.infoMarkets = [];
      if (this.$route.name === constants.ROUTE_NAMES.DEPOSIT && this.tabMenu) {
        this.lending = false;
        this.getMarkets.forEach((market) => {
          if (market.marketAddress !== addresses[this.chainId].kSAT.toLowerCase()) {
            this.infoMarkets.push(market);
          }
        });
      } else {
        this.infoMarkets = this.getMarkets;
        this.lending = true;
      }
    },
    updateRoute(market) {
      this.$emit('updateRoute', market.marketAddress);
    },
  },
  created() {
    this.updateMarkets();
  },
};
</script>
