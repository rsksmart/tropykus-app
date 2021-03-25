<template>
  <div class="landing">
    <div class="hidden-sm-and-down">
      <v-row>
        <div class="landing-title">Tropykus</div>
      </v-row>
      <v-row>
        <v-col cols="6" class="ml-10 mt-10 d-flex justify-center">
          <v-card flat color="transparent" class="container" width="500">
            <h1>Saca rendimiento de tus bitcoins y vive la buena vida en Tropykus</h1>
            <h2>
              Plataforma en la red RSK para ahorrar y pedir prestado, que no controla ni almacena
              tus llaves privadas.
            </h2>
            <v-btn dark @click="showModal = true" color="#4CB163" x-large class="mt-7" width="83%">
              <span>Obtén acceso exclusivo</span>
            </v-btn>
            <personal-data-modal :showModal="showModal" />
          </v-card>
        </v-col>
      </v-row>
         <v-row class="d-flex justify-end ma-0">
      <v-col cols="9" />
      <v-col cols ="3" class="mt-12 register-buttons">
        <a href="/assets/tropyco_whitepaper.pdf" download class="mx-6">
          Whitepaper
        </a>
        <a href="https://github.com/TruStartUp/tropyco-protocol" target="_blank" class="mr-0">
          Repositorio
        </a>
      </v-col>
    </v-row>
    </div>
    <div class="hidden-md-and-up background-responsive">
      <v-row>
        <v-col cols="2" />
        <v-col cols="8" >
        <div  class=" ma-0 landing-title">Tropykus</div>
        </v-col>
        <v-col cols="2" />
      </v-row>
      <v-row>
        <v-col cols="1" />
        <v-col cols="10" class="ml-10 d-flex justify-center">
          <v-card flat color="transparent" class="container pa-0" width="500">
            <h1>Saca rendimiento de tus bitcoins y vive la buena vida en Tropykus</h1>
            <h2>
              Plataforma en la red RSK para ahorrar y pedir prestado, que no controla ni almacena
              tus llaves privadas.
            </h2>
            <v-btn dark @click="showModal = true" color="#4CB163" x-large class="mt-7
             mb-12" width="100%">
              <span>Obtén acceso exclusivo</span>
            </v-btn>
            <template v-if="showModal">
              <personal-data-modal :showModal="showModal" @closed="clickOutside"/>
            </template>
          </v-card>
        </v-col>
        <v-col cols="1"/>
      </v-row>
         <v-row class="d-flex justify-end ma-0">
      <v-col cols="1"/>
      <v-col cols ="11" class="mt-14 register-buttons">
        <a href="/assets/tropykus_whitepaper.pdf" download class="mx-8">
          Whitepaper
        </a>
        <a href="https://github.com/TruStartUp/tropyco-protocol" target="_blank" class="mr-0">
          Repositorio
        </a>
      </v-col>
    </v-row>
    </div>
  </div>
</template>

<script>
import PersonalDataModal from '@/components/PersonalDataModal.vue';

export default {
  name: 'Home',
  data() {
    return {
      showModal: false,
    };
  },
  components: {
    PersonalDataModal,
  },
  methods: {
    redirect() {
      this.$router.push('/register');
    },
    clickOutside() {
      this.showModal = false;
    },
  },
};
</script>
