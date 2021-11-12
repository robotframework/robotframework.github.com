<template>
  <div
    ref="nav"
    class="navbar row center bg-black color-white p-2xsmall pt-small pb-small">
    <!-- section navigation -->
    <button
      v-for="item in $tm('navbar.items')"
      :key="item.name"
      :name="`go-to-${item.name}`"
      class="pl-small pr-small color-white font-title type-uppercase type-no-underline border-right-white type-small"
      @click="itemClick(item.id)">
      {{ item.name }}
    </button>
    <!-- external links -->
    <div class="relative" ref="dropdown">
      <button
        class="pl-small pr-small font-title type-uppercase type-small"
        :class="linkDropdownOpen ? 'color-theme' : 'color-white'"
        style="transform: translateY(2px);"
        @click="linkDropdownOpen = !linkDropdownOpen">
        {{ $t('navbar.dropdownName') }}
      </button>
      <transition name="fade">
        <div
          v-if="linkDropdownOpen"
          class="dropdown-container bg-black color-white p-small card">
          <div
            v-for="{ name, url, description } in $tm('navbar.dropdown')"
            :key="name">
            <div class="flex end">
              <a
                :href="url"
                target="_blank"
                rel="noopener noreferrer">
                {{ name }}
              </a>
              <new-tab-icon color="theme" class="ml-2xsmall" />
            </div>
            <p class="type-small mt-none type-right">
              {{ description }}
            </p>
          </div>
        </div>
      </transition>
    </div>
    <button
      class="border-left-white font-title type-uppercase pl-small relative line-height-body"
      @click="langDropdownOpen = !langDropdownOpen">
      <div
        class="flex middle"
        style="transform: translateY(2px);">
        <globe-icon
          :color="langDropdownOpen ? 'theme' : 'white'"
          style="transform: translateY(-1px);" />
        <div
          class="pl-3xsmall type-small"
          :class="langDropdownOpen ? 'color-theme' : 'color-white'"
          style="transform: translateY(-2px);">
          {{ langNames.find(({ lang }) => lang === $i18n.locale).name }}
        </div>
      </div>
      <transition name="fade">
        <div
          v-if="langDropdownOpen"
          class="dropdown-container bg-black color-white p-small">
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
    </button>
    <transition name="opacity">
      <div
        v-if="navSticky"
        class="tiny-logo-container">
        <img :src="`${publicPath}img/RF-white.svg`" />
      </div>
    </transition>
  </div>
</template>

<script>
import NewTabIcon from './icons/NewTabIcon.vue'
import GlobeIcon from './icons/GlobeIcon.vue'

export default {
  name: 'Navbar',
  components: {
    NewTabIcon,
    GlobeIcon
  },
  data: () => ({
    navSticky: false,
    publicPath: process.env.BASE_URL,
    linkDropdownOpen: false,
    langDropdownOpen: false
  }),
  computed: {
    langNames() {
      return Object.keys(this.$i18n.messages)
        .map((lang) => ({ lang, name: this.$i18n.messages[lang].langName }))
    }
  },
  methods: {
    itemClick(itemId) {
      const el = document.getElementById(itemId)
      if (!el) return
      // setting window.location.hash causes instant page scroll to that position and we dont want that
      // lets strip urlParams and hash from url and append new hash
      history.replaceState(null, null, `${location.href.split('?')[0].split('#')[0]}#${itemId}`)
      window.scrollTo({
        top: el.offsetTop,
        behavior: 'smooth'
      })
      window.plausible('Nav click', { props: { section: itemId } })
    },
    setLang(lang) {
      this.$i18n.locale = lang
      window.localStorage.setItem('lang', lang)
    },
    onClick(ev) {
      // close link dropdown if clicked outside
      if (this.linkDropdownOpen && this.$refs.dropdown && !this.$refs.dropdown.contains(ev.target)) this.linkDropdownOpen = false
    }
  },
  mounted() {
    const observer = new IntersectionObserver((e) => {
      this.navSticky = !e[0].isIntersecting
    }, { threshold: 1 })
    observer.observe(this.$refs.nav)
    document.addEventListener('click', this.onClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onClick)
  },
  watch: {
    linkDropdownOpen() {
      if (this.linkDropdownOpen) this.langDropdownOpen = false
    },
    langDropdownOpen() {
      if (this.langDropdownOpen) this.linkDropdownOpen = false
    }
  }
}
</script>

<style scoped>
  button {
    transition: color 0.2s;
  }
  button:hover {
    color: var(--color-theme) !important;
  }
  .navbar {
    position: sticky;
    top: -1px;
    z-index: 2;
  }
  .tiny-logo-container {
    position: absolute;
    top: 0;
    left: 0;
  }
  .tiny-logo-container > img {
    margin-top: 0.1rem;
    width: 3.5rem;
    height: 3.5rem;
  }
  .dropdown-container {
    position: absolute;
    top: calc(100% + 2rem);
    right: 0;
    width: max-content;
  }
  .dropdown-container a {
    display: block;
    line-height: 1;
  }
</style>
