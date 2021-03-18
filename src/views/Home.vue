<template>
 <v-app>
  <div class="d-flex justify-content-center align-items-center landing">
    <div class='landing-title'>Tropyco</div>
    <h1>Saca rendimiento de tus bitcoins y vive la buena vida en Tropyco</h1>
    <h2>Plataforma en la red RSK para ahorrar y
      pedir prestado, que no controla ni almacena tus llaves privadas.
    </h2>
    <!-- <button @click="redirect">Obtén acceso exclusivo</button> -->
    <Modal :hiddenModal = "hiddenModal"/>
  </div>
  </v-app>
</template>

<script>
import Modal from './Modal.vue';

export default {
  name: 'Home',
  components: {
    Modal,
  },
  methods: {
    redirect() {
      this.$router.push('/register');
    },
  },
};
</script>
