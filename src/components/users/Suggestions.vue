<template>
  <v-container>
    <v-row class="ma-0 mb-5 pl-3">
      <h3 class="text-left h3-sections-heading">{{ $t('market.suggestions') }}</h3>
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
            <general-info @success="forceReload" :key="key"
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
  data() {
    return {
      key: 0,
    };
  },
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
  methods: {
    forceReload() {
      this.key += 1;
      this.$emit('actionSucceed');
    },
  },
  components: {
    GeneralInfo,
  },
};
</script>
