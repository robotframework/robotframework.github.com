import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Foundation from '../views/Foundation.vue'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import CoC from '../views/CoC.vue'
import Users from '../views/Users.vue'
import Code from '../views/Code.vue'
import Demoapp from '../views/Demoapp.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/foundation',
    name: 'Foundation',
    component: Foundation
  },
  {
    path: '/robot-framework-foundation',
    redirect: { name: 'Foundation' }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy
  },
  {
    path: '/code-of-conduct',
    name: 'CoC',
    component: CoC
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/code',
    name: 'Code',
    component: Code
  },
  {
    path: '/demoapp',
    name: 'DemoApp',
    component: Demoapp
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  }
})

export default router
