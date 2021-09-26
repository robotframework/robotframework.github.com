<template>
  <div>
    <highlightjs language='robot' :code="code" />
  </div>
</template>

<script>

export default {
  name: 'RobotCode',
  props: {
    code: {
      type: String,
      default: ''
    }
  }
}
</script>
