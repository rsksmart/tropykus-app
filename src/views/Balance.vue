<template>
  <div class="balance">
    <navbar />
    <v-car flat color="transparent" class="card">
      <v-row>
        <v-col cols="12">Hola</v-col>
      </v-row>
    </v-car>
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'Balance',
  components: {
    Navbar,
  },
};
</script>
