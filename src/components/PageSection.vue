<template>
  <div
    class="border-top-theme mt-xlarge section-container"
    tabindex="-1">
    <div class="row p-small">
      <div
        class="col-sm-12 col-lg-3"
        :class="$store.state.isMobile ? '' : 'pt-3xsmall'">
        <h2 :id="titleId">
          {{ title }}
        </h2>
      </div>
      <div
        class="col-sm-12 col-lg-9"
        v-html="body" />
    </div>
    <div
      class="row"
      :class="$store.state.isMobile ? '' : 'pl-small pr-small'">
      <slot />
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
