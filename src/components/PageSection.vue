<template>
  <div class="border-top-theme mt-medium">
    <div class="row p-small">
      <div class="col-sm-12 col-lg-3 pt-small">
        <h2>
          {{ title }}
        </h2>
      </div>
      <div class="col-sm-12 col-lg-9 pt-medium">
        <p v-html="body" />
      </div>
      <div class="col-sm-12">
        <slot />
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
  }
}
</script>
