import { createRouter, createWebHistory } from 'vue-router';
import HomeDashboard from '../views/HomeDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'HomeDashboard',
    component: HomeDashboard
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
