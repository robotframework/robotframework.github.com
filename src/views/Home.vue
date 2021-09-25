<template>
  <nav-mobile />
  <banner />
  <navbar class="nav-desktop" />
  <news-banner v-if="$te('newsBanner')" class="mb-small mt-small" />
  <div v-else class="mb-large" />
  <div class="container mb-2xlarge">
    <!-- introduction -->
    <page-section-twitter
      :title="$t('introduction.title')"
      :body="$t('introduction.body')">
      <div class="mt-small mb-small">
        <company-carousel />
      </div>
    </page-section-twitter>
    <!-- getting started -->
    <page-section
      :title="$t('gettingStarted.title')"
      :body="$t('gettingStarted.body')">
      <tab-box
        class="col-sm-12 col-md-9 col-md-offset-3"
        :tabs="$tm('gettingStarted.tabs')" />
    </page-section>
    <!-- community -->
    <page-section
      :title="$t('community.title')"
      :body="$t('community.body')">
      <div class="col-sm-12 col-md-9 col-md-offset-3 row">
        <community-items />
      </div>
    </page-section>
    <!-- resources -->
    <page-section
      :title="$t('resources.title')"
      :body="$t('resources.body')">
      <resource-box class="col-sm-12 col-md-9 col-md-offset-3" />
    </page-section>
  </div>
  <page-footer />
</template>

<script>
import {
  NewsBanner,
  Banner,
  PageFooter,
  Navbar,
  NavMobile,
  PageSection,
  PageSectionTwitter,
  CompanyCarousel,
  CommunityItems,
  ResourceBox,
  TabBox
} from 'Components'

export default {
  name: 'App',
  components: {
    NewsBanner,
    Banner,
    PageFooter,
    Navbar,
    NavMobile,
    PageSection,
    PageSectionTwitter,
    CompanyCarousel,
    CommunityItems,
    ResourceBox,
    TabBox
  },
  mounted() {
    const embedScript = document.createElement('script')
    embedScript.setAttribute('src', '//katacoda.com/embed.js')
    document.head.appendChild(embedScript)
  }
}
</script>

<style scoped>
@media screen and (max-width: 768px) {
  .nav-desktop {
    display: none;
  }
}
</style>
