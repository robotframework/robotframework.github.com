<template>
  <banner />
  <navbar />
  <news-banner v-if="$te('newsBanner')" class="mb-small mt-small" />
  <div v-else class="mb-large" />
  <div class="container">
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
      <div id="katacoda-scenario-1"
        data-katacoda-id="<robotframework>/<robotframeworktest>"
        data-katacoda-color="004d7f"
        style="height: 600px; padding-top: 20px;"></div>
    </page-section>
    <!-- community -->
    <page-section
      :title="$t('community.title')"
      :body="$t('community.body')">
    </page-section>
  </div>
</template>

<script>
import { NewsBanner, Banner, Navbar, PageSection, PageSectionTwitter, CompanyCarousel } from 'Components'

export default {
  name: 'App',
  components: {
    NewsBanner,
    Banner,
    Navbar,
    PageSection,
    PageSectionTwitter,
    CompanyCarousel
  },
  mounted() {
    const embedScript = document.createElement('script')
    embedScript.setAttribute('src', '//katacoda.com/embed.js')
    document.head.appendChild(embedScript)
  }
}
</script>
