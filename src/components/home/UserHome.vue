<template>
  <div class="container">
    <template v-if="inBorrowMenu">
      <debts :inBorrowMenu="inBorrowMenu" />
      <suggestions :inBorrowMenu="inBorrowMenu" />
    </template>
    <template v-else>
      <savings :inBorrowMenu="inBorrowMenu" />
      <on-my-wallet :inBorrowMenu="inBorrowMenu" />
      <suggestions :inBorrowMenu="inBorrowMenu" />
    </template>
  </div>
</template>

<script>
import Savings from '@/components/home/Savings.vue';
import Debts from '@/components/home/Debts.vue';
import OnMyWallet from '@/components/home/OnMyWallet.vue';
import Suggestions from '@/components/home/Suggestions.vue';

export default {
  name: 'UserHome',
  props: {
    inBorrowMenu: {
      require: true,
      type: Boolean,
    },
  },
  components: {
    Savings,
    Debts,
    OnMyWallet,
    Suggestions,
  },
};
</script>
