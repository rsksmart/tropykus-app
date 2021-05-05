import CRBTCAbi from '@/abis/CRBTC.json';
import Market from '@/middleware/market';

export default class CRbtc extends Market {
  constructor(address = '', chainId) {
    super(address, CRBTCAbi, chainId);
    this.internalUnderlyingAssetSymbol = 'tRBTC';
    this.type = 'CRBTC';
  }

  underlyingAssetSymbol() {
    return this.internalUnderlyingAssetSymbol;
  }

  // eslint-disable-next-line class-methods-use-this
  async balanceOfUnderlyingInWallet(account) {
    return Number(await account.getBalance()) / 1e18;
  }

  async supply(account, amountIntended) {
    await super.supply(account, amountIntended, true);
  }

  // eslint-disable-next-line class-methods-use-this
  async underlyingAssetName() {
    return 'tRSK Bitcoin';
  }
}
