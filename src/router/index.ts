import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import store from '@/store'

import Index from '@/views/Index.vue'
import Home from '@/views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    name: 'Login',
    component: Index,
    meta: { requiresAuth: false }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isLogin = store.getters['auth/isLogin']()
  console.log('requiresAuth ? ', requiresAuth)
  console.log('To: ', to)
  console.log('To Path: ', to.path)
  console.log('From: ', from)
  console.log('isLogin: ', isLogin)

  if (to.path === '/' && isLogin) {
    next({
      path: '/home'
    })
    return
  }
  if (requiresAuth) {
    if (!isLogin) {
      next({
        path: '/'
      })
      return
    } else {
      next()
      return
    }
  }
  next()
})

export default router
