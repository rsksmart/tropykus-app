import Home from '@/views/Home.vue';
import Tutorials from '@/views/Tutorials/index.vue';
import RbtcToBtc from '@/views/Tutorials/rbtc-to-btc.vue';
import BinanceToLiquality from '@/views/Tutorials/binance-to-liquality.vue';
import BlockFiToLiquality from '@/views/Tutorials/blockfi-to-liquality.vue';
import LednToLiquality from '@/views/Tutorials/ledn-to-liquality.vue';
import UserHome from '@/views/UserHome.vue';
import Balance from '@/views/Balance.vue';

// FOR DEVELOPMENT ONLY
import Modals from '@/views/Dev/Modals.vue';

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
  {
    path: '/Tutorials/blockfi-to-liquality',
    name: 'BlockFi to Liquality',
    component: BlockFiToLiquality,
  },
  {
    path: '/Tutorials/ledn-to-liquality',
    name: 'Ledn to Liquality',
    component: LednToLiquality,
  },
  {
    path: '/home',
    name: 'UserHome',
    component: UserHome,
  },
  {
    path: '/balance',
    name: 'Balance',
    component: Balance,
  },
];
