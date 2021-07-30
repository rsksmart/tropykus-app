<template>
  <div class="balance-cripto balance-style">
    <div class="risk">
      <div class="d-flex justify-center">
        <img class="risk-img" src="@/assets/icons/dollar2.svg" />
        <v-progress-circular class="risk-graph" :size="125" :width="12"
          :value="100" color="#47B25F" :rotate="270" />
      </div>
    </div>
    <div class="criptos">
      <div class="p6-reading-values">
        Mis criptos
      </div>
      <div class="criptos-detail d-flex justify-space-between">
        <div class="cripto-deposit">
          <div class="p1-descriptions mb-2">Depósitos</div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#095223" />
            <div class="p7-graphics ml-2">
              RBTC
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#47B25F" />
            <div class="p7-graphics ml-2">
              USDT
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#8AE39E" />
            <div class="p7-graphics ml-2">
              DOC
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#429A62" />
            <div class="p7-graphics ml-2">
              Otras
            </div>
          </div>
        </div>
        <div class="cripto-debts">
          <div class="p1-descriptions mb-2">Deudas</div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#EEAF0E" />
            <div class="p7-graphics ml-2">
              RBTC
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#F7C61A" />
            <div class="p7-graphics ml-2">
              USDT
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#D5D77D" />
            <div class="p7-graphics ml-2">
              DOC
            </div>
          </div>
          <div class="cripto-info d-flex mb-1">
            <v-progress-circular :size="7" :width="1.5"
              :value="100" color="#BCBE34" />
            <div class="p7-graphics ml-2">
              Otras
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
