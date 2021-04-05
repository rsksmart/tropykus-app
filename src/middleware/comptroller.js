import ComptrollerAbi from '@/abis/Comptroller.json';
import { ethers } from 'ethers';
import Vue from 'vue';

export default class Comptroller {
  constructor(address = '') {
    this.comptrollerAddress = address;
    this.instance = new ethers.Contract(address, ComptrollerAbi, Vue.web3);
  }

  get allMarkets() {
    return this.instance.callStatic.getAllMarkets();
  }
}
