<template>
  <div
    class="border-top-theme"
    :id="title.toLowerCase().replaceAll(' ', '-')">
    <div class="row p-small">
      <div
        class="col-sm-12 col-lg-3"
        :class="$store.state.isMobile ? '' : 'pt-small'">
        <h2>
          {{ title }}
        </h2>
      </div>
      <div
        class="col-sm-12 col-lg-6"
        :class="!$store.state.isMobile ? 'pr-large pt-xsmall' : ''"
        ref="body"
        id="asd">
        <p v-html="body" />
        <slot />
      </div>
      <div
        v-if="!$store.state.isMobile"
        class="twitter col-sm-12 col-lg-3 p-none pt-medium rounded"
        :style="`height: ${twitterHeight}px`">
        <a
          class="twitter-timeline"
          data-dnt="true"
          data-theme="dark"
          href="https://twitter.com/robotframework?ref_src=twsrc%5Etfw">
          Tweets by robotframework
        </a>
        <component :is="'script'" async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PageSection',
  props: {
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    twitterHeight: 500
  }),
  mounted() {
    setTimeout(() => {
      this.twitterHeight = this.$refs.body.offsetHeight - 16
    }, 200)
    window.addEventListener('resize', () => { this.twitterHeight = this.$refs.body.offsetHeight - 16 })
  }
}
</script>

<style scoped>
  .twitter {
    overflow: scroll;
  }
</style>
