<template>
  <div class="register">
     <v-row>
      <div class='register-title'>Tropyco</div>
    </v-row>
    <v-row>
      <v-col cols="3" />
      <v-col cols="6" class="pa-0">
        <h1>Registrate</h1>
        <v-form ref="form" lazy-validation>
          <p class="register-name">Nombre</p>
          <v-text-field
            v-model="user.name"
            label="Escribe tu nombre"
            required
            dense
            solo
          ></v-text-field>
          <p class="register-email">Correo electrónico</p>
          <v-text-field
            v-model="user.email"
            label="Escribe un correo electrónico de contacto"
            required
            dense
            solo
          ></v-text-field>
           <p class="register-twitter">Twitter</p>
          <v-text-field
            v-model="user.twitter"
            label="Escribe @pepito.perez"
            required
            dense
            solo
          ></v-text-field>
          <span class="d-flex justify-end" >
            <span class="register-span">
              <h2>¡Contáctanos!</h2>
              <p class="register-foot">
                Escribe a diego@trugroup.tech y te ayudaremos a estar más cerca del
                Tropyco.
              </p>
            </span>
            <v-btn color="#4CB163" @click="register" width="40%"> Registarme </v-btn>
          </span>
        </v-form>
       <modal-validation-form class="modal" v-if="modalError || modalSuccess" v-bind:type="type()"/>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-end ma-0">
      <v-col cols="9" />
      <v-col cols ="3" class="mt-12 register-buttons">
        <a href="/assets/tropyco_whitepaper.pdf" download class="mx-6">
          Whitepaper
        </a>
        <a href="https://github.com/TruStartUp/tropyco-app/tree/landing-page" target="_blank" class="mr-0">
          Repositorio
        </a>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ModalValidationForm from '../components/ModalValidationForm.vue';

export default {
  name: 'Register',
  components: {
    ModalValidationForm,
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
    download(guideUrl, part) {
      this.uxDate = new Date().toISOString();
      this.downloadStartTime = new Date().getTime();
      this.puzzleResult = true;
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = () => {
        const blob = xhr.response;
        const link = document.createElement('a');
        link.setAttribute('download', `Guia de privacidad ${part}`);
        link.href = URL.createObjectURL(blob);
        link.click();
        this.downloadEndTime = new Date().getTime();
        this.saveData();
      };
      xhr.open('GET', guideUrl);
      xhr.send();
      this.showPuzzle = false;
    },
    type() {
      if (this.modalSuccess) return true;
      return false;
    },
    async register() {
      const emailRegex = RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );
      if (
        !emailRegex.test(this.user.email)
        || !this.user.name
        || !this.user.twitter
      ) {
        this.modalError = true;
        return;
      }
      try {
        this.db.collection('users-tropyco').doc(`${new Date()}`).set({
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
      setTimeout(() => {
        this.modalError = false;
      }, 2000);
    },
    modalSuccess(val) {
      if (!val) return;
      setTimeout(() => {
        this.modalSuccess = false;
        this.$router.push('/');
      }, 2000);
    },
  },
};
</script>
