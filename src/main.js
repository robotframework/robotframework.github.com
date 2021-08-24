import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'Css/index.css'
import { createI18n } from 'vue-i18n/index'
import { en, de, libraries, tools, learning } from './content/index'

const resourcesList = {
  libraries: libraries(),
  tools: tools(),
  learning: learning()
}

const i18n = createI18n({
  locale: 'en',
  messages: {
    en: { ...en(), resourcesList },
    de: { ...de(), resourcesList }
  },
  warnHtmlInMessage: 'off'
})

createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .mount('#app')
