<template>
  <div
    class="border-top-theme mt-medium"
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
        class="col-sm-12 col-lg-9"
        :class="$store.state.isMobile ? '' : 'pt-medium'">
        <p v-html="body" />
      </div>
    </div>
    <div
      class="row"
      :class="$store.state.isMobile ? '' : 'p-small'">
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
    }
  }
}
</script>
