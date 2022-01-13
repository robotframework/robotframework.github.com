<template>
  <div>
    <navbar-sub-page title="Code Playground" />
    <editor />
  </div>
</template>

<script>
import { NavbarSubPage } from 'Components'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'CodeEditor',
  components: {
    NavbarSubPage,
    Editor: defineAsyncComponent(() => import('Components/Editor.vue'))
  }
}
</script>
