import Home from '@/views/Home.vue';
import Register from '@/views/Register.vue';

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
];
