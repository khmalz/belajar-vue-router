import HomeView from '@/views/HomeView.vue';
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
   {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
         order: 1,
         requiresAuth: false
      }
   },
   {
      path: '/about',
      children: [
         {
            path: '',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
            meta: {
               order: 2,
               requiresAuth: false
            }
         },
         {
            path: 'team',
            name: 'team',
            component: () => import('../views/TeamView.vue'),
            meta: {
               order: 3,
               requiresAuth: false
            }
         }
      ]
   }
];

const router = createRouter({
   history: createWebHistory(import.meta.env.BASE_URL),
   routes
});

export default router;
