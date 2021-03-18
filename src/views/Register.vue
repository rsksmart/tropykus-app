<template>
  <div class="register">
    <div class="register-title">Tropyco</div>
    <h1>Registrate</h1>
    <form v-on:submit.prevent ="register" action="">
      <p class="register-name">Nombre</p>
      <input
        type="text"
        class="input-name"
        v-model="user.name"
        placeholder="Escribe tu nombre"
      />
      <p class="register-email">Correo electrónico</p>
      <input
        type="text"
        class="input-email"
        v-model="user.email"
        placeholder="Escribe tu correo electrónico de contacto"
      />
      <p class="register-twitter">Twitter</p>
      <input
        type="text"
        class="input-twitter"
        v-model="user.twitter"
        placeholder="Escribe @pepito.perez"
      />
      <button class="register-button">Registrarme</button>
    </form>

    <h2>¡Contáctanos!</h2>
    <p class="register-foot">
      Escribe a diego@trugroup.tech y te ayudaremos a estar más cerca del
      Tropyco.
    </p>
    <Modal v-if="modalError || modalSuccess" v-bind:type="type()"/>
  </div>
</template>
<script>
import Modal from '@/components/ModalError.vue';

export default {
  name: 'Register',
  components: {
    Modal,
  },
  data() {
    return {
      user: {},
      modalSuccess: false,
      modalError: false,
      db: this.$firebase.firestore(),
    };
  },
  methods: {
    // eslint-disable-next-line consistent-return
    type() {
      if (this.modalSuccess) return true;
      if (this.modalError) return false;
    },
    async register() {
      const emailRegex = RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );
      if (!emailRegex.test(this.user.email) || !this.user.name || !this.user.twitter) {
        this.modalError = true;
        return;
      }
      try {
        this.db.collection('users-tropyco').add({
          name: this.user.name,
          email: this.user.email,
          twitter: this.user.twitter,
        });
        this.user = {};
        this.modalSuccess = true;
      } catch (err) {
        console.log(err);
      }
    },
  },
  watch: {
    modalError(val) {
      if (!val) return;
      setTimeout(() => { this.modalError = false; }, 2000);
    },
    modalSuccess(val) {
      if (!val) return;
      setTimeout(() => { this.modalSuccess = false; }, 2000);
    },
  },
};
</script>
