<template>
  <v-container>
    <v-row class="mx-0 pl-3">
      <v-card class="crop-card">
        <v-card-title class="pa-0">
          <v-img class="mx-2" src="@/assets/icons/dollar.svg" height="23" width="23" contain/>
          <h1 class="text-left">Sugerencias para ti</h1>
        </v-card-title>
      </v-card>
    </v-row>
    <template v-if="loadingSuggestions">
      <v-row class="mx-0 mt-4">
        <v-col cols="4" v-for="index in 3" :key="index">
          <v-skeleton-loader type="image" height="158"/>
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <template v-if="suggestionsLoaded">
        <v-row class="mx-0 mt-4">
          <v-col :cols="4" v-for="(market, idx) in suggestions"
                 :key="`market-${idx}`">
            <general-info @supply="$emit('success')" @borrow="$emit('success')"
                          @redeem="$emit('success')"
                          :inBorrowMenu="inBorrowMenu" :marketAddress="market"/>
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row class="mx-0 pl-3 py-4">
          <v-card color="#013E2F" width="100%" class="container">
            <p class="ma-0 whiteish">No tenemos nuevas sugerencias para tí</p>
          </v-card>
        </v-row>
      </template>
    </template>
  </v-container>
</template>

<script>
import GeneralInfo from '@/components/market/GeneralInfo.vue';

export default {
  name: 'Suggestions',
  props: {
    inBorrowMenu: {
      required: true,
      type: Boolean,
    },
    suggestions: {
      required: false,
      type: Array,
      default: null,
    },
  },
  computed: {
    loadingSuggestions() {
      return this.suggestions === null;
    },
    suggestionsLoaded() {
      return this.suggestions?.length > 0;
    },
  },
  components: {
    GeneralInfo,
  },
};
</script>
