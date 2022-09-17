import { createRouter, createWebHistory } from 'vue-router'
import Countries from '../views/CountriesView.vue'

const routes = [
  {
    path: '/',
    name: 'countries',
    component: Countries
  },
  {
    path: '/detail/:code',
    name: 'DetailView',
    component: () => import(/* webpackChunkName: "detail" */ '../views/DetailView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
