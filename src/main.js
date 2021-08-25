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
  libraries,
  tools,
  learning
} from './content'

const resourcesList = {
  libraries: libraries(),
  tools: tools(),
  learning: learning()
}

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: { ...english(), resourcesList },
    de: { ...german(), resourcesList },
    pt: { ...portugese(), resourcesList },
    sp: { ...spanish(), resourcesList },
    ru: { ...russian(), resourcesList },
    cn: { ...chinese(), resourcesList },
    fr: { ...french(), resourcesList }
  },
  warnHtmlInMessage: 'off'
})

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
