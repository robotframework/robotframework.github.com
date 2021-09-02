<template>
  <transition name="fade-left-in-out">
    <div
      v-if="isOpen"
      class="menu bg-black pt-2xlarge pl-small pr-small">
      <transition :name="linksOpen ? 'fade-left' : 'fade-right'" mode="out-in">
        <div v-if="!linksOpen" key="1" class="pl-2xsmall">
          <div
            v-for="item in $tm('navbar.items')"
            :key="item">
            <button
              :name="`go-to-${item}`"
              class="mb-small mt-xsmall color-white font-title type-uppercase"
              @click="scrollTo(item)">
              {{ item }}
            </button>
          </div>
          <button
            class="mt-xsmall color-white font-title type-uppercase"
            @click="linksOpen = true">
            {{ $t('navbar.dropdownName') }}
          </button>
        </div>
        <div v-else key="2" class="pl-2xsmall">
          <button
            class="color-white font-title type-uppercase"
            @click="linksOpen = false">
            <div class="flex middle mb-small" style="margin-left: -0.5rem;">
              <chevron-icon direction="left" color="white" :size="32" />
              <div>
                {{ $t('navbar.dropdownName') }}
              </div>
            </div>
          </button>
          <div
            v-for="{ name, url, description } in $tm('navbar.dropdown')"
            :key="name"
            class="">
            <a
              :href="url">
              {{ name }}
            </a>
            <p class="type-small color-white">
              {{ description }}
            </p>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  <div
    class="navbar row between bg-black color-white"
    :class="isOpen ? 'open' : ''">
    <button
      class="hamburger"
      :class="isOpen ? 'open' : ''"
      @click="isOpen = !isOpen; linksOpen = false">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
    <div class="logo-container flex middle pr-xsmall">
      <div>
        <img :src="`${publicPath}img/RF-white.svg`" />
      </div>
    </div>
  </div>
</template>

<script>
import ChevronIcon from './icons/ChevronIcon.vue'

export default {
  name: 'NavMobile',
  components: {
    ChevronIcon
  },
  data: () => ({
    isOpen: false,
    linksOpen: false,
    publicPath: process.env.BASE_URL
  })
}
</script>

<style scoped>

.menu {
  position: fixed;
  z-index: 8;
  top: 0;
  width: 16rem;
  height: 100%;
  left: 0;
}

.navbar {
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 9;
}

.logo-container > div {
  display: contents;
}
.logo-container > div > img {
  width: 48px;
  height: 48px;
}

.hamburger {
  margin: 16px;
  margin-left: 20px;
  width: 32px;
  height: 24px;
  position: relative;
  transform: rotate(0deg);
  transition: .2s ease-in-out;
  cursor: pointer;
}
.hamburger span {
  display: block;
  position: absolute;
  height: 4px;
  width: 100%;
  background: var(--color-white);
  border-radius: 1px;
  opacity: 1;
  left: 0;
  transform: rotate(0deg);
  transition: .25s ease-in-out;
}
.hamburger span:nth-child(1) {
  top: 0;
}
.hamburger span:nth-child(2),.hamburger span:nth-child(3) {
  top: 10px;
}
.hamburger span:nth-child(4) {
  top: 20px;
}
.hamburger.open span:nth-child(1) {
  top: 10px;
  width: 0%;
  left: 50%;
}
.hamburger.open span:nth-child(2) {
  transform: rotate(45deg);
}
.hamburger.open span:nth-child(3) {
  transform: rotate(-45deg);
}
.hamburger.open span:nth-child(4) {
  top: 10px;
  width: 0%;
  left: 50%;
}

@media screen and (min-width: 769px) {
  .navbar, .menu {
    display: none;
  }
}

</style>
