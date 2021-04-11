<template>
  <v-container>
    <v-row class="mx-0 pl-3">
      <v-card class="crop-card">
        <v-card-title class="pa-0">
          <v-img class="mx-2" src="@/assets/icons/wallet.svg" height="23" width="23" contain/>
          <h1 class="text-left">Tengo en mi billetera</h1>
        </v-card-title>
      </v-card>
    </v-row>
    <template v-if="loadingOnMyWallet">
      <v-row class="mx-0 mt-4">
        <v-col cols="4" v-for="index in 3" :key="index">
          <v-skeleton-loader type="image" height="158" />
        </v-col>
      </v-row>
    </template>
    <template v-else>
      <template v-if="onMyWalletLoaded">
        <v-row class="mx-0 mt-4">
          <v-col cols="4" v-for="(market, idx) in inMyWallet"
                 :key="`market-${idx}`">
            <wallet-info :marketAddress="market" />
          </v-col>
        </v-row>
      </template>
      <template v-else>
        <v-row class="mx-0 pl-3 py-4">
          <v-card color="#013E2F" width="100%" class="container">
            <v-row class="ma-0">
              <p class="ma-0 whiteish">
                No tienes fondos en tu billetera, así que puedes transferir desde
              </p>
            </v-row>
            <v-row class="ma-0 pt-2">
              <v-col class="pa-0 pr-3">
                <v-btn @click="$router.push({ name: 'BinanceToLiquality'})"
                       color="rgba(163, 197, 171, 0.39)" width="100%" height="100%">
                  <v-img contain width="100" src="@/assets/wallets/binance.svg"
                         alt="Binance icon" />
                </v-btn>
              </v-col>
              <v-col class="pa-0">
                <v-btn class="d-flex" @click="$router.push({ name: 'LednToLiquality'})"
                       color="rgba(163, 197, 171, 0.39)" width="100%" height="100%">
                  <v-img width="30" height="25" src="@/assets/wallets/ledn.svg"
                         alt="Lend icon" contain />
                </v-btn>
              </v-col>
              <v-col class="py-0">
                <v-btn @click="$router.push({ name: 'BlockfiToLiquality'})"
                       color="rgba(163, 197, 171, 0.39)" width="100%" height="100%">
                  <v-img contain width="100" src="@/assets/wallets/blockfi.svg" alt="BlocFi icon" />
                </v-btn>
              </v-col>
              <v-col class="pa-0">
                <v-btn disabled color="rgba(163, 197, 171, 0.39)" width="100%" height="100%">
                  <v-img contain width="100" src="@/assets/wallets/poloniex.svg"
                         alt="Poloniex icon" />
                </v-btn>
              </v-col>
              <v-col class="py-0">
                <v-btn @click="showModalTransferFunds = true"
                       color="rgba(163, 197, 171, 0.39)" width="100%" height="100%">
                  <p class="ma-0 boldie whiteish text-center">
                    Transferir<br>desde otras<br>plataformas
                  </p>
                </v-btn>
              </v-col>
              <v-col cols="3" class="pa-0">
                <v-row class="ma-0 d-flex justify-center">
                  <p class="whiteish text-center">
                    O puedes desconectar tu billetera de<br>
                    navegador y conectar la billetera<br>
                    donde dispongas de tus fondos
                  </p>
                </v-row>
                <v-row class="ma-0">
                  <v-btn class="" color="#4CB163" width="100%">
                    <span class="boldie whiteish">Desconectar billetera</span>
                  </v-btn>
                </v-row>
              </v-col>
            </v-row>
          </v-card>
        </v-row>
      </template>
    </template>
    <template v-if="showModalTransferFunds">
      <modal-transfer-funds :showModal="showModalTransferFunds"
                            @closed="showModalTransferFunds = false"/>
    </template>
  </v-container>
</template>

<script>
import WalletInfo from '@/components/market/WalletInfo.vue';
import ModalTransferFunds from '@/components/dialog/ModalTransferFunds.vue';

export default {
  name: 'OnMyWallet',
  data() {
    return {
      inMyWallet: null,
      showModalTransferFunds: false,
    };
  },
  computed: {
    loadingOnMyWallet() {
      return this.inMyWallet === null;
    },
    onMyWalletLoaded() {
      return this.inMyWallet?.length > 0;
    },
  },
  components: {
    WalletInfo,
    ModalTransferFunds,
  },
  created() {
    setTimeout(() => {
      this.inMyWallet = [];
    }, 1000);
  },
};
</script>
