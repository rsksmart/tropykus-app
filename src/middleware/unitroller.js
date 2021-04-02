import Vue from 'vue';
import UnitrollerAbi from '@/abis/Unitroller.json';

export default class Unitroller {
  constructor(address = '') {
    this.unitrollerAddress = address;
    this.instance = new Vue.web3.eth.Contract(UnitrollerAbi, address);
  }

  get comptrollerImplementation() {
    return this.instance.methods.comptrollerImplementation().call();
  }
}
