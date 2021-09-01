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

  async getActiveUsers(comptrollerAddress) {
    const now = new Date();
    const activeUsers = [];
    const comptroller = await this.db.collection('users-history').doc(comptrollerAddress).get();
    if (comptroller.exists) {
      const users = comptroller.data();
      Object.keys(users).forEach((userAddress) => {
        const usersWithActivity = comptroller.data()[userAddress].activity;
        Object.keys(usersWithActivity).forEach((timestamp) => {
          const date = new Date(timestamp);
          if (date.getFullYear() === now.getFullYear()
            && date.getMonth() === now.getMonth()
            && date.getDate() === now.getDate()) {
            if (activeUsers.indexOf(userAddress) === -1) activeUsers.push(userAddress);
          }
        });
      });
    }
    return activeUsers;
  }

  async getNewUsers(comptrollerAddress) {
    const now = new Date();
    const newUsers = [];
    const comptroller = await this.db.collection('users-history').doc(comptrollerAddress).get();
    if (comptroller.exists) {
      const users = comptroller.data();
      Object.keys(users).forEach((userAddress) => {
        const usersWithActivity = comptroller.data()[userAddress].activity;
        Object.keys(usersWithActivity).forEach((timestamp) => {
          const date = new Date(timestamp);
          if(usersWithActivity[timestamp].event === 'MarketEntered'
            && date.getFullYear() === now.getFullYear()
            && date.getMonth() === now.getMonth()
            && date.getDate() === now.getDate()
          ) {
            console.log(usersWithActivity[timestamp].event);
            console.log(userAddress);
            if (newUsers.indexOf(userAddress) === -1) newUsers.push(userAddress);
          }
        });
      });
    }
    return newUsers;
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
