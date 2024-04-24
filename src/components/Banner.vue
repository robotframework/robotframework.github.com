<template>
  <div class="banner">
    <h1 class="color-black logotype bg-theme">
      <div class="color-white">ROBOT</div>
      <div>FRAME</div>
      <div class="flex">
        WORK
        <robot-icon class="icon" color="black" style="transform: translate(0.5rem, 1rem);" />
      </div>
    </h1>
  </div>
</template>

<script>
import RobotIcon from './icons/RobotIcon.vue'
export default {
  name: 'Banner',
  components: {
    RobotIcon
  }
}
</script>

<style scoped>
  h1 {
    width: fit-content;
    margin: 0 auto;
    max-width: 100%;
  }
  .banner {
    width: 100%;
    background-color: var(--color-theme);
  }
  .logotype {
    font-size: 6rem;
    padding: 2rem;
    display: block;
    @media screen and (max-width: 769px) {
      display: flex;
      flex-wrap: wrap;
      font-size: 20vw;
      padding: 14.25vw;
      transform: translateX(-1.75vw);
    }
  }
  .icon {
    width: 4.6rem;
    height: 4.6rem;
    @media screen and (max-width: 769px) {
      width: 16.5vw;
      height: 16.5vw;
    }
  }
</style>
