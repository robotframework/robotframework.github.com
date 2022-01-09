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
      d="M0 0h24v24H0V0z"
      fill="none" />
    <path
      d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
  </svg>
</template>

<script>
export default {
  name: 'CopyIcon',
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
</style>
