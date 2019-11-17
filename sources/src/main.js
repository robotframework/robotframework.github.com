// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
/* eslint-disable no-new */

// for IE11 support (https://bootstrap-vue.js.org/docs/#browsers-support)
import 'babel-polyfill'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'

import Vue from 'vue'
import App from './App'
import Root from './Root'
import PrivacyPolicy from './PrivacyPolicy'

import AppHeader from '@/components/AppHeader'
import AppFooter from '@/components/AppFooter'
import NavigationVertical from '@/components/NavigationVertical'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(VueRouter)

const routes = [
  { name: 'main', path: '/', component: App },
  { name: 'privacy', path: '/privacypolicy', component: PrivacyPolicy }
]
const router = new VueRouter({
  routes
})

require('@/assets/css/main.css')
require('@/assets/css/pygments.css')

Vue.config.productionTip = false

Vue.component('app-header', AppHeader)
Vue.component('navigation-vertical', NavigationVertical)
Vue.component('app-footer', AppFooter)

new Vue({
  el: '#app',
  router,
  template: '<Root/>',
  components: {
    Root
  }
})
