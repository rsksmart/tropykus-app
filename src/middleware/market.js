import CTokenAbi from '@/abis/CErc20Immutable.json';
import PriceOracleProxyAbi from '@/abis/PriceOracleProxy.json';
import StandardTokenAbi from '@/abis/StandardToken.json';
import TropykusLensAbi from '@/abis/TropykusLens.json';
import { addresses } from '@/middleware/constants';
import { ethers } from 'ethers';
import Vue from 'vue';
import signer from './utils';

const blocksPerDay = 2 * 60 * 24;
const daysPerYear = 365;
const factor = 1e18;

export default class Market {
  constructor(address = '', MarketAbi, chainId) {
    this.marketAddress = address.toLowerCase();
    this.web3 = chainId === 31 ? Vue.web3Ws : Vue.web3;
    this.lens = new ethers.Contract(addresses[chainId].tropykusLens, TropykusLensAbi, this.web3);
    this.instance = new ethers.Contract(this.marketAddress, MarketAbi, this.web3);
    this.gasLimit = 2300000;
  }

  static async isCRbtc(address) {
    const instance = new ethers.Contract(address.toLowerCase(), CTokenAbi, Vue.web3);
    try {
      const result = await instance.callStatic.symbol();
      return result === 'cRBTC';
    } catch (e) {
      return false;
    }
  }

  get name() {
    return this.instance.callStatic.name();
  }

  get symbol() {
    return this.instance.callStatic.symbol();
  }

  get decimals() {
    return this.instance.callStatic.decimals();
  }

  async underlying() {
    const { underlyingAssetAddress } = await this
      .lens.callStatic.cTokenMetadata(this.marketAddress);
    return underlyingAssetAddress;
  }

  async underlyingAssetInstance() {
    return new ethers.Contract(await this.underlying(), StandardTokenAbi, this.web3);
  }

  async underlyingAssetSymbol() {
    const underlyingAsset = new ethers.Contract(
      await this.underlying(),
      StandardTokenAbi,
      this.web3,
    );
    return underlyingAsset.callStatic.symbol();
  }

  async underlyingAssetDecimals() {
    const underlyingAsset = new ethers.Contract(
      await this.underlying(),
      StandardTokenAbi,
      this.web3,
    );
    return underlyingAsset.callStatic.decimals();
  }

  async supplyRateAPY() {
    let supplyRatePerBlock = await this.instance.callStatic.supplyRatePerBlock();
    supplyRatePerBlock = Number(supplyRatePerBlock) / factor;
    return ((Number(supplyRatePerBlock) * blocksPerDay + 1) ** (daysPerYear - 1) - 1) * 100;
  }

  async borrowRateAPY() {
    let borrowRatePerBlock = await this.instance.callStatic.borrowRatePerBlock();
    borrowRatePerBlock = Number(borrowRatePerBlock) / factor;
    return ((Number(borrowRatePerBlock) * blocksPerDay + 1) ** (daysPerYear - 1) - 1) * 100;
  }

  async balanceOf(address) {
    return Number(await this.instance.callStatic.balanceOf(address)) / factor;
  }

  async currentBalanceOfCTokenInUnderlying(address) {
    const cTokenBalance = await this.balanceOf(address);
    const exchangeRate = await this.exchangeRateStored();
    return (cTokenBalance * exchangeRate);
  }

  async borrowBalanceStored(address) {
    return Number(await this.instance.callStatic.borrowBalanceStored(address)) / factor;
  }

  async borrowBalanceCurrent(address) {
    return Number(await this.instance.callStatic.borrowBalanceCurrent(address)) / factor;
  }

  async exchangeRateCurrent() {
    return Number(await this.instance.callStatic.exchangeRateCurrent()) / factor;
  }

  async exchangeRateStored() {
    return Number(await this.instance.callStatic.exchangeRateStored()) / factor;
  }

  async getInitialSupply(address) {
    const supplyEvents = await this.instance.queryFilter('Mint', -500000);
    let addressSupplied = 0;
    supplyEvents.forEach((supply) => {
      console.log(`supply event: ${JSON.stringify(supply)}`);
      const { minter, mintAmount } = supply.args;
      if (minter === address) addressSupplied += Number(mintAmount) / factor;
    });
    const redeemAmount = await this.getRedeems(address);
    const supplyBalance = await this.currentBalanceOfCTokenInUnderlying(address);
    const initial = addressSupplied - redeemAmount;
    return initial >= 0 ? initial : supplyBalance;
  }

