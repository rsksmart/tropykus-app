<template>
  <div class="landing">
    <div class="hidden-sm-and-down">
      <v-row class="mt-5 mb-15 ml-5 d-flex justify-start">
        <v-img position="left top" src="@/assets/título.png" height="50" contain/>
      </v-row>
      <v-row class="mx-0 ml-10 mt-15 mb-10 d-flex justify-start">
        <v-col cols="1"/>
        <v-col cols="7" class="mt-10 d-flex justify-start">
          <v-card flat color="transparent" width="500">
            <v-row class="mx-0">
              <h1>Saca rendimiento de tus BTC. Relajate mientras impulsas el cambio.</h1>
            </v-row>
            <v-row class="mx-0">
              <h2>
                Tropykus finance te ayuda a que saques rendimiento de tus bitcoins.
                Podrás tener el control de tus fondos de tus forma simple, privada y
                con la seguridad de la blockchain de RSK. Además, podrás impulsar el
                cambio en Latinoamérica con créditos más justos y accesibles.
              </h2>
            </v-row>
            <v-row class="mx-0">
              <v-btn dark @click="showModal = true" color="#4CB163"
                     x-large class="mt-7" width="92%">
                <span>Obtén acceso exclusivo</span>
              </v-btn>
            </v-row>
          </v-card>
        </v-col>
        <v-col/>
      </v-row>
      <v-row class="mx-0 ml-10 mt-10">
        <v-col cols="1"/>
        <v-col cols="6" class="mt-4">
          <v-row class="mx-0">
            <v-col class="pa-0">
              <v-btn class="footer-btn" color="#1E6368" depressed width="100%"
                     @click="download">
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
        <v-col/>
      </v-row>
    </div>
    <div class="hidden-md-and-up background-responsive">
      <v-row>
        <v-col cols="2" />
        <v-col cols="8" class="mt-10 text-center">
          <img  src="@/assets/titulo-responsive.png" />
        </v-col>
        <v-col cols="2" />
      </v-row>
      <v-row>
        <v-col cols="1" />
        <v-col cols="10" class="mt-5 d-flex justify-center">
          <v-card flat color="transparent" class="container pa-0" width="100%">
            <v-row class="mx-0">
              <h1>Saca rendimiento de tus BTC. Relajate mientras impulsas el cambio.</h1>
            </v-row>
            <v-row class="mx-0">
              <h2>
                Tropykus finance te ayuda a que saques rendimiento de tis bitcoins.
                Podrás tener el control de tus fondos de tus forma simple,privada y
                con la seguridad de la blockchain de RSK. Además,podrás impulsar el
                cambio en Latinoamérica con créditos más justos y accesibles.
              </h2>
            </v-row>
            <v-row class="mx-0">
              <v-btn dark @click="showModal = true" color="#4CB163"
                     x-large class="mt-7 mb-12" width="100%">
                <span>Obtén acceso exclusivo</span>
              </v-btn>
            </v-row>
            <v-row class="mx-0">
              <v-col class="pa-0">
                <v-btn class="footer-btn" color="#1E6368" width="100%"
                       @click="download">
                  <div>
                    <v-row class="mx-0">
                      <v-img height="25" src="@/assets/icon-whitepaper.png"
                             alt="Icon book" contain/>
                    </v-row>
                    <v-row class="mx-0 pt-1">
                      <p class="text-center">Manifiesto</p>
                    </v-row>
                  </div>
                </v-btn>
              </v-col>
              <v-col class="py-0">
                <v-btn class="footer-btn" color="#1E6368" width="100%"
                       href="https://github.com/TruStartUp/tropykus-protocol" target="_blank">
                  <div>
                    <v-row class="d-flex justify-center align-center">
                      <v-img height="25" src="@/assets/icon-github.png"
                             alt="Icon Github" contain/>
                    </v-row>
                    <v-row class="pt-1 d-flex justify-center align-center">
                      <p class="text-center">Github</p>
                    </v-row>
                  </div>
                </v-btn>
              </v-col>
              <v-col class="pa-0">
                <v-btn class="footer-btn" color="#1E6368" width="100%"
                       href="https://twitter.com/tropykus" target="_blank">
                  <div class="my-2">
                    <v-row class="d-flex justify-center align-center">
                      <v-img height="25" src="@/assets/twitter.png"
                             alt="Icon Twitter" contain/>
                    </v-row>
                    <v-row class="pt-1 d-flex justify-center align-center">
                      <p class="text-center">Twitter</p>
                    </v-row>
                  </div>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="1" />
      </v-row>
    </div>
    <template v-if="showModal">
      <personal-data-modal :showModal="showModal" @closed="clickOutside"/>
    </template>
  </div>
</template>

<script>
import PersonalDataModal from '@/components/PersonalDataModal.vue';

export default {
  name: 'Home',
  data() {
    return {
      showModal: false,
      manifestUrl: 'https://firebasestorage.googleapis.com/v0/b/tropycofinance.appspot.com/o/Tropykus_Manifiesto.pdf?alt=media&token=4b2bd86b-e7f7-44f0-b5a2-14d2d04037fb',
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
    download() {
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = () => {
        const blob = xhr.response;
        const link = document.createElement('a');
        link.setAttribute('download', 'Tropykus_Manifiesto.pdf');
        link.href = URL.createObjectURL(blob);
        link.click();
      };
      xhr.open('GET', this.manifestUrl);
      xhr.send();
    },
  },
};
</script>
