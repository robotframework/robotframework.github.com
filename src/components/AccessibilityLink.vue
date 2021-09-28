<template>
  <button
    class="accessibility-link"
    @click="buttonClick()">
    {{ label }}
  </button>
</template>

<script>
export default {
  name: 'AccessibilityLink',
  props: {
    goTo: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    }
  },
  methods: {
    buttonClick() {
      document.getElementById(this.goTo).focus()
    }
  }
}
</script>

<style scoped>
.accessibility-link {
  font-size: 0px;
  position: absolute;
  color: var(--color-black);
}

.accessibility-link:focus {
  font-size: 1rem;
  position: relative;
  outline: 2px dotted var(--color-black);
  text-decoration: underline;
}
</style>
