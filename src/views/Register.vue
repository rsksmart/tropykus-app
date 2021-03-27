<template>
  <div class="register">
    <div class="hidden-sm-and-down">
      <v-row>
        <a href="/" class="mt-10 ml-12">
          <img  width="200" src="@/assets/título.png" />
        </a>
      </v-row>
      <v-row>
        <v-col cols="3" />
        <v-col cols="6" class="pa-0">
          <h1>Regístrate</h1>
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
                  Escribe a diego@trugroup.tech y te ayudaremos a estar más cerca del Tropykus.
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
      <v-row class="mt-3">
        <v-col cols="3"/>
        <v-col cols="6" class="pa-0">
          <v-row class="mx-0">
            <v-col class="pa-0">
              <v-btn class="footer-btn" color="#1E6368" depressed width="100%"
                     @click="download('/assets/tropykus_whitepaper.pdf')">
                <v-row>
                  <v-col cols="5" class="pr-0 d-flex justify-end align-center">
                    <v-img class="d-flex justify-end" height="25" src="@/assets/icon-whitepaper.png"
                           alt="Icon book" contain/>
                  </v-col>
                  <v-col class="px-0 d-flex justify-start align-center">
                    <p class="text-center">Manifiesto</p>
                  </v-col>
                </v-row>
              </v-btn>
            </v-col>
            <v-col class="py-0">
              <v-btn class="footer-btn" color="#1E6368" depressed width="100%"
                     href="https://github.com/TruStartUp/tropykus-protocol" target="_blank">
                <v-row>
                  <v-col cols="5" class="pr-0 d-flex justify-end align-center">
                    <v-img height="25" src="@/assets/icon-github.png"
                           alt="Icon Github" contain class="mr-0"/>
                  </v-col>
                  <v-col class="px-0 d-flex justify-start align-center">
                    <p class="text-center">Github</p>
                  </v-col>
                </v-row>
              </v-btn>
            </v-col>
            <v-col class="pa-0">
              <v-btn class="footer-btn" color="#1E6368" depressed width="100%"
                     href="https://twitter.com/tropykus" target="_blank">
                <v-row>
                  <v-col cols="5" class="pr-0 d-flex justify-end align-center">
                    <v-img height="25" src="@/assets/twitter.png"
                           alt="Icon Twitter" contain/>
                  </v-col>
                  <v-col class="px-0 d-flex justify-start align-center">
                    <p class="text-center">Twitter</p>
                  </v-col>
                </v-row>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <div class="hidden-md-and-up background-responsive">
      <v-row>
        <v-col cols="2" />
        <v-col cols="8">
          <a href="/" class="mt-6">
            <img  src="@/assets/titulo-responsive.png" />
          </a>
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
        <v-col cols="10" class="mt-8 pa-0">
          <v-row class="mx-0">
            <v-col class="pa-0">
              <v-btn class="footer-btn" color="#1E6368" depressed
                     @click="download('/assets/tropykus_whitepaper.pdf')">
                <div>
                  <v-row class="mx-0">
                    <v-img height="25" src="@/assets/icon-whitepaper.png"
                           alt="Icon book" contain/>
                  </v-row>
                  <v-row class="mx-0">
                    <p class="text-center">Manifiesto</p>
                  </v-row>
                </div>
              </v-btn>
            </v-col>
            <v-col class="py-0">
              <v-btn class="footer-btn" color="#1E6368" depressed
                     href="https://github.com/TruStartUp/tropykus-protocol" target="_blank">
                <div>
                  <v-row class="d-flex justify-center align-center">
                    <v-img height="25" src="@/assets/icon-github.png"
                           alt="Icon Github" contain/>
                  </v-row>
                  <v-row class="d-flex justify-center align-center">
                    <p class="text-center">Github</p>
                  </v-row>
                </div>
              </v-btn>
            </v-col>
            <v-col class="pa-0">
              <v-btn class="footer-btn" color="#1E6368" depressed
                     href="https://twitter.com/tropykus" target="_blank">
                <div class="my-2">
                  <v-row class="d-flex justify-center align-center">
                    <v-img height="25" src="@/assets/twitter.png"
                           alt="Icon Twitter" contain/>
                  </v-row>
                  <v-row class="d-flex justify-center align-center">
                    <p class="text-center">Twitter</p>
                  </v-row>
                </div>
              </v-btn>
            </v-col>
          </v-row>
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
        link.setAttribute('download', 'tropykus_manifiesto');
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
