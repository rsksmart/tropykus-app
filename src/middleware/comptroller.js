import ComptrollerAbi from '@/abis/ComptrollerG6.json';
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

  // Block: 1953603
  // BlockHash: 0x322587483502ba718dc3ac3085ec85dd1c57c2076d08dc1f3a7fee7197daed3c
  async getTotalRegisteredAddresses() {
    const events = await this.wsInstance
      .queryFilter('MarketEntered', -5000);
    const accountAddresses = [];
    console.log(`events length: ${events.length}`);
    events.forEach((marketEnter) => {
      const { account } = marketEnter.args;
      if (accountAddresses.indexOf(account) === -1) accountAddresses.push(account);
    });
    return accountAddresses.length;
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
    const numerator = await this.getAccountLiquidity(address);
    const borrows = await Promise.all(await markets
      .map((market) => market.borrowBalanceInUSD(chainId, address)));
    const denominator = borrows.reduce((x, y) => x + y);
    return numerator / denominator;
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
    const deposits = await this.totalDepositsInUSD(markets, accountAddress, chainId);
    const debts = await this.totalBorrowsInUSD(markets, accountAddress, chainId);
    return deposits - debts;
  }

  // eslint-disable-next-line class-methods-use-this
  totalDepositsByInteresesInUSD(markets, accountAddress, chainId) {
    return new Promise((resolve, reject) => {
      let totalDepositsByIntereses = 0;
      let totalDeposits = 0;
      let counter = 0;
      markets.forEach(async (market) => {
        await Promise.all([
          market.underlyingCurrentPrice(chainId),
          market.currentBalanceOfCTokenInUnderlying(accountAddress),
          market.getEarnings(accountAddress),
        ])
          .then(([price, totalDepositInUnderlying, interestBalance]) => {
            totalDepositsByIntereses += totalDepositInUnderlying * price;
            totalDeposits += (totalDepositInUnderlying - interestBalance) * price;
            counter += 1;
            if (counter === markets.length) resolve({ totalDepositsByIntereses, totalDeposits });
          })
          .catch(reject);
      });
    });
  }

  // eslint-disable-next-line class-methods-use-this
  async totalBorrowsByInteresesInUSD(markets, accountAddress, chainId) {
    return new Promise((resolve, reject) => {
      let totalBorrowsByIntereses = 0;
      let totalBorrows = 0;
      let counter = 0;
      markets.forEach(async (market) => {
        await Promise.all([
          market.underlyingCurrentPrice(chainId),
          market.borrowBalanceStored(accountAddress),
          market.getDebtInterest(accountAddress),
        ])
          .then(([price, totalBorrowInUnderlying, interestBorrow]) => {
            totalBorrowsByIntereses += totalBorrowInUnderlying * price;
            totalBorrows += (totalBorrowInUnderlying - interestBorrow) * price;
            counter += 1;
            if (counter === markets.length) resolve({ totalBorrowsByIntereses, totalBorrows });
          })
          .catch(reject);
      });
    });
  }
}
