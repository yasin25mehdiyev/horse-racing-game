import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home-view.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory('/horse-racing-game/'),
  routes
})

export default router