  async getRedeems(address) {
    const redeemEvents = await this.instance.queryFilter('Redeem', -500000);
    let addressRedeem = 0;
    redeemEvents.forEach((redeem) => {
      console.log(`redeem event: ${JSON.stringify(redeem)}`);
      const { redeemer, redeemAmount } = redeem.args;
      if (redeemer === address) addressRedeem += Number(redeemAmount) / factor;
    });
    return addressRedeem;
  }

  async getInitialBorrow(address) {
    const supplyEvents = await this.instance.queryFilter('Borrow', -500000);
    let addressBorrowed = 0;
    supplyEvents.forEach((borrow) => {
      console.log(`borrow event: ${JSON.stringify(borrow)}`);
      const { borrower, borrowAmount } = borrow.args;
      if (borrower === address) addressBorrowed += Number(borrowAmount) / factor;
    });
    const repayAmount = await this.getRepays(address);
    const borrowBalance = await this.borrowBalanceCurrent(address);
    const initial = addressBorrowed - repayAmount;
    return initial >= 0 ? initial : borrowBalance;
  }

  async getRepays(address) {
    const supplyEvents = await this.instance.queryFilter('RepayBorrow', -500000);
    let addressRepayed = 0;
    supplyEvents.forEach((repay) => {
      console.log(`Repay event: ${JSON.stringify(repay)}`);
      const { borrower, repayAmount } = repay.args;
      if (borrower === address) addressRepayed += Number(repayAmount) / factor;
    });
    return addressRepayed;
  }

  async getEarnings(address) {
    const initial = await this.getInitialSupply(address);
    const updatedSupply = await this.currentBalanceOfCTokenInUnderlying(address);
    return updatedSupply - initial;
  }

  async getCash() {
    return Number(await this.instance.callStatic.getCash()) / factor;
  }

  async balanceOfUnderlyingInWallet(account) {
    const address = await account.getAddress();
    const underlyingAssetSymbol = await this.underlying();
    const underlyingAsset = new ethers.Contract(
      underlyingAssetSymbol,
      StandardTokenAbi,
      this.web3,
    );
    return Number(await underlyingAsset.callStatic.balanceOf(address)) / factor;
  }

  async underlyingCurrentPrice(chainId) {
    const priceOracleProxyInstance = new ethers.Contract(
      addresses[chainId].priceOracleProxy,
      PriceOracleProxyAbi,
      this.web3,
    );
    return Number(await priceOracleProxyInstance.callStatic.getUnderlyingPrice(this.marketAddress))
      / factor;
  }

  static getAmountDecimals(amount) {
    const decimalToFix = 18;
    return ethers.utils.parseUnits(
      typeof amount === 'string' ? amount : amount.toFixed(decimalToFix),
      decimalToFix,
    );
  }

  async supply(account, amountIntended) {
    const accountSigner = signer(account);
    const value = await Market.getAmountDecimals(amountIntended);
    if (await Market.isCRbtc(this.marketAddress)) {
      return this.instance.connect(accountSigner).mint({ value, gasLimit: this.gasLimit });
    }
    const underlyingAsset = new ethers.Contract(
      await this.underlying(),
      StandardTokenAbi,
      this.web3,
    );
    await underlyingAsset.connect(accountSigner).approve(this.marketAddress, value);
    return this.instance.connect(accountSigner).mint(value, { gasLimit: this.gasLimit });
  }

  async borrow(account, amountIntended) {
    const accountSigner = signer(account);
    const amount = await Market.getAmountDecimals(amountIntended);
    return this.instance.connect(accountSigner).borrow(amount, { gasLimit: this.gasLimit });
  }

  async redeem(account, amountIntended) {
    const accountSigner = signer(account);
    const exchangeRate = await this.exchangeRateCurrent();
    const amount = await Market.getAmountDecimals(amountIntended / exchangeRate);
    return this.instance.connect(accountSigner).redeem(amount, { gasLimit: this.gasLimit });
  }

  async repay(account, amountIntended) {
    const accountSigner = signer(account);
    const exchangeRate = 1; // await this.exchangeRateCurrent();
    const value = await ethers.utils.parseEther(`${amountIntended / exchangeRate}`);
    const underlyingAsset = new ethers.Contract(
      await this.underlying(),
      StandardTokenAbi,
      this.web3,
    );
    await underlyingAsset.connect(accountSigner).approve(this.marketAddress, value);
    if (await Market.isCRbtc(this.marketAddress)) {
      return this.instance.connect(accountSigner).repayBorrow({ value, gasLimit: this.gasLimit });
    }
    return this.instance.connect(accountSigner).repayBorrow(value, { gasLimit: this.gasLimit });
  }
}
