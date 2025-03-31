import { createRouter, createWebHistory } from 'vue-router'

import OrderListView from '@/views/OrderListView.vue'
import AddOrderView from '@/views/AddOrderView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: OrderListView,
    },
    {
      path: '/addorder',
      name: 'addorder',
      component: AddOrderView,
    },
  ],
})

export default router
