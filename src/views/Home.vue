<template>
  <nav-mobile />
  <banner />
  <navbar class="nav-desktop" />
  <news-banner
    v-if="$te('newsBanner') && $t('newsBanner') !== ''"
    class="mb-small mt-small" />
  <div
    v-else
    class="mb-medium" />
  <div class="container mb-xlarge">
    <!-- introduction -->
    <page-section-twitter
      title-id="introduction"
      :title="$t('introduction.title')"
      :body="$t('introduction.body')">
      <div class="mt-small mb-small">
        <company-carousel />
      </div>
    </page-section-twitter>
    <!-- getting started -->
    <page-section
      title-id="getting-started"
      :title="$t('gettingStarted.title')"
      :body="$t('gettingStarted.body')">
      <tab-box
        class="col-sm-12 col-lg-9 col-lg-offset-3"
        :tabs="$tm('gettingStarted.tabs')">
        <template v-slot:tab-1>
          <monaco-editor />
        </template>
        <!-- list of learning resouces on 3rd tab -->
        <template v-slot:tab-3>
            <div v-for="item in $tm('resourcesList.learning')" :key="item.name" class="mt-small mb-small">
              <a :href="item.href">
                {{ item.name }}
              </a>
              <div class="type-small" v-html="item.description" />
            </div>
        </template>
      </tab-box>
    </page-section>
    <!-- resources -->
    <page-section
      title-id="resources"
      :title="$t('resources.title')"
      :body="$t('resources.body')">
      <resource-box class="col-sm-12 col-lg-9 col-lg-offset-3" />
    </page-section>
    <!-- community -->
    <page-section
      title-id="community"
      :title="$t('community.title')"
      :body="$t('community.body')">
      <div class="col-sm-12 col-lg-9 col-lg-offset-3 row">
        <community-items />
        <button class="theme mt-medium" :class="$store.state.isMobile ? 'ml-xsmall' : ''">
          <router-link :to="{ name: 'CoC' }" class="type-no-underline">
            Code of Conduct
          </router-link>
        </button>
      </div>
    </page-section>
    <!-- development -->
    <page-section
      title-id="development"
      :title="$t('development.title')"
      :body="$t('development.body')">
      <sponsors class="col-sm-12 col-lg-9 col-lg-offset-3" />
      <milestones class="col-sm-12 col-lg-9 col-lg-offset-3 mt-medium" />
    </page-section>
  </div>
  <page-footer />
</template>

<script>
import { defineAsyncComponent } from 'vue'
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
  TabBox,
  Sponsors,
  Milestones
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
    TabBox,
    Sponsors,
    Milestones,
    MonacoEditor: defineAsyncComponent(() => import('Components/Editor.vue'))
  }
}
</script>

<style scoped>
@media screen and (max-width: 1024px) {
  .nav-desktop {
    display: none;
  }
}
</style>
