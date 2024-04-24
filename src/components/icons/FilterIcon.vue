<template>
  <svg
    viewBox="0 0 24 24"
    :width="size"
    :height="size"
    :fill="fillColor">
    <g>
      <path d="M10 18h4v-2h-4zM3 6v2h18V6zm3 7h12v-2H6z"/>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'FilterIcon',
  props: {
    size: {
      type: String,
      default: '1rem'
    },
    color: {
      type: String,
      default: 'bg'
    }
  },
  computed: {
    fillColor() {
      if (this.color === 'text') return 'var(--color-text)'
      if (this.color === 'theme') return 'var(--color-theme)'
      return 'var(--color-bg)'
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
