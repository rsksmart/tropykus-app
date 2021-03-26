<template>
  <div class="register">
    <div class="hidden-sm-and-down">
      <v-row>
        <a class="register-title d-flex align-center" href="/">
          <img
          class="title-img mr-3" src="../assets/Palmera.png" />
        Tropykus</a>
      </v-row>
      <v-row>
        <v-col cols="3" />
        <v-col cols="6" class="pa-0">
          <h1>Registrate</h1>
          <v-form ref="form" class="mb-12" lazy-validation>
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
            <span class="d-flex justify-end">
              <span class="register-span">
                <h2>¡Contáctanos!</h2>
                <p class="register-foot">
                  Escribe a diego@trugroup.tech y te ayudaremos a estar más cerca del Tropyco.
                </p>
              </span>
              <v-btn color="#4CB163" @click="register" width="40%"> Registarme </v-btn>
            </span>
          </v-form>
          <modal-validation-form
            class="modal"
            v-if="modalError || modalSuccess"
            v-bind:type="type()"
          />
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="3" />
        <v-col cols="6" class="d-flex pa-0">
          <v-btn
            class="footer-btn mr-8"
            @click="download('/assets/tropykus_whitepaper.pdf')"
            color="#1E6368"
            depressed
            width="170"
          >
            <img width="25" class="mr-3" src="../assets/icon-whitepaper.png" alt="Icon book" />
            <p>
              Whitepaper
            </p>
          </v-btn>
          <div class="footer d-flex justify-center align-center">
            <img width="30" class="mr-2" src="../assets/icon-github.png" alt="Icon Github" />
            <a href="https://github.com/TruStartUp/tropyco-protocol" target="_blank" class="mr-0">
              Github
            </a>
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="hidden-md-and-up background-responsive">
      <v-row>
        <v-col cols="2" />
        <v-col cols="8">
          <a class="register-title d-flex align-center mt-2" href="/">
          <img class="title-img mr-2" width="32" src="../assets/Palmera.png" />
          Tropykus</a>
        </v-col>
        <v-col cols="2" />
      </v-row>
      <v-row>
        <v-col cols="1" />
        <v-col cols="10" class="pa-0">
          <h1 class="ml-2">Regístrate</h1>
          <v-form ref="form" class="ma-2" lazy-validation>
            <p class="register-name">Nombre</p>
            <v-text-field
              height="45"
              v-model="user.name"
              label="Escribe tu nombre"
              required
              dense
              solo
            ></v-text-field>
            <p class="register-email">Correo electrónico</p>
            <v-text-field
              height="45"
              v-model="user.email"
              label="Escribe un correo electrónico"
              required
              dense
              solo
            ></v-text-field>
            <p class="register-twitter">Twitter</p>
            <v-text-field
              height="45"
              v-model="user.twitter"
              label="Escribe @pepito.perez"
              required
              dense
              solo
            ></v-text-field>
            <span class="d-flex justify-end mt-3">
              <v-btn color="#4CB163" @click="register" width="100%" class="mb-3">
                Registarme
              </v-btn>
            </span>
          </v-form>
          <modal-validation-form
            class="modal"
            v-if="modalError || modalSuccess"
            v-bind:type="type()"
          />
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="1"/>
        <v-col cols="10" class="ml-9 d-flex pa-0">
          <v-card class="d-flex container pa-0 mr-1" width="500" color="transparent" flat>
            <v-btn
              class="footer-btn mr-2"
              @click="download('/assets/tropykus_whitepaper.pdf')"
              color="#1E6368"
              depressed
              width="48%"
            >
              <img width="25" class="mr-3" src="../assets/icon-whitepaper.png" alt="Icon book" />
              <p>
                Whitepaper
              </p>
            </v-btn>
            <div class="footer d-flex justify-center align-center">
              <img width="30" class="mr-2" src="../assets/icon-github.png" alt="Icon Github" />
              <a href="https://github.com/TruStartUp/tropyco-protocol" target="_blank" class="mr-0">
                Github
              </a>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
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
    download(guideUrl) {
      this.uxDate = new Date().toISOString();
      this.downloadStartTime = new Date().getTime();
      this.puzzleResult = true;
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = () => {
        const blob = xhr.response;
        const link = document.createElement('a');
        link.setAttribute('download', 'tropikus_whitepaper');
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
