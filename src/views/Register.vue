<template>
  <div class="register">
    <v-row>
      <v-col cols="2" >
        <div class="register-title">Tropyco</div>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="2">
      </v-col>
      <v-col cols="8">
        <h1 >Registrate</h1>
         <v-text-field
            label="Outlined"
            single-line
            outlined
            color="#4CB163"
          ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script>

// import ModalValidationForm from '../components/ModalValidationForm.vue';

export default {
  name: 'Register',
  components: {
    // ModalValidationForm,
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
    // eslint-disable-next-line consistent-return
    type() {
      if (this.modalSuccess) return true;
      if (this.modalError) return false;
    },
    async register() {
      const emailRegex = RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
      );
      if (!emailRegex.test(this.user.email) || !this.user.name || !this.user.twitter) {
        this.modalError = true;
        return;
      }
      try {
        this.db.collection('users-tropyco').add({
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
      setTimeout(() => { this.modalError = false; }, 2000);
    },
    modalSuccess(val) {
      if (!val) return;
      setTimeout(() => { this.modalSuccess = false; }, 2000);
    },
  },
};
</script>
