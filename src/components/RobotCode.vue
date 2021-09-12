<template>
  <div>
    <highlightjs language="robot" code="var x = 5;" />
  </div>
</template>

<script>
import hljs from 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

export default {
  name: 'RobotCode',
  components: {
    highlightjs: hljsVuePlugin.component
  }
}
</script>
