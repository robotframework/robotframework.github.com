<template>
  <div class="row color-black color-white-darkmode type-small">
    <div
      v-for="(column, i) in columns"
      :key="i"
      :class="columns.length === 3 ? 'col-sm-4' : 'col-sm-12'">
      <div
        v-for="sponsor in column"
        :key="sponsor.name"
        class="mb-small"
        :class="[
          columns.length === 3 && i === 0 ? 'pr-small' : '',
          columns.length === 3 && i === 1 ? 'pr-xsmall pl-xsmall' : '',
          columns.length === 3 && i === 2 ? 'pl-small' : ''
        ]">
        <div class="bg-white bg-grey-dark-darkmode card p-medium">
          <div class="bg-white-darkmode rounded">
            <a :href="sponsor.href">
              <div
                class="img-container mb-small"
                :style="`background-image: url(${sponsor.fields.logo.fields.file.url})`" />
            </a>
          </div>
          <div v-html="sponsor.fields.description" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSponsors } from '../js/contentfulClient'

export default {
  name: 'SponsorsDetailed',
  data: () => ({
    publicPath: process.env.BASE_URL,
    columnAmount: 3,
    sponsors: []
  }),
  computed: {
    columns() {
      if (this.columnAmount === 3) {
        return [
          this.sponsors.filter((_, i) => i % 3 === 0),
          this.sponsors.filter((_, i) => i % 3 === 1),
          this.sponsors.filter((_, i) => i % 3 === 2)
        ]
      } else {
        return [this.sponsors]
      }
    }
  },
  async created() {
    window.addEventListener('resize', this.calculateColumnAmount)
    this.sponsors = (await getSponsors()).sort((a, b) => a.fields.name < b.fields.name ? -1 : 1)
    this.calculateColumnAmount()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateColumnAmount)
  },
  methods: {
    calculateColumnAmount() {
      if (window.innerWidth < 450) this.columnAmount = 1
      else this.columnAmount = 3
    }
  }
}
</script>

<style scoped>
.img-container {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  height: 4rem;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
@media (prefers-color-scheme: dark) {
  .img-container {
    height: 6rem;
  }
}
</style>
