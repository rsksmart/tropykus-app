import Home from '@/views/Home.vue';
import Tutorials from '@/views/Tutorials/index.vue';
import RbtcToBtc from '@/views/Tutorials/rbtc-to-btc.vue';
import BinanceToLiquality from '@/views/Tutorials/binance-to-liquality.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/Tutorials',
    name: 'Tutorials',
    component: Tutorials,
    // TODO: FIX CHILDREN
    children: [],
  },
  {
    path: '/Tutorials/rbtc-to-btc',
    name: 'rBTC to BTC',
    component: RbtcToBtc,
  },
  {
    path: '/Tutorials/binance-to-liquality',
    name: 'Binance to Liquality',
    component: BinanceToLiquality,
  },
];
