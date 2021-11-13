<template>
  <div class="row bar p-xsmall">
    back
    <div class="container row">
      <div class="type-xlarge color-theme font-title line-height-1">
        ../
      </div>
      <h1 class="type-xlarge color-white line-height-1">
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
  }
</style>
