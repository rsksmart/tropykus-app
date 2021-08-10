<template>
<div class="primary-bg select-box">
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
      <div class="selected-item d-flex align-center"
        v-bind="attrs" v-on="on">
        <img v-if="select.img" class="ml-6 mr-3" :src="select.img" />
        <span v-if="select.underlyingSymbol"
          class="h3-sections-heading text-uppercase">
          {{ select.underlyingSymbol }}
        </span>
        <v-icon class="select-icon" large color="text-primary">
          mdi-chevron-down
        </v-icon>
      </div>
    </template>
    <v-list>
      <v-list-item
        v-for="(market, index) in getMarkets" :key="index" class="select-menu-item"
        :class="market.underlyingSymbol === select.underlyingSymbol ? 'active' : ''"
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
</template>
<script>
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
  },
  methods: {
    updateRoute(market) {
      this.$emit('updateRoute', market);
    },

  },
};
</script>
