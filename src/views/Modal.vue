<template>
  <v-row justify="center">
    <v-btn id="modal-open" dark @click.stop="dialog = true">
      Obtén acceso exclusivo
    </v-btn>

    <v-dialog v-model="dialog" width="543" height="640">
      <v-card id="card">
        <v-img class="modal-img" src="@/assets/warning.png"></v-img>
        <v-card-title id="modal-title">
          CUIDAMOS TU INFORMACIÓN PERSONAL
        </v-card-title>

        <v-card-text id="modal-text">
          La información personal solicitada solo será usada para el proceso de
          lanzamiento.No la almacenaremos ni usaremos para proveerla o venderla
          a terceros
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn id="modal-botton" @click="redirect"> Continuar </v-btn>
          b
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    redirect() {
      this.$router.push('/register');
    },
  },
};
</script>
