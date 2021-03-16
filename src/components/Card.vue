<template>
  <div class="card">
    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/1200px-Bitcoin.svg.png" alt=""/>
    <h1 class="card-title">{{data.name}}</h1>
    <p class="card-rate">{{data.rate}}%</p>
    <p class="card-description">Rendimiento anual</p>
    <p class="card-price">{{`1 ${data.name} = $${data.price} USD`}}</p>
    <p class="card-price-description">Precio actual</p>
    <button>Ahorrar</button>
  </div>
</template>
<script>
export default {
  props: ['data'],
};
</script>
