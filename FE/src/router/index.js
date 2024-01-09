import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/records',
      name: 'records',
      component: () => import('../views/RecordView.vue')
    },
    {
      path: '/records/add',
      name: 'addRecords',
      component: () => import('../views/DetailRecordView.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('adminName');

  //send to home if already logged in
  if (to.path === '/login' && loggedIn) {
    next('/');
  }

  // redirect to login page if not logged in
  if (!loggedIn && authRequired) {
    next('/login');
  } else {
    next();
  }
});

export default router
