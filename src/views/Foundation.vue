<template>
  <div>
    <navbar-sub-page title="Foundation" />
    <div class="container mb-3xlarge">
      <h1 class="type-center mt-large mb-large color-theme">Robot Framework Foundation</h1>
      <div
        class="col-sm-12 col-lg-8 col-lg-offset-2 mb-large type-center px-small"
        v-html="$t('foundation.lead')">
      </div>
      <div class="col-sm-12 col-lg-8 col-lg-offset-2 px-small">
        <video controls preload="metadata" style="width: 100%;" class="card border-theme border-light" poster="/video/foundation_poster.webp" onclick="this.play()">
          <source src="/video/foundation.webm" type="video/webm" media="(min-width: 1200px)" />
          <source src="/video/foundation_compat.mp4" type="video/mp4" media="(min-width: 1200px)" />
          <source src="/video/foundation_mobile.webm" type="video/webm" />
          <source src="/video/foundation_mobile_compat.mp4" type="video/mp4" />
        </video>
      </div>
      <page-section
        title-id="benefits-and-cost"
        :title="$t('foundation.benefitsAndCost.title')"
        :body="$t('foundation.benefitsAndCost.body')"
        />
      <page-section
        title-id="how-to-join"
        :title="$t('foundation.howToJoin.title')"
        :body="$t('foundation.howToJoin.body')">
      </page-section>
      <page-section
        title-id="what-we-do"
        :title="$t('foundation.whatWeDo.title')"
        :body="$t('foundation.whatWeDo.body')">
        <sponsors-detailed class="" />
      </page-section>
    </div>
    <page-footer />
  </div>
</template>

<script>
import { NavbarSubPage, PageFooter, PageSection, SponsorsDetailed } from 'Components'

export default {
  name: 'Foundation',
  components: {
    NavbarSubPage,
    PageSection,
    SponsorsDetailed,
    PageFooter
  },
  data: () => ({
    publicPath: process.env.BASE_URL
  })
}
</script>
