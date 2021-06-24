<template>
  <news-banner v-if="$te('newsBanner')" />
  <banner />
  <navbar class="mb-medium" />
  <div class="container">
    <!-- introduction -->
    <page-section
      :title="$t('introduction.title')"
      :body="$t('introduction.body')"
      :twitter="true">
      <div class="mt-large mb-large">
        <company-carousel />
      </div>
    </page-section>
    <!-- getting started -->
    <page-section
      :title="$t('gettingStarted.title')"
      :body="$t('gettingStarted.body')">
    </page-section>
  </div>
</template>

<script>
import { NewsBanner, Banner, Navbar, PageSection, CompanyCarousel } from 'Components'

export default {
  name: 'App',
  components: {
    NewsBanner,
    Banner,
    Navbar,
    PageSection,
    CompanyCarousel
  }
}
</script>
