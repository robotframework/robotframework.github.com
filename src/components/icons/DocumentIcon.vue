<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
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
      d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
  </svg>
</template>

<script>
export default {
  name: 'DocumentIcon',
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
