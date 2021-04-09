import ComptrollerAbi from '@/abis/Comptroller.json';
import { ethers } from 'ethers';
import Vue from 'vue';
import { addresses } from './constants';

export default class Comptroller {
  constructor(chainId) {
    this.comptrollerAddress = addresses[chainId].comptroller;
    this.instance = new ethers.Contract(this.comptrollerAddress, ComptrollerAbi, Vue.web3);
  }

  get allMarkets() {
    return this.instance.callStatic.getAllMarkets();
  }
}
