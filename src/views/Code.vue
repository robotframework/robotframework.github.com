<template>
  <editor />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'CodeEditor',
  components: {
    Editor: defineAsyncComponent(() => import('Components/Editor.vue'))
  }
}
</script>
