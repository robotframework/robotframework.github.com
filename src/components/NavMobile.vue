<template>
  <div
    class="navbar row between bg-black color-white px-medium py-xsmall"
    :class="isOpen ? 'open' : ''">
    <div class="flex middle">
      <robot-icon size="2rem" @click="scrollTo(null, 400)" />
      <div class="font-title ml-xsmall">
        ROBOT FRAMEWORK
      </div>
    </div>
    <button
      class="hamburger"
      :class="isOpen ? 'open' : ''"
      @click="isOpen = !isOpen; docsOpen = false;">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </button>
  </div>
  <transition name="fade">
    <div
      v-if="isOpen"
      class="menu bg-black pt-large pb-large">
      <transition :name="docsOpen ? 'fade-left' : 'fade-right'" mode="out-in">
        <div v-if="!docsOpen" key="1" class="p-medium">
          <div
            v-for="item in $tm('navbar.items')"
            :key="item.name">
            <button
              :name="`go-to-${item.name}`"
              style="padding-left: 2.75rem"
              class="mb-xsmall mt-xsmall color-white type-small font-title type-uppercase"
              @click="scrollTo(item.id, 400); isOpen = false">
              {{ item.name }}
            </button>
          </div>
          <hr class="my-medium pr-xlarge" />
          <a href="https://cert.robotframework.org" style="padding-left: 2.75rem" class="block my-xsmall color-white font-title type-uppercase type-no-underline">Certificate</a>
          <a href="https://robotframework.org/foundation" style="padding-left: 2.75rem" class="block mt-small color-white font-title type-uppercase type-no-underline">Foundation</a>
          <button
            class="flex middle mt-large mb-small color-theme font-title type-uppercase type-large"
            style="padding-left: 2.25rem"
            @click="docsOpen = true">
            <chevron-icon direction="right" color="theme" size="1.5rem" />
            <div>
              DOCS
            </div>
          </button>
        </div>
        <div v-else key="3" class="mt-large pl-xlarge">
          <button class="type-uppercase font-title color-theme type-large flex middle mb-medium" style="margin-left: -0.5rem" @click="docsOpen = false">
            <chevron-icon direction="left" color="theme" size="1.5rem" />
            DOCS
          </button>
          <div
            v-for="({ name, url, description }, i) in $tm('navbar.dropdownDocs.items')"
            :key="name">
            <div class="flex middle">
              <a :href="url" class="line-height-1">
                {{ name }}
              </a>
            </div>
            <p class="type-small color-white mt-none" :class="i === $tm('navbar.dropdownDocs.items').length - 1 ? 'mb-none' : 'mb-small'">
              {{ description }}
            </p>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  <transition name="opacity">
    <div
      v-if="isOpen"
      class="menu-background"
      @click="isOpen = false; docsOpen = false;" />
  </transition>
</template>

<script>
import ChevronIcon from './icons/ChevronIcon.vue'
import RobotIcon from './icons/RobotIcon.vue'

export default {
  name: 'NavMobile',
  components: {
    ChevronIcon,
    RobotIcon
  },
  data: () => ({
    isOpen: false,
    docsOpen: false
  }),
  methods: {
    scrollTo(el, duration) {
      // ios doesn't support smooth scrollIntoView()
      const easeInOutQuad = (t, b, c, d) => {
        let t2 = t / (d / 2)
        if (t2 < 1) return (c / 2) * t2 * t2 + b
        t2 -= 1
        return (-c / 2) * (t2 * (t2 - 2) - 1) + b
      }
      const to = el ? document.getElementById(el).offsetTop - 80 : 0
      const element = document.scrollingElement || document.documentElement
      const start = element.scrollTop

      const change = to - start
      const startDate = +new Date()

      const animateScroll = () => {
        const currentDate = +new Date()
        const currentTime = currentDate - startDate
        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration), 10)
        if (currentTime < duration) {
          requestAnimationFrame(animateScroll)
        } else {
          element.scrollTop = to
        }
      }
      animateScroll()
    }
  }
}
</script>

<style scoped>

.menu {
  position: fixed;
  z-index: 8;
  top: 0;
  width: 100%;
  left: 0;
}

.menu-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #292f33A0;
  z-index: 7;
}

.navbar {
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 99;
}

.hamburger {
  margin: 0.5rem;
  width: 2rem;
  height: 1.5rem;
  position: relative;
  transform: rotate(0deg);
  transition: .2s ease-in-out;
  cursor: pointer;
}
.hamburger span {
  display: block;
  position: absolute;
  height: 0.25rem;
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
  top: 0.625rem;
}
.hamburger span:nth-child(4) {
  top: 1.25rem;
}
.hamburger.open span:nth-child(1) {
  top: 0.625rem;
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
  top: 0.625rem;
  width: 0%;
  left: 50%;
}

@media screen and (min-width: 1025px) {
  .navbar, .menu {
    display: none;
  }
}

</style>
