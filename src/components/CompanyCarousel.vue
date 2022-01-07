<template>
  <div v-if="activeCompany">
    <h4>
      {{ $t('introduction.usedByTitle') }}
    </h4>
    <div class="row carousel-container pt-small pb-small bg-white bg-grey-dark-darkmode card">
      <button
        class="col-sm-2 col-md-1 flex center middle"
        aria-label="previous testimonial"
        @click="setActiveCompany(-1)">
        <chevron-icon size="3rem" :color="isDarkMode ? 'white' : 'black'" />
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
        <chevron-icon
          direction="right"
          :color="isDarkMode ? 'white' : 'black'"
          size="3rem" />
      </button>
    </div>
    <div v-if="$store.state.isMobile">
      <div class="row between">
        <button
          v-for="(company, i) in companiesShuffled.slice(0, 5)"
          :key="company.name"
          :aria-label="`${company.name} testimonial`"
          :style="`background-image: url(${publicPath}img/carousel-company-icons/${company.imgName})`"
          class="img-container-small bg-white card mt-small"
          :class="activeCompanyIndex === i ? 'logo-active border-black border-thin' : ''"
          @click="activeCompanyIndex = i" />
      </div>
      <div class="row between">
        <button
          v-for="(company, i) in companiesShuffled.slice(5, 10)"
          :key="company.name"
          :aria-label="`${company.name} testimonial`"
          :style="`background-image: url(${publicPath}img/carousel-company-icons/${company.imgName})`"
          class="img-container-small bg-white card mt-small"
          :class="activeCompanyIndex === i + 5 ? 'logo-active border-black border-thin' : ''"
          @click="activeCompanyIndex = i + 5" />
      </div>
    </div>
    <div v-else class="row">
      <button
        v-for="(company, i) in companiesShuffled"
        :key="company.name"
        :aria-label="`${company.name} testimonial`"
        :style="`background-image: url(${publicPath}img/carousel-company-icons/${company.imgName})`"
        class="img-container-small bg-white card mt-small"
        :class="[
          activeCompanyIndex === i ? 'logo-active border-black border-thin' : '',
          i === companiesShuffled.length - 1 ? 'mr-none' : 'mr-small'
        ]"
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
    eventSent: false,
    isDarkMode: false
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
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
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
    width: 3.15rem;
    height: 3.15rem;
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
  @media screen and (max-width: 699px) {
    .carousel-container {
      margin-left: -1rem;
      margin-right: -1rem;
    }
    .description {
      padding-left: 0;
      height: 10rem;
      overflow-y: auto;
    }
    .img-container-small {
      width: calc((100vw - 2rem) / 7);
      height: calc((100vw - 2rem) / 7);
    }
  }
  @media (prefers-color-scheme: dark) {
    .img-container {
      background-color: var(--color-white);
      background-origin: content-box;
      padding: 0.5rem;
      border-radius: var(--border-radius-rounded);
    }
  }
</style>
