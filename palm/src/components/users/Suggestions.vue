<template>
  <v-container>
    <v-row class="mx-0 pl-3">
      <v-card class="crop-card">
        <v-card-title class="pa-0">
          <v-img class="px-2" src="@/assets/icon-dollar.png" height="23" contain/>
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
            <general-info :inBorrowMenu="inBorrowMenu" :marketAddress="market"/>
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
import { mapState } from 'vuex';
import GeneralInfo from '@/components/market/GeneralInfo.vue';
import { Comptroller } from '@/middleware';

export default {
  name: 'Suggestions',
  data() {
    return {
      suggestions: null,
      comptroller: null,
    };
  },
  props: {
    inBorrowMenu: {
      required: true,
      type: Boolean,
    },
  },
  computed: {
    ...mapState({
      chainId: (state) => state.Session.chainId,
    }),
    loadingSuggestions() {
      return this.suggestions === null;
    },
    suggestionsLoaded() {
      return this.suggestions?.length > 0;
    },
  },
  methods: {
    async load() {
      this.suggestions = await this.comptroller.allMarkets;
    },
  },
  components: {
    GeneralInfo,
  },
  created() {
    this.comptroller = new Comptroller(this.chainId);
    this.load();
  },
  updated() {
    this.load();
  },
};
</script>
