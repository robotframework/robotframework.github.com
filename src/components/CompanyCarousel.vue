<template>
  <div class="row carousel-container">
    <button
      class="col-sm-1 flex center middle"
      @click="setActiveCompany(-1)">
      <chevron-icon size="48" />
    </button>
    <transition :name="direction === 1 ? 'fade-left' : 'fade-right'" mode="out-in">
      <div
        :key="activeCompanyIndex"
        class="col-sm-10 row middle">
        <div class="col-sm-3">
          <div
            class="img-container"
            :style="`background-image: url(${publicPath}img/companies/${activeCompany.imgName})`" />
        </div>
        <div
          class="col-sm-9 type-italic type-small pl-medium"
          v-html="activeCompany.description" />
      </div>
    </transition>
    <button
      class="col-sm-1 type-right flex center middle"
      @click="setActiveCompany(1)">
      <chevron-icon direction="right" size="48" />
    </button>
  </div>
</template>

<script>
import ChevronIcon from './icons/ChevronIcon.vue'

export default {
  name: 'CompanyCarousel',
  components: {
    ChevronIcon
  },
  data: () => ({
    activeCompanyIndex: 0,
    publicPath: process.env.BASE_URL,
    direction: 0
  }),
  computed: {
    activeCompany() {
      return this.$tm('introduction.companies')[this.activeCompanyIndex]
    },
    numberOfCompanies() {
      return this.$tm('introduction.companies').length
    }
  },
  methods: {
    setActiveCompany(direction) {
      this.direction = direction
      if (direction === -1) {
        if (this.activeCompanyIndex === 0) this.activeCompanyIndex = this.$tm('introduction.companies').length - 1
        else this.activeCompanyIndex -= 1
      } else {
        if (this.activeCompanyIndex === this.$tm('introduction.companies').length - 1) this.activeCompanyIndex = 0
        else this.activeCompanyIndex += 1
      }
    }
  }
}
</script>

<style scoped>
  .carousel-container {
    height: 10rem;
  }
  .img-container {
    height: 4rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
</style>
