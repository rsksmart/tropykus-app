<template>
  <div class="balance-borrow balance-style">
    <div class="d-flex">
      <img src="@/assets/icons/pay2.svg" alt="Deposit">
      <div class="tooltip-info">
        <v-tooltip bottom
          content-class="secondary-color box-shadow-tooltip" max-width="180">
          <template v-slot:activator="{ on, attrs }">
            <v-img v-bind="attrs" v-on="on"
                  src="@/assets/icons/info2.svg" contain/>
          </template>
          <span class="p5-feedback text-info">
            Este valor en USD es la suma total de todas
            las cryptos que pediste prestadas en Tropykus.
          </span>
        </v-tooltip>
      </div>
      <div class="ml-5 p2-reading-values">
        0 USD <br />
        <span class="p1-descriptions">Debes pagar</span>
      </div>
    </div>
    <v-divider class="mt-4 mb-2"></v-divider>
    <div class="d-flex justify-space-between">
      <div class="p6-reading-values">
        50.000 USD <br />
        <span class="p1-descriptions">
          Pedidos en préstamo
        </span>
      </div>
      <div class="p6-reading-values">
        0 USD <br />
        <span class="p1-descriptions">
          Intereses acumulados
        </span>
      </div>
    </div>
  </div>
</template>
