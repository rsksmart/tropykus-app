import ComptrollerAbi from '@/abis/ComptrollerG6.json';
import { ethers } from 'ethers';
import Vue from 'vue';
import { addresses } from './constants';
import signer from './utils';

export default class Comptroller {
  constructor(chainId) {
    this.deployBlock = addresses[chainId].deployBlock;
    this.comptrollerAddress = addresses[chainId].comptroller;
    this.kRBTC = addresses[chainId].kRBTC;
    this.instance = new ethers.Contract(this.comptrollerAddress, ComptrollerAbi, Vue.web3);
    this.wsInstance = new ethers.Contract(this.comptrollerAddress, ComptrollerAbi, Vue.web3Ws);
    this.chainId = chainId;
  }

  async allMarkets(all = true) {
    const markets = await this.instance.callStatic.getAllMarkets();
    const marketsCopy = [];
    markets.forEach((marketAddress) => {
      if (all) {
        marketsCopy.push(marketAddress.toLowerCase());
      } else if (marketAddress.toLowerCase() !== this.kRBTC) {
        marketsCopy.push(marketAddress.toLowerCase());
      }
    });
    return marketsCopy.reverse();
  }

  async getRegisteredAddresses(blocks = null) {
    let delta;
    if (blocks) {
      delta = blocks;
    } else {
      const currentBlock = await Vue.web3.getBlockNumber();
      delta = (this.deployBlock - currentBlock);
    }
    const events = await this.wsInstance
      .queryFilter('MarketEntered', delta);
    const accountAddresses = [];
    events.forEach((marketEnter) => {
      const { account } = marketEnter.args;
      if (accountAddresses.indexOf(account) === -1) accountAddresses.push(account);
    });
    return accountAddresses;
  }

  // getRetiredUsers(markets, uniqueAddresses, previousActiveUsers) {
  //   return new Promise((resolve, reject) => {
  //     const retiredUsers = [];
  //     let counter = 0;
  //     uniqueAddresses.forEach(async (userAddress) => {
  //       await Promise.all([
  //         this.totalDepositsByInteresesInUSD(markets, userAddress, this.chainId),
  //         this.totalBorrowsByInteresesInUSD(markets, userAddress, this.chainId),
  //       ])
  //         .then(([{ totalDeposits }, { totalBorrows }]) => {
  //           if (totalDeposits === 0 && totalBorrows === 0) retiredUsers.push(userAddress);
  //           counter += 1;
  //           if (counter === uniqueAddresses.length) resolve(retiredUsers);
  //         })
  //         .catch(reject);
  //     });
  //   });
  // }

  async getAssetsIn(address) {
    const assetsIn = await this.instance.callStatic.getAssetsIn(address);
    const assetsInCopy = [];
    assetsIn.forEach((asset) => {
      assetsInCopy.push(asset.toLowerCase());
    });
    return assetsInCopy;
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
