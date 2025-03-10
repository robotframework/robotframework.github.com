<template>
  <svg
    viewBox="3 3 18 18"
    :width="size"
    :height="size"
    :fill="fillColor"
    :style="`transform: ${transform}`">
    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
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
      type: String,
      default: '1rem'
    },
    color: {
      type: String,
      default: 'black'
    }
  },
  computed: {
    transform() {
      if (this.direction === 'right') return 'rotate(180deg)'
      if (this.direction === 'up') return 'rotate(90deg)'
      if (this.direction === 'down') return 'rotate(-90deg)'
      return ''
    },
    fillColor() {
      if (this.color === 'white') return '#f5f5f5'
      if (this.color === 'theme') return '#00c0b5'
      return '#1d1d1d'
    }
  }
}
</script>

<style scoped>
  svg {
    transition: fill 0.2s, transform 0.3s;
  }
  svg:hover {
    fill: var(--color-theme);
  }
</style>
