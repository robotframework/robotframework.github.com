<template>
  <div
    ref="nav"
    class="navbar row center bg-black color-white p-2xsmall pt-xsmall pb-xsmall">
    <a
      v-for="link in $tm('navbar.items')"
      :key="link"
      :href="`#${link}`"
      class="pl-small pr-small color-white font-title type-uppercase type-no-underline type-small border-right-white">
      {{ link }}
    </a>
    <div class="relative">
      <button
        class="pl-small pr-small font-title type-uppercase type-small"
        :class="dropdownOpen ? 'color-theme' : 'color-white'"
        @click="dropdownOpen = !dropdownOpen">
        {{ $t('navbar.dropdownName') }}
      </button>
      <transition name="fade">
        <div
          v-if="dropdownOpen"
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
          <a
            v-for="{ name, url } in dropdown"
            :key="name"
            :href="url">
            {{ name }}
          </a>
        </div>
      </transition>
    </div>
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
export default {
  name: 'Navbar',
  data: () => ({
    dropdownOpen: false,
    navSticky: false,
    publicPath: process.env.BASE_URL
  }),
  mounted() {
    const observer = new IntersectionObserver((e) => {
      this.navSticky = !e[0].isIntersecting
    }, { threshold: 1 })
    observer.observe(this.$refs.nav)
  }
}
</script>

<style scoped>
  .navbar {
    position: sticky;
    top: -1px;
  }
  .tiny-logo-container {
    position: absolute;
    top: 0;
    left: 0;
  }
  .tiny-logo-container > img {
    width: 3rem;
    height: 3rem;
  }
  .dropdown-container {
    position: absolute;
    top: calc(100% + 1rem);
    right: 0;
    width: max-content;
  }
  .dropdown-container a {
    display: block;
    line-height: 1;
  }
</style>
