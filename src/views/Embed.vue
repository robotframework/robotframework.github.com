<template>
  <div>
    <editor />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'EmbeddedEditor',
  components: {
    Editor: defineAsyncComponent(() => import('Components/EmbeddedEditor.vue'))
  }
}
</script>
