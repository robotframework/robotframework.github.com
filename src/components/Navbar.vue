<template>
  <div
    ref="nav"
    class="navbar bg-black color-white p-xsmall">
    <!-- NAV LEFT SIDE -->
    <div class="flex middle">
      <button @click="logoClick" name="scroll to beginning" class="rf-icon flex">
        <robot-icon size="1.75rem" />
      </button>
      <!-- internal page navigation -->
      <button
        v-for="(item, i) in $tm('navbar.items')"
        :key="item.name"
        :name="`go-to-${item.name}`"
        class="color-white font-title type-small type-no-underline type-uppercase px-small"
        :class="i !== 3 ? 'border-right-white border-light' : ''"
        @click="itemClick(item.id)">
        {{ item.name }}
      </button>
    </div>
    <!-- NAV RIGHT SIDE -->
    <div class="flex middle">
      <div style="height: 1rem;">
        <a class="github-button" href="https://github.com/robotframework/robotframework" data-color-scheme="dark_high_contrast" data-show-count="true" aria-label="Robot Framework GitHub Stars">Star</a>
      </div>
      <router-link
        class="color-white font-title type-uppercase type-no-underline px-medium"
        :to="{name: 'Foundation'}">
        Foundation
      </router-link>
      <div class="relative" ref="dropdownDocs">
        <button
          class="flex middle font-title type-uppercase line-height-body dropdown-button"
          :class="docsDropdownOpen ? 'color-theme' : 'color-white'"
          @click="docsDropdownOpen = !docsDropdownOpen">
          <div>
            {{ $t('navbar.dropdownDocs.name') }}
          </div>
          <chevron-icon
            :color="docsDropdownOpen ? 'theme' : 'white'"
            :direction="docsDropdownOpen ? 'up' : 'down'"
            size="1rem" />
        </button>
        <transition name="fade">
          <div
            v-if="docsDropdownOpen"
            class="dropdown-container bg-black color-white p-large pt-xsmall card">
            <div
              v-for="({ name, url, description }, i) in $tm('navbar.dropdownDocs.items')"
              :key="name"
              class="mt-medium">
              <a :href="url"
                class="type-no-underline"
                @click="linkClick(name)">
                {{ name }}
              </a>
              <div :class="i === $tm('navbar.dropdownDocs.items').length - 1 ? 'mb-none' : ''">
                {{ description }}
              </div>
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
  .navbar {
    display: flex;
    justify-content: space-between;
    flex-wrap: nowrap;
    position: sticky;
    top: -0.1px;
    z-index: 2;
  }
  button, a {
    transition: color 0.2s;
  }
  svg {
    transition: fill 0.2s;
  }
  button:hover, a:hover {
    color: var(--color-theme) !important;
  }
  a {
    text-underline-offset: 0.25rem;
  }
  a:hover {
    text-decoration: underline;
  }
  a:hover > svg {
    fill: var(--color-theme) !important;
  }
  .dropdown-container {
    position: absolute;
    top: calc(100% + 1.5rem);
    right: 0;
    width: max-content;
  }
  .dropdown-container a {
    display: block;
    line-height: 1;
  }
  .rf-icon {
    transition: transform 0.2s;
  }
  .rf-icon:hover {
    transform: rotate(90deg);
  }
</style>
