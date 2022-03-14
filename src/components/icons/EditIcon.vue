<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    :class="{
      ['fill-white']: color === 'white',
      ['fill-theme']: color === 'theme',
      ['fill-white hover-theme']: color === 'hover-theme'
    }">
    <path d="M14.06,9L15,9.94L5.92,19H5V18.08L14.06,9M17.66,3C17.41,3 17.15,3.1 16.96,3.29L15.13,5.12L18.88,8.87L20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18.17,3.09 17.92,3 17.66,3M14.06,6.19L3,17.25V21H6.75L17.81,9.94L14.06,6.19Z" />
  </svg>
</template>

<script>
export default {
  name: 'EditIcon',
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
  .hover-theme {
    transition: fill 0.2s;
  }
  .hover-theme:hover {
    fill: var(--color-theme);
  }
</style>
