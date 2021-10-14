<template>
  <div class="row bg-black color-white p-small pt-large pb-large">
    <div class="container" style="line-height: 1.75;">
      <div class="row">
        <div class="col-sm-6 col-md-3">
          <h3>
            <a href="https://robotframework.org/foundation/">Foundation</a>
          </h3>
          <div>
            Robot Framework ry
          </div>
          <div>
            Kampinkuja 2
          </div>
          <div>
            00100 Helsinki
          </div>
          <div>
            Finland
          </div>
          <a href="mailto:robotframework-foundation@googlegroups.com">
            Contact
          </a>
        </div>
        <div
          class="col-sm-6 col-md-3"
          :class="$store.state.isMobile ? 'type-right' : ''">
          <h3>
            Community
          </h3>
          <div>
            <a href="https://github.com/robotframework/robotframework">
              GitHub
            </a>
          </div>
          <div>
            <a href="https://forum.robotframework.org/">
              Forum
            </a>
          </div>
          <div>
            <a href="https://www.facebook.com/robotframeworkofficial">
              Facebook
            </a>
          </div>
          <div>
            <a href="http://twitter.com/robotframework">
              Twitter
            </a>
          </div>
          <div>
            <a href="https://www.linkedin.com/groups/3710899/">
              LinkedIn
            </a>
          </div>
        </div>
        <div v-if="$store.state.isMobile" class="col-sm-12 mb-large" />
        <div class="col-sm-6 col-md-3">
          <h3>
            Instructions
          </h3>
          <div>
            <a href="https://github.com/robotframework/robotframework/blob/master/INSTALL.rst">
              Installation
            </a>
          </div>
          <div>
            <a href="https://github.com/robotframework/QuickStartGuide/blob/master/QuickStart.rst">
              Quick start
            </a>
          </div>
          <div>
            <a href="http://robotframework.org/robotframework/#user-guide">
              User guide
            </a>
          </div>
          <div>
            <a href="http://robotframework.org/robotframework/#user-guide">
              Web demo
            </a>
          </div>
          <div>
            <a href="https://robocon.io/">
              Robocon talks
            </a>
          </div>
        </div>
        <div class="col-sm-6 col-md-3 flex flex-col between">
          <div />
          <!-- <div class="relative">
            <button
              class="flex middle border-thin p-2xsmall pl-xsmall pr-xsmall"
              :class="langDropdownOpen ? 'border-theme' : 'border-white'"
              @click="langDropdownOpen = !langDropdownOpen">
              <globe-icon
                :color="langDropdownOpen ? 'theme' : 'white'"
                style="transform: translateY(-1px);" />
              <div
                class="relative ml-2xsmall"
                :class="langDropdownOpen ? 'color-theme' : 'color-white'">
                Language
              </div>
            </button>
            <transition name="fade-down">
              <div
                v-if="langDropdownOpen"
                class="absolute bg-black p-small border-white border-thin"
                style="bottom: 3rem;">
                <div
                  v-for="({ lang, name }, i) in langNames"
                  :key="lang">
                  <button
                    class="type-uppercase"
                    :class="[lang === $i18n.locale ? 'color-theme' : 'color-white', {['mb-2xsmall'] : i !== langNames.length - 1}]"
                    @click="setLang(lang)">
                    {{ name }}
                  </button>
                </div>
              </div>
            </transition>
          </div> -->
          <div :class="$store.state.isMobile ? 'type-right' : ''">
            <div>
              <router-link :to="{ name: 'PrivacyPolicy' }">
                Privacy Policy
              </router-link>
            </div>
            <div>
              <router-link :to="{ name: 'CoC' }">
                Code of Conduct
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import GlobeIcon from './icons/GlobeIcon.vue'

export default {
  name: 'PageFooter',
  components: {
    // GlobeIcon
  },
  data: () => ({
    langDropdownOpen: false
  }),
  computed: {
    langNames() {
      return Object.keys(this.$i18n.messages)
        .map((lang) => ({ lang, name: this.$i18n.messages[lang].langName }))
        .filter(({ name }) => name !== 'translation')
    }
  },
  methods: {
    setLang(lang) {
      this.$i18n.locale = lang
      window.localStorage.setItem('lang', lang)
    }
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  div {
    font-size: var(--type-small);
  }
  h3 {
    font-size: var(--type-body);
  }
}
</style>
