import ComptrollerAbi from '@/abis/Comptroller.json';
import { ethers } from 'ethers';
import Vue from 'vue';
import { addresses } from './constants';
import signer from './utils';

export default class Comptroller {
  constructor(chainId) {
    this.comptrollerAddress = addresses[chainId].comptroller;
    this.instance = new ethers.Contract(this.comptrollerAddress, ComptrollerAbi, Vue.web3);
    this.wsInstance = new ethers.Contract(this.comptrollerAddress, ComptrollerAbi, Vue.web3Ws);
  }

  get allMarkets() {
    return this.instance.callStatic.getAllMarkets();
  }

  getAssetsIn(address) {
    return this.instance.callStatic.getAssetsIn(address);
  }

  async getAccountLiquidity(address) {
    const liquidityResponse = await this.instance.callStatic.getAccountLiquidity(address);
    return liquidityResponse[1] / 1e18;
  }

  enterMarkets(account, marketAddresses) {
    const accountSigner = signer(account);
    return this.instance.connect(accountSigner).enterMarkets(marketAddresses);
  }

  async healthRatio(markets, chainId, address) {
    const numerador = await this.getAccountLiquidity(address);
    let denominador = 0;
    markets.forEach(async (market) => {
      denominador += await market.borrowBalanceInUSD(chainId, address);
    });
    return numerador / denominador;
  }

  async hypotheticalHealthRatio(markets, chainId, address, borrowBalanceInUSD) {
    const numerador = await this.getAccountLiquidity(address);
    let denominador = 0;
    markets.forEach(async (market) => {
      denominador += await market.borrowBalanceInUSD(chainId, address);
    });
    denominador += borrowBalanceInUSD;
    return numerador / denominador;
  }

  async healthFactor(markets, chainId, address) {
    return 1 - Math.min(1, 1 / await this.healthRatio(markets, chainId, address));
  }

  async hypotheticalHealthFactor(markets, chainId, address, borrowBalanceInUSD) {
    return 1 - Math.min(1, 1 / await this
      .hypotheticalHealthRatio(markets, chainId, address, borrowBalanceInUSD));
  }

  async totalBalanceInUSD(markets, accountAddress, chainId) {
    return this.totalDepositsInUSD(markets, accountAddress, chainId)
      - this.totalBorrowsInUSD(markets, accountAddress, chainId);
  }

  // eslint-disable-next-line class-methods-use-this
  async totalDepositsInUSD(markets, accountAddress, chainId) {
    let totalDeposits = 0;
    markets.forEach(async (market) => {
      const price = await market.underlyingCurrentPrice(chainId);
      const totalDepositInUnderlying = await market
        .currentBalanceOfCTokenInUnderlying(accountAddress);
      totalDeposits += totalDepositInUnderlying * price;
    });
    return totalDeposits;
  }

  // eslint-disable-next-line class-methods-use-this
  async totalBorrowsInUSD(markets, accountAddress, chainId) {
    let totalBorrows = 0;
    markets.forEach(async (market) => {
      const price = await market.underlyingCurrentPrice(chainId);
      const totalBorrowInUnderlying = await market.borrowBalanceCurrent(accountAddress);
      totalBorrows += totalBorrowInUnderlying * price;
    });
    return totalBorrows;
  }
}
