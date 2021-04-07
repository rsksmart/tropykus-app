import CRBTCAbi from '@/abis/CRBTC.json';
import Market from '@/middleware/market';

export default class CRbtc extends Market {
  constructor(address = '') {
    super(address, CRBTCAbi);
    this.internalUnderlyingAssetSymbol = 'RBTC';
  }

  underlyingAssetSymbol() {
    return this.internalUnderlyingAssetSymbol;
  }
}
