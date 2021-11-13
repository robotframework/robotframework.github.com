<template>
  <div>
    <navbar-sub-page title="Robot Framework Foundation" />
    <div class="container">
      <page-section
        title-id="who-we-are"
        :title="$t('foundation.whoWeAre.title')"
        :body="$t('foundation.whoWeAre.body')">
      </page-section>
      <page-section
        title-id="how-to-join"
        :title="$t('foundation.howToJoin.title')"
        :body="$t('foundation.howToJoin.body')">
      </page-section>
      <page-section
        title-id="what-we-do"
        :title="$t('foundation.whatWeDo.title')"
        :body="$t('foundation.whatWeDo.body')">
      </page-section>
    </div>
  </div>
</template>

<script>
import { NavbarSubPage, PageSection } from 'Components'

export default {
  name: 'Foundation',
  components: {
    NavbarSubPage,
    PageSection
  }
}
</script>
