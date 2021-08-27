import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'Css/index.css'
import { createI18n } from 'vue-i18n/index'
import {
  english,
  german,
  portugese,
  spanish,
  russian,
  chinese,
  french,
  ach,
  libraries,
  tools,
  learning
} from './content'

const resourcesList = {
  libraries: libraries(),
  tools: tools(),
  learning: learning()
}

const lang = window.localStorage.getItem('lang')

const i18n = createI18n({
  locale: lang || 'en-US',
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
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
