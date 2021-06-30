<template>
  <svg
    :height="`${size}px`"
    viewBox="0 0 24 24"
    :width="`${size}px`"
    fill="#000000">
    <path
      d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"
      :transform="transform" />
  </svg>
</template>

<script>
export default {
  name: 'Chevron',
  props: {
    direction: {
      type: String,
      default: 'left'
    },
    size: {
      type: Number,
      default: 16
    }
  },
  computed: {
    transform() {
      if (this.direction === 'right') return 'rotate(180 12 12)'
      return ''
    }
  }
}
</script>

<style scoped>
  svg {
    transition: fill 0.2s;
  }
  svg:hover {
    fill: var(--color-theme);
  }
</style>
