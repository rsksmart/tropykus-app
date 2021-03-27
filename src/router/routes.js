import Home from '@/views/Home.vue';
import Tutorials from '@/views/Tutorials.vue';

export default [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/tutorials',
    name: 'Tutorials',
    component: Tutorials,
  },
];
