<template>
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
import { Banner, Navbar, PageSection, CompanyCarousel } from 'Components'

export default {
  name: 'App',
  components: {
    Banner,
    Navbar,
    PageSection,
    CompanyCarousel
  }
}
</script>
