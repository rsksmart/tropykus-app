import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';
import Tutorials from '@/views/Tutorials.vue';
import BtcToRbtc from '@/components/tutorials/BtcToRbtc.vue';
import BinanceToLiquality from '@/components/tutorials/BinanceToLiquality.vue';
import BlockFiToLiquality from '@/components/tutorials/BlockfiToLiquality.vue';
import LednToLiquality from '@/components/tutorials/LednToLiquality.vue';
import UserHome from '@/views/UserHome.vue';
import Balance from '@/views/Balance.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/tutorials',
    name: 'Tutorials',
    component: Tutorials,
  },
  {
    path: '/tutorials/btc-to-rbtc',
    name: 'BtcToRbtc',
    component: BtcToRbtc,
  },
  {
    path: '/tutorials/binance-to-liquality',
    name: 'BinanceToLiquality',
    component: BinanceToLiquality,
  },
  {
    path: '/tutorials/blockfi-to-liquality',
    name: 'BlockfiToLiquality',
    component: BlockFiToLiquality,
  },
  {
    path: '/tutorials/ledn-to-liquality',
    name: 'LednToLiquality',
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
