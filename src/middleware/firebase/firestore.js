import Vue from 'vue';

export default class Firebase {
  constructor() {
    this.db = Vue.firebase.firestore();
  }

  async saveUserAction(
    comptrollerAddress, userAddress, event, amount, market,
    marketAddress, priceAt, timestamp, txHash,
  ) {
    const data = {
      event, amount, market, marketAddress, priceAt, timestamp, txHash, userAddress,
    };
    const comptroller = await this.db.collection('users-history').doc(comptrollerAddress).get();
    if (comptroller?.exists) {
      await this.db.collection('users-history').doc(comptrollerAddress).update({
        [`${userAddress}.activity.${timestamp}`]: data,
      });
    } else {
      await this.db.collection('users-history').doc(comptrollerAddress).set({
        [userAddress]: {
          activity: {
            [timestamp]: data,
          },
        },
      });
    }
  }

  async getUserActivity(comptrollerAddress, userAddress) {
    const activity = [];
    const comptroller = await this.db.collection('users-history').doc(comptrollerAddress).get();
    if (comptroller.exists) {
      const user = comptroller.data()[userAddress].activity;
      Object.keys(user).forEach((key) => {
        activity.push(user[key]);
      });
    }
    return activity;
  }
}
