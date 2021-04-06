<template>
  <div class="container">
    <template v-if="inBorrowMenu">
      <debts />
      <suggestions :inBorrowMenu="inBorrowMenu" />
    </template>
    <template v-else>
      <savings />
      <on-my-wallet />
      <suggestions :inBorrowMenu="inBorrowMenu" />
    </template>
  </div>
</template>

<script>
import Savings from '@/components/users/Savings.vue';
import Debts from '@/components/users/Debts.vue';
import OnMyWallet from '@/components/users/OnMyWallet.vue';
import Suggestions from '@/components/users/Suggestions.vue';

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
