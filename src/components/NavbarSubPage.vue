<template>
  <div class="bar flex middle p-xsmall">
    <router-link :to="{ name: 'Home' }" class="flex mr-xsmall">
      <robot-icon
        size="1.75rem"
        class="rf-icon-rotation cursor-pointer"/>
    </router-link>
    <div class="container row">
      <router-link :to="{ name: 'Home' }" class="color-theme font-title">
        ../
      </router-link>
      <div class="font-title color-white type-uppercase line-height-body">
        {{ title }}
      </div>
    </div>
  </div>
</template>

<script>
import RobotIcon from './icons/RobotIcon.vue'

export default {
  name: 'NavbarSubPage',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    RobotIcon
  }
}
</script>

<style scoped>
  .bar {
    background-color: var(--color-black);
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 9;
  }
  .rf-icon-rotation {
    transition: transform 0.2s;
  }
  .rf-icon-rotation:hover {
    transform: rotate(90deg);
  }
</style>
