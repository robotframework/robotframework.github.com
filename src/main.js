import { createApp } from 'vue'
import App from './App.vue'
import YouTube from 'vue3-youtube'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import 'Css/index.css'
import { createI18n } from 'vue-i18n/index'
import hljs from 'highlight.js/lib/core'
import hljsVuePlugin from '@highlightjs/vue-plugin'
import {
  english,
  german,
  portugese,
  spanish,
  russian,
  chinese,
  french,
  ach,
  builtin,
  libraries,
  tools,
  learning,
  users,
  sponsors
} from './content'
var hljsDefineRobot = require('./js/robot-highlight.js')

hljsDefineRobot(hljs)

const resourcesList = {
  builtin: builtin(),
  libraries: libraries(),
  tools: tools(),
  learning: learning(),
  users: users(),
  sponsors: sponsors()
}

// const lang = window.localStorage.getItem('lang')

const i18n = createI18n({
  locale: 'en-US',
  messages: {
    'en-US': { ...english(), resourcesList },
    'de-DE': { ...german(), resourcesList },
    'pt-PT': { ...portugese(), resourcesList },
    'es-ES': { ...spanish(), resourcesList },
    'ru-RU': { ...russian(), resourcesList },
    'zh-CN': { ...chinese(), resourcesList },
    'fr-FR': { ...french(), resourcesList },
    'ach-UG': { ...ach(), resourcesList }
  },
  warnHtmlInMessage: 'off'
})

createApp(App)
  .component('YouTube', YouTube)
  .use(store)
  .use(router)
  .use(i18n)
  .use(hljsVuePlugin)
  .mount('#app')
