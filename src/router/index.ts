import { createRouter, createWebHashHistory } from 'vue-router'
const constantRoutes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('/@/layout/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/login/index.vue'),
  },
]
const creatRouter = () =>
  createRouter({
    history: createWebHashHistory(),
    routes: constantRoutes,
  })
const router = creatRouter()
export default router
