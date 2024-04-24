<template>
  <svg
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    :fill="fillColor">
    <g>
      <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m0 16H5V10h14zM9 14H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2zm-8 4H7v-2h2zm4 0h-2v-2h2zm4 0h-2v-2h2z"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Calendar',
  props: {
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
    flex-shrink: 0;
  }
  svg:hover {
    fill: var(--color-theme);
  }
</style>
