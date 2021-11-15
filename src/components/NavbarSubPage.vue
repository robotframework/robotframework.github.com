<template>
  <div class="bar">
    <div class="container row pt-xsmall pb-xsmall">
      <router-link :to="{ name: 'Home' }" class="type-xlarge color-theme font-title line-height-1">
        ../
      </router-link>
      <h1 class="type-xlarge color-white line-height-1 type-uppercase">
        {{ title }}
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavbarSubPage',
  props: {
    title: {
      type: String,
      required: true
    }
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
</style>
