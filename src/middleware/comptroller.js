import Vue from 'vue';
import ComptrollerAbi from '@/abis/Comptroller.json';

export default class Comptroller {
  constructor(address = '') {
    this.comptrollerAddress = address;
    this.instance = new Vue.web3.eth.Contract(ComptrollerAbi, address);
  }

  get allMarkets() {
    return this.instance.methods.getAllMarkets().call();
  }
}
