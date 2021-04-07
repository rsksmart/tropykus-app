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
  constructor(address = '', MarketAbi) {
    this.marketAddress = address;
    this.lens = new ethers.Contract('0x4826533B4897376654Bb4d4AD88B7faFD0C98528', TropykusLensAbi, Vue.web3);
    this.instance = new ethers.Contract(address, MarketAbi, Vue.web3);
  }

  static async isCRBT(address) {
    const instance = new ethers.Contract(address, CTokenAbi, Vue.web3);
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

  async underlyingAssetSymbol() {
    const underlyingAsset = new ethers.Contract(
      await this.underlying(),
      StandardTokenAbi,
      Vue.web3,
    );
    return underlyingAsset.callStatic.symbol();
  }

  async underlying() {
    const { underlyingAssetAddress } = await this
      .lens.callStatic.cTokenMetadata(this.marketAddress);
    return underlyingAssetAddress;
  }

  async supplyRateAPY() {
    const supplyRatePerBlock = await this.instance.callStatic.supplyRatePerBlock();
    return ((Number(supplyRatePerBlock) * blocksPerDay + 1) ** (daysPerYear - 1) - 1) * 100;
  }

  async borrowRateAPY() {
    const borrowRatePerBlock = await this.instance.callStatic.borrowRatePerBlock();
    return ((Number(borrowRatePerBlock) * blocksPerDay + 1) ** (daysPerYear - 1) - 1) * 100;
  }

  async balanceOf(address) {
    return Number(await this.instance.callStatic.balanceOf(address)) / factor;
  }

  async balanceOfUnderlying(address) {
    return Number(await this.instance.callStatic.balanceOfUnderlying(address)) / factor;
  }

  async balanceOfUnderlyingInWallet(address) {
    const underlyingAssetSymbol = await this.underlying();
    const underlyingAsset = new ethers.Contract(
      underlyingAssetSymbol,
      StandardTokenAbi,
      Vue.web3,
    );
    return Number(await underlyingAsset.callStatic.balanceOf(address)) / factor;
  }

  async underlyingCurrentPrice(chainId) {
    const priceOracleProxyInstance = new ethers.Contract(
      addresses[chainId].priceOracleProxy,
      PriceOracleProxyAbi,
      Vue.web3,
    );
    return Number(await priceOracleProxyInstance.callStatic.getUnderlyingPrice(this.marketAddress))
      / factor;
  }

  async supply(account, amountIntended, isCrbtc = false) {
    const accountSigner = signer(account);
    const amount = ethers.utils.parseEther(amountIntended);
    const underlyingAsset = new ethers.Contract(
      await this.underlying(),
      StandardTokenAbi,
      Vue.web3,
    );
    await underlyingAsset.connect(accountSigner).approve(this.marketAddress, amount);
    console.log('approved at ', this.marketAddress);
    const gasLimit = await this.instance.estimateGas.mint(amount);
    console.log(gasLimit);
    if (isCrbtc) {
      await this.instance.connect(accountSigner).mint({ value: amount, gasLimit });
    } else {
      await this.instance.connect(accountSigner).mint(amount, { gasLimit });
    }
  }
}
