<template>
  <div class="row section-container">
    <div class="col-sm-12 col-lg-2 title">
      <h2 :id="titleId">
        {{ title }}
      </h2>
    </div>
    <div class="col-sm-12 col-lg-10 body">
      <div v-html="body" />
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
  @media screen and (max-width: 1024px) {
    .section-container {
      margin-top: 2rem;
      margin-bottom: 4rem;
    }
    h2::before {
      margin-top: -30px;
      height: 30px;
    }
    h2 {
      padding-inline: 1.5rem;
    }
  }
  @media screen and (min-width: 1025px) {
    .section-container {
      margin-top: 1rem;
      margin-bottom: 4rem;
    }
    .title {
      padding-left: 1rem;
    }
    .body {
      padding-right: 1rem;
    }
  }
</style>
