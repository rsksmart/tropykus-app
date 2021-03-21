<template>
  <div class="navbar">
    <div class="navbar-title">Tropyco</div>
    <button class="navbar-home">Inicio</button>
    <button class="navbar-balance">Mi balance</button>
    <button class="navbar-about">Sobre Tropyco</button>
    <button class="navbar-wallet">Conectar billetera</button>
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
