<template>
  <div class="landing">
    <div class="hidden-sm-and-down">
      <v-row>
        <v-col cols="8" class="mt-10 ml-8">
            <img width="200" src="../assets/título.png" />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="ml-10 mt-10 d-flex justify-center">
          <v-card flat color="transparent" class="container" width="500">
            <h1>Saca rendimiento de tus BTC. Relajate mientras impulsas el cambio.</h1>
            <h2>
              Tropykus finance te ayuda a que saques rendimiento de tus bitcoins. Podrás tener el
              control de tus fondos de tus forma simple, privada y con la seguridad de la blockchain
              de RSK. Además, podrás impulsar el cambio en Latinoamérica con créditos más justos y
              accesibles.
            </h2>
            <v-btn dark @click="showModal = true" color="#4CB163" x-large class="mt-7" width="92%">
              <span>Obtén acceso exclusivo</span>
            </v-btn>
            <personal-data-modal :showModal="showModal" />
          </v-card>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="6" class="ml-12 d-flex">
          <v-card class="d-flex container pa-0" width="500" color="transparent" flat>
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
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="hidden-md-and-up background-responsive">
      <v-row>
        <v-col cols="2" />
        <v-col cols="8" class="mt-10 text-center">
            <img  src="../assets/titulo-responsive.png" />
        </v-col>
        <v-col cols="2" />
      </v-row>
      <v-row>
        <v-col cols="1" />
        <v-col cols="10" class="ml-10 d-flex justify-center">
          <v-card flat color="transparent" class="container pa-0" width="500">
            <h1>Saca rendimiento de tus BTC. Relajate mientras impulsas el cambio.</h1>
            <h2>
              Tropykus finance te ayuda a que saques rendimiento de tis bitcoins.Podrás tener el
              control de tus fondos de tus forma simple,privada y con la seguridad de la blockchain
              de RSK. Además,podrás impulsar el cambio en Latinoamérica con créditos más justos y
              accesibles.
            </h2>
            <v-btn
              dark
              @click="showModal = true"
              color="#4CB163"
              x-large
              class="mt-7
             mb-12"
              width="300"
            >
              <span>Obtén acceso exclusivo</span>
            </v-btn>
            <template v-if="showModal">
              <personal-data-modal :showModal="showModal" @closed="clickOutside" />
            </template>
          </v-card>
        </v-col>
        <v-col cols="1" />
      </v-row>
      <v-row class="ma-0 ">
        <v-col cols="1" />
        <v-col cols="10" class="ml-10 d-flex">
          <v-card class="d-flex container pa-0" width="500" color="transparent" flat>
            <v-btn
              class="footer-btn mr-2"
              @click="download('/assets/tropykus_whitepaper.pdf')"
              color="#1E6368"
              depressed
              width="135"
            >
              <img width="25" class="mr-3" src="../assets/icon-whitepaper.png" alt="Icon book" />
              <p>
                Whitepaper
              </p>
            </v-btn>
            <div class="footer d-flex justify-center align-center">
              <img width="30" class="mr-2" src="../assets/icon-github.png" alt="Icon Github" />
              <a href="https://github.com/TruStartUp/tropykus-protocol" target="_blank" class="mr-0">
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
    download(guideUrl) {
      this.uxDate = new Date().toISOString();
      this.downloadStartTime = new Date().getTime();
      this.puzzleResult = true;
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = () => {
        const blob = xhr.response;
        const link = document.createElement('a');
        link.setAttribute('download', 'tropykus_whitepaper');
        link.href = URL.createObjectURL(blob);
        link.click();
        this.downloadEndTime = new Date().getTime();
        this.saveData();
      };
      xhr.open('GET', guideUrl);
      xhr.send();
      this.showPuzzle = false;
    },
  },
};
</script>
