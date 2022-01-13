<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="2 2 20 20"
    :width="size"
    :height="size"
    :class="{
      ['fill-white']: color === 'white',
      ['fill-theme']: color === 'theme',
      ['fill-black']: color === 'black'
    }">
    <path
      d="M0 0h24v24H0V0z"
      fill="none" />
    <path
      d="M8 5v14l11-7z" />
  </svg>
</template>

<script>
export default {
  name: 'PlayIcon',
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
  .fill-white {
    fill: var(--color-white);
  }
  .fill-theme {
    fill: var(--color-theme);
  }
  .fill-black {
    fill: var(--color-black);
  }
</style>
