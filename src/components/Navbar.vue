<template>
  <div
    ref="nav"
    class="flex navbar bg-black color-white p-xsmall">
    <transition name="opacity">
      <div v-if="navSticky && !iconInContainer">
        <robot-icon
          size="1.75rem"
          class="absolute rf-icon-rotation cursor-pointer"
          @click="logoClick" />
      </div>
    </transition>
    <div class="container row center middle">
      <div class="flex">
        <transition name="opacity">
        <robot-icon
          v-if="iconInContainer"
          size="1.75rem"
          class="rf-icon-rotation cursor-pointer"
          @click="logoClick" />
        </transition>
        <!-- section navigation -->
        <button
          v-for="(item) in $tm('navbar.items')"
          :key="item.name"
          :name="`go-to-${item.name}`"
          class="px-small color-white font-title type-no-underline type-uppercase line-height-body border-right-white"
          @click="itemClick(item.id)">
          {{ item.name }}
        </button>
        <!-- docs -->
        <div class="relative" ref="dropdownDocs">
          <button
            class="flex middle px-small font-title type-uppercase line-height-body dropdown-button"
            :class="docsDropdownOpen ? 'color-theme' : 'color-white'"
            @click="docsDropdownOpen = !docsDropdownOpen">
            <div>
              {{ $t('navbar.dropdownDocs.name') }}
            </div>
            <chevron-icon
              :color="docsDropdownOpen ? 'theme' : 'white'"
              :direction="docsDropdownOpen ? 'up' : 'down'"
              size="1.5rem" />
          </button>
          <transition name="fade">
            <div
              v-if="docsDropdownOpen"
              class="dropdown-container bg-black color-white p-small card" style="left: 0.25rem;">
              <div
                v-for="({ name, url, description }, i) in $tm('navbar.dropdownDocs.items')"
                :key="name">
                <a :href="url"
                  @click="linkClick(name)">
                  {{ name }}
                </a>
                <p class="type-small mt-none" :class="i === $tm('navbar.dropdownDocs.items').length - 1 ? 'mb-none' : ''">
                  {{ description }}
                </p>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>
    <!-- lang - disabled for now
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
    </button> -->
  </div>
</template>

<script>
import RobotIcon from './icons/RobotIcon.vue'
import ChevronIcon from './icons/ChevronIcon.vue'

export default {
  name: 'Navbar',
  components: {
    RobotIcon,
    ChevronIcon
  },
  data: () => ({
    navSticky: false,
    linksDropdownOpen: false,
    docsDropdownOpen: false,
    langDropdownOpen: false,
    iconInContainer: false
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
    linkClick(name) {
      window.plausible('Nav click', { props: { section: name } })
    },
    setLang(lang) {
      this.$i18n.locale = lang
      window.localStorage.setItem('lang', lang)
    },
    onClick(ev) {
      // close dropdowns if clicked outside
      if (this.$refs.dropdownDocs && !this.$refs.dropdownDocs.contains(ev.target)) this.docsDropdownOpen = false
    },
    onResize() {
      this.iconInContainer = window.innerWidth < 1500
    },
    logoClick() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  },
  mounted() {
    const observer = new IntersectionObserver((e) => {
      this.navSticky = !e[0].isIntersecting
    }, { threshold: 1 })
    observer.observe(this.$refs.nav)
    document.addEventListener('click', this.onClick)
    window.addEventListener('resize', this.onResize)
    this.onResize()
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onClick)
    window.removeEventListener('resize', this.onResize)
  },
  watch: {
    linksDropdownOpen() {
      if (this.linksDropdownOpen) this.langDropdownOpen = false
    },
    langDropdownOpen() {
      if (this.langDropdownOpen) this.linksDropdownOpen = false
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
    top: calc(100% + 1rem);
    width: max-content;
  }
  .dropdown-container a {
    display: block;
    line-height: 1;
  }
  .rf-icon-rotation {
    transition: transform 0.2s;
  }
  .rf-icon-rotation:hover {
    transform: rotate(90deg);
  }
</style>
