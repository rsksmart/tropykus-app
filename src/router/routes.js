import Supply from '@/views/Supply.vue';

export default [
  {
    path: '/',
    name: 'Supply',
    component: Supply,
  },
  {
    path: '/es',
    name: 'Supply',
    component: Supply,
  },
  {
    path: '/borrow',
    name: 'Borrow',
    component: () => import(/* webpackChunkName: "Borrow" */ '@/views/Borrow.vue'),
  },
  {
    path: '/balance',
    name: 'Balance',
    component: () => import(/* webpackChunkName: "Balance" */ '@/views/Balance.vue'),
  },
  {
    path: '/overview',
    name: 'Overview',
    component: () => import(/* webpackChunkName: "Overview" */ '@/views/Overview.vue'),
  },
  {
    path: '/tutorials',
    name: 'Tutorials',
    component: () => import(/* webpackChunkName: "Tutorials" */ '@/views/Tutorials.vue'),
  },
  {
    path: '/tutorials/btc-to-rbtc',
    name: 'BtcToRbtc',
    component: () => import(/* webpackChunkName: "BtcToRbtc" */ '@/components/tutorials/BtcToRbtc.vue'),
  },
  {
    path: '/tutorials/binance-to-liquality',
    name: 'BinanceToLiquality',
    component: () => import(/* webpackChunkName: "BinanceToLiquality" */ '@/components/tutorials/BinanceToLiquality.vue'),
  },
  {
    path: '/tutorials/blockfi-to-liquality',
    name: 'BlockfiToLiquality',
    component: () => import(/* webpackChunkName: "BlockfiToLiquality" */ '@/components/tutorials/BlockfiToLiquality.vue'),
  },
  {
    path: '/tutorials/ledn-to-liquality',
    name: 'LednToLiquality',
    component: () => import(/* webpackChunkName: "LednToLiquality" */ '@/components/tutorials/LednToLiquality.vue'),
  },
];
