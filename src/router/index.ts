import { createRouter, createWebHashHistory } from 'vue-router'
const constantRoutes = [
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
