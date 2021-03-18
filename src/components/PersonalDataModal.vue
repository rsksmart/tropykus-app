<template>
  <div>
    <v-dialog v-model="dialog" width="543" height="640">
      <v-card>
        <v-img src="@/assets/warning.png"></v-img>
        <v-card-title>
          CUIDAMOS TU INFORMACIÓN PERSONAL
        </v-card-title>
        <v-card-text>
          La información personal solicitada solo será usada para el proceso de
          lanzamiento.No la almacenaremos ni usaremos para proveerla o venderla
          a terceros
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn id="modal-botton" @click="redirect"> Continuar </v-btn>
        </v-card-actions>
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
