import ComptrollerAbi from '@/abis/Comptroller.json';
import { ethers } from 'ethers';
import Vue from 'vue';
import { addresses } from './constants';
import signer from './utils';

export default class Comptroller {
  constructor(chainId) {
    this.comptrollerAddress = addresses[chainId].comptroller;
    this.web3 = chainId === 31 ? Vue.web3Ws : Vue.web3;
    this.instance = new ethers.Contract(this.comptrollerAddress, ComptrollerAbi, this.web3);
  }

  get allMarkets() {
    return this.instance.callStatic.getAllMarkets();
  }

  getAssetsIn(address) {
    return this.instance.callStatic.getAssetsIn(address);
  }

  enterMarkets(account, marketAddress) {
    const accountSigner = signer(account);
    return this.instance.connect(accountSigner).enterMarkets([marketAddress]);
  }
}
