import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '../views/MainPage.vue';
import ConvertPage from '../views/ConvertPage.vue';

const routes = [
  { path: '/', component: MainPage },
  { path: '/convert', component: ConvertPage },
];

const router = createRouter({
  history: createWebHistory('/currency-converter/'),
  routes,
});

export default router;