<template>
  <div>
    <div
      class="img-container"
      :style="`background-image: url(${publicPath}img/companies/${imgName})`" />
    <h3>
      {{ title }}
    </h3>
    <div v-html="description" />
  </div>
</template>

<script>
export default {
  name: 'CompanyBlock',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    imgName: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    publicPath: process.env.BASE_URL
  })
}
</script>

<style scoped>
  .img-container {
    height: 5rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
</style>
