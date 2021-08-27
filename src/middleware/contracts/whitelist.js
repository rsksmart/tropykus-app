import WhitelistAbi from '@/abis/Whitelist.json';
import { ethers } from 'ethers';
import Vue from 'vue';
import { addresses } from './constants';

export default class Whitelist {
  constructor(chainId) {
    this.whitelistAddress = addresses[chainId].whitelist;
    this.instance = new ethers.Contract(this.whitelistAddress, WhitelistAbi, Vue.web3);
  }

  isEnabled() {
    return this.instance.callStatic.enabled();
  }

  userIsAuthorized(userAddress) {
    return this.instance.callStatic.exist(userAddress);
  }

  authorizedUsers() {
    return this.instance.callStatic.getUsers();
  }
}
