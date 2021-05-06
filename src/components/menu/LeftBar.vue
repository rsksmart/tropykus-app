<template>
  <div class="left-bar">
    <v-row class="ma-0 mt-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="$router.push({ name: 'Supply' })" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/pig.svg" />
          </v-btn>
        </template>
        <span>Ahorros</span>
      </v-tooltip>
    </v-row>
    <v-row class="mx-0 my-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="$router.push({ name: 'Borrow' })" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/borrow.svg" />
          </v-btn>
        </template>
        <span>Pedir prestado</span>
      </v-tooltip>
    </v-row>
    <v-row class="ma-0 mb-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="$router.push({ name: 'Tutorials' })" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/tutorials.svg" />
          </v-btn>
        </template>
        <span>Tutoriales</span>
      </v-tooltip>
    </v-row>
    <v-row class="ma-0 mb-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn @click="$router.push({ name: 'Overview' })" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/info.svg" />
          </v-btn>
        </template>
        <span>Mercados</span>
      </v-tooltip>
    </v-row>
    <div class="custom-spacer" />
    <v-divider class="mx-2 mx-2" color="#BEBEBE" />
    <v-row class="ma-0 mt-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn href="https://github.com/TruStartUp/tropykus-protocol"
                 target="_blank" rel="noopener" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/github.svg" />
          </v-btn>
        </template>
        <span>Repositorio</span>
      </v-tooltip>
    </v-row>
    <v-row class="ma-0 my-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn href="https://twitter.com/tropykus"
                 target="_blank" rel="noopener" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/twitter.svg" />
          </v-btn>
        </template>
        <span>Twitter</span>
      </v-tooltip>
    </v-row>
    <v-row class="ma-0 mb-2 mx-2">
      <v-tooltip right color="#52826E">
        <template v-slot:activator="{ on, attrs }">
          <v-btn href="https://t.me/tropykus"
                 target="_blank" rel="noopener" width="50"
                 height="64" depressed v-bind="attrs" v-on="on">
            <v-img contain height="43" src="@/assets/icons/telegram.svg" />
          </v-btn>
        </template>
        <span>Telegram</span>
      </v-tooltip>
    </v-row>
  </div>
</template>
<script>
import { mapState } from 'vuex';

export default {
  name: 'LeftBar',
  computed: {
    ...mapState({
      walletAddress: (state) => state.Session.walletAddress,
    }),
  },
  methods: {
    getSymbolImg() {
      this.db
        .collection('markets-symbols')
        .doc(this.info.symbol)
        .get()
        .then((response) => {
          this.symbolImg = response.data().imageURL;
        })
        .catch(console.error);
    },
  },
  watch: {
    walletAddress() {
      if (this.walletAddress) return 'UserHome';
      return 'Home';
    },
  },
};
</script>
