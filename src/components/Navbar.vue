<template>
  <div
    ref="nav"
    class="navbar row center bg-black color-white p-2xsmall pt-small pb-small">
    <!-- section navigation -->
    <button
      v-for="item in $tm('navbar.items')"
      :key="item"
      :name="`go-to-${item}`"
      class="pl-small pr-small color-white font-title type-uppercase type-no-underline border-right-white"
      @click="scrollTo(item)">
      {{ item }}
    </button>
    <!-- external links -->
    <div class="relative">
      <button
        class="pl-small pr-small font-title type-uppercase line-height-body"
        :class="linkDropdownOpen ? 'color-theme' : 'color-white'"
        @click="linkDropdownOpen = !linkDropdownOpen">
        {{ $t('navbar.dropdownName') }}
      </button>
      <transition name="fade">
        <div
          v-if="linkDropdownOpen"
          class="dropdown-container bg-black color-white p-small type-right">
          <div
            v-for="{ name, url, description } in $tm('navbar.dropdown')"
            :key="name">
            <a
              :href="url">
              {{ name }}
            </a>
            <p class="type-small">
              {{ description }}
            </p>
          </div>
        </div>
      </transition>
    </div>
    <!-- lang -->
    <button
      class="border-left-white font-title type-uppercase pl-small relative line-height-body"
      @click="langDropdownOpen = !langDropdownOpen">
      <div
        class="flex middle">
        <globe-icon
          :color="langDropdownOpen ? 'theme' : 'white'"
          style="transform: translateY(-1px);" />
        <div
          class="pl-3xsmall type-body"
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
    <!-- rf logo -->
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
import GlobeIcon from './icons/GlobeIcon.vue'

export default {
  name: 'Navbar',
  components: {
    GlobeIcon
  },
  data: () => ({
    linkDropdownOpen: false,
    langDropdownOpen: false,
    navSticky: false,
    publicPath: process.env.BASE_URL
  }),
  computed: {
    langNames() {
      return Object.keys(this.$i18n.messages)
        .map((lang) => ({ lang, name: this.$i18n.messages[lang].langName }))
    }
  },
  mounted() {
    const observer = new IntersectionObserver((e) => {
      this.navSticky = !e[0].isIntersecting
    }, { threshold: 1 })
    observer.observe(this.$refs.nav)
  },
  methods: {
    scrollTo(item) {
      document.getElementById(item.toLowerCase().replaceAll(' ', '-')).scrollIntoView({
        behavior: 'smooth'
      })
    },
    setLang(lang) {
      this.$i18n.locale = lang
      window.localStorage.setItem('lang', lang)
    }
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
  .tiny-logo-container {
    position: absolute;
    top: 0;
    left: 0;
  }
  .tiny-logo-container > img {
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
