<template>
  <v-card
    width="32%"
    class="mx-auto card mb-3"
    color="rgba(1, 62, 47, 0.85)"
  >
  <v-row class="ma-0">
      <span class="mt-3 mx-2 ml-3">
        <img  width="30" src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png"/>
      </span>
      <h1>
        {{data.name}}
      </h1>
      <v-spacer></v-spacer>
    <div class="anual-rate">
      <h2 class="mt-3 ml-10">
        {{data.rate}}%
      </h2>
      <p class="ma-0">Rendimiento anual</p>
    </div>
    <div class="ma-auto card-line"></div>
  </v-row>
  <v-row class="ma-0">
    <div class="ma-3">
      <p>Precio actual</p>
      <p>
       1  {{data.name}} = ${{data.price}} USD
      </p>
    </div>
      <v-spacer></v-spacer>
     <v-btn
      class="mt-4"
      depressed
      color="#51C1AF"
      width="35%"
    >
      Ahorrar
    </v-btn>
  </v-row>
  </v-card>
</template>
<script>

export default {
  name: 'Card',
  props: {
    data: {
      require: true,
      type: Object,
    },
  },
  methods: {
    onSaving() {
      this.hiddenSave = true;
    },
  },
  data() {
    return {
      hiddenSave: false,
    };
  },
};
</script>
