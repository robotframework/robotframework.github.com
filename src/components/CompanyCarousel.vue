<template>
  <div class="row middle">
    <div class="col-sm-1">
      &lt;-
    </div>
    <div class="col-sm-2">
      <div
        class="img-container"
        :style="`background-image: url(${publicPath}img/companies/${activeCompany.imgName})`" />
    </div>
    <div class="col-sm-8 type-italic type-small pl-medium">
      {{ activeCompany.description }}
    </div>
    <div class="col-sm-1 type-right">
      -&gt;
    </div>
  </div>
</template>

<script>
export default {
  name: 'CompanyCarousel',
  data: () => ({
    activeCompanyIndex: 0,
    publicPath: process.env.BASE_URL
  }),
  computed: {
    activeCompany() {
      return this.$tm('introduction.companies')[this.activeCompanyIndex]
    },
    numberOfCompanies() {
      return this.$tm('introduction.companies').length
    }
  }
}
</script>

<style scoped>
  .img-container {
    height: 4rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
</style>
