<template>
  <div class="border-top-theme">
    <div class="row p-small">
      <div class="col-sm-12 col-lg-3">
        <h2>
          {{ title }}
        </h2>
      </div>
      <template v-if="twitter">
        <div class="col-sm-12 col-lg-6 pr-none">
          <p v-html="body" />
          <slot />
        </div>
        <div
          class="twitter col-sm-12 col-lg-3 pl-small">
          <a
            class="twitter-timeline"
            data-dnt="true"
            data-theme="light"
            href="https://twitter.com/robotframework?ref_src=twsrc%5Etfw">
            Tweets by robotframework
          </a>
          <component :is="'script'" async src="https://platform.twitter.com/widgets.js" charset="utf-8" />
        </div>
      </template>
      <template v-else>
        <div class="col-sm-12 col-lg-9">
          <p v-html="body" />
        </div>
        <div class="col-sm-12">
          <slot />
        </div>
      </template>
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
    },
    twitter: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  .twitter {
    height: 30rem;
    overflow: scroll;
  }
</style>
