import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home-view.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
