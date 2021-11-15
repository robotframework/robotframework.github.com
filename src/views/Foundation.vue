<template>
  <div>
    <navbar-sub-page title="Foundation" />
    <div class="container mb-3xlarge">
      <div
        class="col-sm-12 col-lg-9 col-lg-offset-3"
        v-html="$t('foundation.lead')">
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
        <sponsors-detailed class="col-sm-12 col-lg-9 col-lg-offset-3" />
      </page-section>
    </div>
    <page-footer />
  </div>
</template>

<script>
import { NavbarSubPage, PageSection, SponsorsDetailed, PageFooter } from 'Components'

export default {
  name: 'Foundation',
  components: {
    NavbarSubPage,
    PageSection,
    SponsorsDetailed,
    PageFooter
  }
}
</script>
