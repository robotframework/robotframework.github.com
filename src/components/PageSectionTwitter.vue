<template>
  <div class="border-top-theme row p-small pb-none">
    <div
      class="col-sm-12 col-lg-3"
      :class="$store.state.isMobile ? '' : 'pt-3xsmall'">
      <h2 :id="titleId">
        {{ title }}
      </h2>
    </div>
    <div
      class="col-sm-12 col-lg-6"
      :class="!$store.state.isMobile ? 'pr-large pt-2xsmall' : ''"
      style="height: fit-content;"
      ref="body">
      <p v-html="body" />
      <slot />
    </div>
    <div
      v-if="$store.state.isDesktop"
      class="twitter col-sm-12 col-lg-3 p-none mt-small card"
      :style="`height: ${twitterHeight}px;`">
      <accessibility-link label="Skip twitter timeline" go-to="getting-started" />
      <a
        class="twitter-timeline"
        data-dnt="true"
        data-theme="dark"
        href="https://twitter.com/robotframework?ref_src=twsrc%5Etfw">¨
        Tweets by robotframework
      </a>
      <component :is="'script'" async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
    </div>
  </div>
</template>

<script>
import AccessibilityLink from './AccessibilityLink.vue'

export default {
  name: 'PageSection',
  components: {
    AccessibilityLink
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    body: {
      type: String,
      default: ''
    },
    titleId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    twitterHeight: 500
  }),
  mounted() {
    setTimeout(() => {
      this.twitterHeight = this.$refs.body.offsetHeight - 32
    }, 200)
    window.addEventListener('resize', () => {
      this.twitterHeight = this.$refs.body.offsetHeight - 32
    })
  }
}
</script>

<style scoped>
  .twitter {
    overflow: scroll;
  }
  h2::before {
    display: block;
    content: " ";
    margin-top: -100px;
    height: 100px;
    visibility: hidden;
    pointer-events: none;
  }
  h2 {
    clip-path: polygon(0 calc(100% - 2rem), 100% calc(100% - 2rem), 100% 100%, 0% 100%)
  }
  @media screen and (max-width: 700px) {
    h2::before {
      margin-top: -30px;
      height: 30px;
    }
  }
</style>
