<template>
  <div class="row bg-grey-dark-darkmode pt-medium pb-medium p-small mb-large">
    <div class="col-sm-12 mb-xsmall type-center color-theme">
      <h3>
        {{ $t('development.sponsorBoxTitle') }}
      </h3>
    </div>
    <div class="list-container">
      <a
        v-for="sponsor in sponsors"
        :key="sponsor.fields.name"
        :href="sponsor.fields.href"
        target="_blank"
        class="sponsor card mb-small">
          <div
            class="img-container mb-small"
            :style="`background-image: url(${sponsor.fields.logo.fields.file.url}?fm=webp&w=300&h=300)`" />
      </a>
    </div>
    <div class="col-sm-12 type-small type-right pr-small" v-html="$t('development.howToJoin')" />
  </div>
</template>

<script>
import { getSponsors } from '../js/contentfulClient'

export default {
  name: 'Sponsors',
  data: () => ({
    publicPath: process.env.BASE_URL,
    sponsors: []
  }),
  async created() {
    this.sponsors = (await getSponsors()).sort((a, b) => a.fields.name < b.fields.name ? -1 : 1)
  }
}
</script>

<style scoped>
.list-container {
  display: flex;
  flex-wrap: wrap;
  column-gap: 0.5rem;
  width: 100%;
}
.sponsor {
  flex: 1 0 19%;
  max-width: calc(20% - 0.5rem);
  transition: transform 0.2s;
  cursor: pointer;
  background-color: var(--color-white);
}
.sponsor:hover {
  transform: scale(1.08);
}
.img-container {
  width: 80%;
  margin: 0.5rem auto;
  height: 4rem;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
@media screen and (max-width: 1024px) {
  .sponsor {
    flex: 1 0 30%;
    max-width: 33%;
  }
}
</style>
