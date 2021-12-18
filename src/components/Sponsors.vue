<template>
  <div class="row bg-grey-dark-darkmode pt-medium pb-medium p-small">
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
      class="sponsor">
      <div
        class="cursor-pointer bg-white card">
        <div
          class="img-container mb-small"
          :style="`background-image: url(${publicPath}img/sponsors/${sponsor.img})`" />
      </div>
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
  flex-basis: 14.6%;
  max-width: 14.6%;
  transition: transform 0.2s;
  margin: 0 1%;
}
.sponsor:hover {
  transform: scale(1.08);
}
.img-container {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  height: 4rem;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
}
@media screen and (max-width: 700px) {
  .sponsor {
    flex-basis: 31%;
    max-width: 31%;
  }
}
</style>
