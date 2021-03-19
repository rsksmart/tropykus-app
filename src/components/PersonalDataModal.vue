<template>
  <div>
    <v-dialog v-model="dialog"  width="400" class="dialog-background">
      <v-card class="dialog-data-card d-flex justify-center flex-column " >
        <v-row class="ma-0 mt-12 mb-1">
          <v-img
          class="dialog-data-img"
          src="@/assets/warning.png"
          height="70"
          contain
          />
        </v-row>
        <v-row class="d-flex justify-center ma-0 my-4">
          <h1>
          CUIDAMOS TU INFORMACIÓN PERSONAL
          </h1>
        </v-row>
        <v-row class="d-flex justify-center ma-0 my-4">
          <p>
          La información personal solicitada solo será usada para el proceso de
          lanzamiento.No la almacenaremos ni usaremos para proveerla o venderla
          a terceros
          </p>
        </v-row>
        <v-row class="d-flex justify-center ma-0 my-4 mb-8">
          <v-btn
            class="ma-3 dialog-data-botton"
            @click="redirect"
            width="300"
          >
           Continuar
          </v-btn>
        </v-row>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'PersonalDataModal',
  props: {
    showModal: {
      require: true,
      type: Boolean,
    },
  },
  computed: {
    dialog() {
      return this.showModal;
    },
  },
  methods: {
    redirect() {
      this.$router.push('Register');
    },
    created() {
      console.log(this.dialog);
    },
  },
};
</script>
