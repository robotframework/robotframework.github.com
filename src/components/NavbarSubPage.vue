<template>
  <div class="bar flex">
    <router-link :to="{ name: 'Home' }">
      <robot-icon
        size="2rem"
        class="m-small rf-icon-rotation cursor-pointer"/>
    </router-link>
    <div class="container row pt-xsmall pb-xsmall">
      <router-link :to="{ name: 'Home' }" class="type-xlarge color-theme font-title">
        ../
      </router-link>
      <h1 class="type-xlarge color-white type-uppercase line-height-body">
        {{ title }}
      </h1>
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
