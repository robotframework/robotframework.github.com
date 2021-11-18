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
                :style="`background-image: url(${publicPath}img/sponsors/${sponsor.img})`" />
            </a>
          </div>
          <div>
            {{ sponsor.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SponsorsDetailed',
  data: () => ({
    publicPath: process.env.BASE_URL,
    columnAmount: 3
  }),
  computed: {
    columns() {
      if (this.columnAmount === 3) {
        return [
          this.$tm('resourcesList.sponsors').filter((_, i) => i % 3 === 0),
          this.$tm('resourcesList.sponsors').filter((_, i) => i % 3 === 1),
          this.$tm('resourcesList.sponsors').filter((_, i) => i % 3 === 2)
        ]
      } else {
        return [this.$tm('resourcesList.sponsors')]
      }
    }
  },
  created() {
    window.addEventListener('resize', this.calculateColumnAmount)
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
