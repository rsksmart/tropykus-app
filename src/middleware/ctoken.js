import Vue from 'vue';
import CTokenAbi from '@/abis/CToken.json';

export default class CToken {
  constructor(address = '') {
    this.cTokenAddress = address;
    this.instance = new Vue.web3.eth.Contract(CTokenAbi, address);
  }

  get name() {
    return this.instance.methods.name().call();
  }

  get symbol() {
    return this.instance.methods.symbol().call();
  }
}
