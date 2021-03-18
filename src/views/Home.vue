<template>
  <div class="landing">
    <v-row>
      <div class='landing-title'>Tropyco</div>
    </v-row>
    <v-row>
      <v-col cols="6" class="ml-10 mt-5 d-flex justify-center">
        <v-card flat color="transparent" class="container" width="80%">
          <h1>Saca rendimiento de tus bitcoins y vive la buena vida en Tropyco</h1>
          <h2>Plataforma en la red RSK para ahorrar y
            pedir prestado, que no controla ni almacena tus llaves privadas.
          </h2>
          <v-btn dark @click="showModal = true" color="#4CB163" x-large class="mt-3" width="95%">
            <span>Obtén acceso exclusivo</span>
          </v-btn>
          <personal-data-modal :showModal="showModal"/>
        </v-card>
      </v-col>
    </v-row>
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
  },
};
</script>
