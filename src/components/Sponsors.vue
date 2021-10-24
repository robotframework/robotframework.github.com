<template>
  <div class="row bg-white card pt-medium pb-medium" :class="$store.state.isMobile ? '' : 'p-small'">
    <div class="col-sm-12 mb-xsmall type-center color-theme">
      <h3>
        {{ $t('development.sponsorBoxTitle') }}
      </h3>
    </div>
    <a
      v-for="sponsor in $tm('resourcesList.sponsors')"
      :key="sponsor.name"
      :href="sponsor.href"
      target="_blank"
      class="sponsor cursor-pointer">
      <div
        class="img-container mb-small"
        :style="`background-image: url(${publicPath}img/sponsors/${sponsor.img})`" />
    </a>
    <div class="col-sm-12 type-small type-right pr-small" v-html="$t('development.howToJoin')" />
  </div>
</template>

<script>
export default {
  name: 'Sponsors',
  data: () => ({
    publicPath: process.env.BASE_URL
  })
}
</script>

<style scoped>
.sponsor {
  flex-basis: 12.5%;
  max-width: 12.5%;
  transition: transform 0.2s;
}
.sponsor:hover {
  transform: scale(1.08);
}
.img-container {
  width: 70%;
  margin-left: auto;
  margin-right: auto;
  height: 4rem;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
@media screen and (max-width: 700px) {
  .sponsor {
    flex-basis: 25%;
    max-width: 25%;
  }
}
</style>
