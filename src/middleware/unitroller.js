import UnitrollerAbi from '@/abis/Unitroller.json';
import { ethers } from 'ethers';
import Vue from 'vue';

export default class Unitroller {
  constructor(address = '') {
    this.unitrollerAddress = address;
    this.instance = new ethers.Contract(address, UnitrollerAbi, Vue.web3);
  }

  get comptrollerImplementation() {
    return this.instance.callStatic.comptrollerImplementation();
  }
}
