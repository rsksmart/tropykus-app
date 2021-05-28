<template>
  <div class="tutorials tutorial-background">
    <v-container class="tutorial-container">
      <div class="d-flex align-center">
        <router-link :to="{ name: 'Tutorials' }" class="mr-3">
          <v-img height="28" src="@/assets/tutorials/left-arrow.svg" alt="Left arrow" contain/>
        </router-link>
        <h1>
          {{ $t('tutorials.blockfi.title') }}
        </h1>
        <img class="mx-2" src="@/assets/wallets/blockfi.svg" alt="Binance Logo" />
      </div>

      <v-row class="tutorial-steps" v-for="elements in this.groupedElements" :key="elements.id">
        <v-col
          v-for="element in elements"
          :key="element.id"
          cols="12"
          :md="element.number === 5 ? 8 : 4"
        >
          <div class="d-flex align-center tutorial-step-title justify-sm-center justify-md-start">
            <div class="tutorial-step-number flex-shrink-0 d-flex align-center justify-center">
              <h2>{{ element.number }}.</h2>
            </div>
            <div class="d-flex align-center">
              <h2 class="tutorial-step-description">{{ element.title }}</h2>
            </div>
          </div>

          <v-img
            :max-width="element.number === 5 ? '80%' : '307px'"
            :src="element.image"
            alt="Tutorial step"
            class="mx-auto tutorial-step-image"
          />
        </v-col>
      </v-row>
    </v-container>

    <div class="frog-container">
      <img src="@/assets/tutorials/frog.svg" alt="" class="tutorial-frog" />
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import Step01 from '@/assets/tutorials/blockfi-to-liquality/step01.png';
import Step02 from '@/assets/tutorials/blockfi-to-liquality/step02.png';
import Step03 from '@/assets/tutorials/blockfi-to-liquality/step03.png';
import Step04 from '@/assets/tutorials/blockfi-to-liquality/step04.png';
import Step05 from '@/assets/tutorials/blockfi-to-liquality/step05.png';

export default {
  data() {
    return {
      steps: [
        {
          number: 1,
          title: this.$t('tutorials.blockfi.subtitle1'),
          image: Step01,
        },
        {
          number: 2,
          title: this.$t('tutorials.blockfi.subtitle2'),
          image: Step02,
        },
        {
          number: 3,
          title: this.$t('tutorials.blockfi.subtitle3'),
          image: Step03,
        },
        {
          number: 4,
          title: this.$t('tutorials.blockfi.subtitle4'),
          image: Step04,
        },
        {
          number: 5,
          title: this.$t('tutorials.blockfi.subtitle5'),
          image: Step05,
        },
      ],
    };
  },
  computed: {
    groupedElements() {
      return _.chunk(this.steps, 3);
    },
  },
};
</script>
<style scoped>
.tutorial-step-number {
  background-color: #ff9153;
}

.tutorial-step-title {
  height: 90px;
}

@media screen and (max-width: 1365px) {
  .tutorial-step-title {
    height: 150px;
  }
}

@media screen and (max-width: 768px) {
  .tutorial-step-title {
    height: 210px;
  }
}
</style>
