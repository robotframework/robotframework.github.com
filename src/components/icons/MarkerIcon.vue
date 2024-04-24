<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    :class="{
      ['fill-white']: color === 'white',
      ['fill-theme']: color === 'theme'
    }">
    <path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7m0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5" />
  </svg>
</template>

<script>
export default {
  name: 'MarkerIcon',
  props: {
    color: {
      type: String,
      default: 'white'
    },
    size: {
      type: String,
      default: '1rem'
    }
  }
}
</script>

<style scoped>
  svg {
    flex-shrink: 0;
  }
  .fill-white {
    fill: var(--color-white);
  }
  .fill-theme {
    fill: var(--color-theme);
  }
</style>
