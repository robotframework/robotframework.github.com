<template>
  <div v-if="activeCompany">
    <div class="row carousel-container pt-small pb-small bg-white card">
      <button
        class="col-sm-2 col-md-1 flex center middle"
        aria-label="previous testimonial"
        @click="setActiveCompany(-1)">
        <chevron-icon :size="48" />
      </button>
      <transition :name="direction === 1 ? 'fade-left' : 'fade-right'" mode="out-in">
        <div
          :key="activeCompanyIndex"
          class="col-sm-8 col-md-10 row middle"
          :style="!$store.state.isMobile ? 'height: 10rem;' : ''">
          <div
            class="col-sm-10 col-sm-offset-1 col-md-3 col-md-offset-0"
            :class="$store.state.isMobile ? 'mb-medium' : ''">
            <div
              class="img-container"
              :style="`background-image: url(${publicPath}img/carousel-company-icons/${activeCompany.imgName})`" />
          </div>
          <div
            class="col-sm-12 col-md-9 type-italic type-small description"
            v-html="activeCompany.description" />
        </div>
      </transition>
      <button
        class="col-sm-2 col-md-1 type-right flex center middle"
        aria-label="next testimonial"
        @click="setActiveCompany(1)">
        <chevron-icon direction="right" :size="48" />
      </button>
    </div>
    <div class="row">
      <button
        v-for="(company, i) in companiesShuffled"
        :key="company.name"
        :aria-label="`${company.name} testimonial`"
        :style="`background-image: url(${publicPath}img/carousel-company-icons/${company.imgName})`"
        class="img-container-small mr-small mr-small bg-white card mt-small"
        :class="activeCompanyIndex === i ? 'logo-active border-black border-thin' : ''"
        @click="activeCompanyIndex = i" />
    </div>
    <button class="theme mt-small">
      <router-link :to="{ name: 'Users' }" class="type-no-underline">
        More users
      </router-link>
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
    direction: 0,
    companiesShuffled: [],
    eventSent: false
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
  },
  watch: {
    activeCompanyIndex() {
      if (!this.eventSent) {
        window.plausible('Interact', { props: { element: 'Testimonials' } })
        this.eventSent = true
      }
    }
  },
  created() {
    const companies = this.$tm('introduction.companies')
    for (let i = companies.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [companies[i], companies[j]] = [companies[j], companies[i]]
    }
    this.companiesShuffled = companies
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
  .img-container-small {
    width: 3rem;
    height: 3rem;
    background-repeat: no-repeat;
    background-size: 85%;
    background-position: center;
    filter: saturate(0);
    opacity: 0.7;
  }
  .logo-active {
    filter: saturate(1);
    opacity: 1;
  }
  .description {
    padding-left: var(--size-medium);
  }
  @media screen and (max-width: 768px) {
    .carousel-container {
      margin-left: -1rem;
      margin-right: -1rem;
    }
    .description {
      padding-left: 0;
      height: 10rem;
      overflow-y: scroll;
    }
  }
</style>
