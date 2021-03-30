import Home from '@/views/Home.vue';
import UserHome from '@/views/UserHome.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/home',
    name: 'UserHome',
    component: UserHome,
  },
];
