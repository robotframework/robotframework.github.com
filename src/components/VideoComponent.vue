<template>
  <div
      class="col-sm-12 col-lg-9 col-lg-offset-3"
      :style="{ 'overflow-x': 'scroll', 'overflow-y' : 'hidden' }"
  >
    <YouTube
        :src=src
        @ready="onReady"
        ref="youtube"/>
  </div>
</template>
<script>
export default {
  name: 'VideoComponent',
  props: {
    src: String
  }
}
</script>
