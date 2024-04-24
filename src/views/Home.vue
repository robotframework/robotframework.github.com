<template>
  <nav-mobile />
  <navbar class="nav-desktop" />
  <banner />
  <div class="container">
    <div class="row intro">
      <div class="col-sm-12 col-lg-8 col-lg-offset-2 type-large p-medium card bg-secondary">
        <div v-html="$t('introduction.body')" />
      </div>
      <div class="col-sm-12 col-lg-3 col-lg-offset-2 calendar-container">
        <calendar />
      </div>
      <div class="col-sm-12 col-lg-5 pl-medium news-container">
        <news />
      </div>
    </div>
    <hr class="theme">
    <!-- getting started -->
    <page-section
      title-id="getting-started"
      :title="$t('gettingStarted.title')"
      :body="$t('gettingStarted.body')">
      <tab-box
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
    <hr class="theme">
    <!-- resources -->
    <page-section
      title-id="resources"
      :title="$t('resources.title')"
      :body="$t('resources.body')">
      <resource-box />
    </page-section>
    <hr class="theme">
    <!-- community -->
    <page-section
      title-id="community"
      :title="$t('community.title')"
      :body="$t('community.body')">
      <community-items />
      <button class="theme mt-medium" :class="$store.state.isMobile ? 'ml-xsmall' : ''">
        <router-link :to="{ name: 'CoC' }" class="type-no-underline">
          Code of Ethics
        </router-link>
      </button>
      <video-component videoId='2GDrtvz_1Ds' class="col-sm-12 mt-small" />
    </page-section>
    <hr class="theme">
    <!-- development -->
    <page-section
      title-id="development"
      :title="$t('development.title')"
      :body="$t('development.body')">
      <sponsors />
      <milestones />
    </page-section>
  </div>
  <page-footer />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import {
  Banner,
  PageFooter,
  Navbar,
  NavMobile,
  PageSection,
  News,
  Calendar,
  CommunityItems,
  ResourceBox,
  TabBox,
  Sponsors,
  Milestones
} from 'Components'
import VideoComponent from 'Components/VideoComponent'

export default {
  name: 'App',
  components: {
    VideoComponent,
    Banner,
    PageFooter,
    Navbar,
    NavMobile,
    PageSection,
    News,
    Calendar,
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
  .calendar-container {
    margin-top: 2rem;
  }
  .news-container {
    padding-left: 0;
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
@media screen and (min-width: 1025px) {
  .intro {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
  .calendar-container {
    margin-top: 1.5rem;
  }
  .news-container {
    margin-top: 1.5rem;
  }
}
</style>
