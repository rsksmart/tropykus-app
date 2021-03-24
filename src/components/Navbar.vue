<template>
  <div class="navbar">
    <v-row>
      <v-col cols="6">
        <div class="navbar-title mt-2 ml-10">Tropyco</div>
      </v-col>
      <v-col cols="6" class="mt-2 d-flex justify-space-around">
        <button>Inicio</button>
        <button>Tutotial</button>
        <!-- <button class="navbar-balance">Mi balance</button> -->
        <button>Sobre Tropyco</button>
        <v-btn
          depressed
          color="#4CB163"
          class="ma-auto mx-6 navbar-button"
          width="230"
        >
          Conectar billetera
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" src="../styles/main.scss">
</style>
