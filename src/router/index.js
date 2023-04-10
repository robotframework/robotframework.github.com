import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Foundation from '../views/Foundation.vue'
import RPA from '../views/RPA.vue'
import TestAutomation from '../views/TestAutomation'
import PrivacyPolicy from '../views/PrivacyPolicy.vue'
import CoC from '../views/CoC.vue'
import Users from '../views/Users.vue'
import Code from '../views/Code.vue'
import Embed from '../views/Embed.vue'
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
    path: '/rpa',
    name: 'RPA',
    component: RPA,
    meta: { title: 'RPA' }
  },
  {
    path: '/test-automation',
    name: 'Test Automation',
    component: TestAutomation,
    meta: { title: 'Test Automation' }
  },
  {
    path: '/foundation',
    name: 'Foundation',
    component: Foundation,
    meta: { title: 'Foundation' }
  },
  {
    path: '/robot-framework-foundation',
    redirect: { name: 'Foundation' }
  },
  {
    path: '/privacy-policy',
    name: 'PrivacyPolicy',
    component: PrivacyPolicy,
    meta: { title: 'Privacy Policy' }
  },
  {
    path: '/code-of-conduct',
    redirect: { name: 'CoC' }
  },
  {
    path: '/code-of-ethics',
    name: 'CoC',
    component: CoC,
    meta: { title: 'Code of Ethics' }
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    meta: { title: 'Users' }
  },
  {
    path: '/code',
    name: 'Code',
    component: Code,
    meta: { title: 'Playground' }
  },
  {
    path: '/embed',
    name: 'Embed',
    component: Embed,
    meta: { title: 'EmbeddedCode' }
  },
  {
    path: '/demoapp',
    name: 'DemoApp',
    component: Demoapp
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404' }
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

router.afterEach((to, from, next) => {
  const title = to.meta.title
  if (title) document.title = `${title} | Robot Framework`
  else document.title = 'Robot Framework'
  return true
})

export default router
