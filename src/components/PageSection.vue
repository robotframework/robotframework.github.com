<template>
  <div
    class="border-top-theme mt-xlarge section-container"
    tabindex="-1">
    <div class="row p-small pb-none">
      <div
        class="col-sm-12 col-lg-3"
        :class="$store.state.isMobile ? '' : 'pt-3xsmall'">
        <h2 :id="titleId" :class="longTitle && 'type-large'">
          {{ title }}
        </h2>
      </div>
      <div
        v-if="body !== ''"
        class="col-sm-12 col-lg-9"
        :class="$store.state.isMobile ? '' : 'pt-2xsmall'"
        v-html="body" />
        <slot v-else />
    </div>
    <div
      class="row"
      :class="$store.state.isMobile ? '' : 'pl-small pr-small'">
      <slot v-if="body !== ''"/>
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
    titleId: {
      type: String,
      required: true
    },
    longTitle: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
  h2::before {
    display: block;
    content: " ";
    margin-top: -100px;
    height: 100px;
    visibility: hidden;
    pointer-events: none;
  }
  @media screen and (max-width: 700px) {
    h2::before {
      margin-top: -30px;
      height: 30px;
    }
  }
</style>
