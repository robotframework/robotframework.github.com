<template>
  <div>
    <navbar-sub-page title="RPA" />
    <div class="container mb-3xlarge">
      <page-section
        long-title
        title-id="intro"
        :title="$t('rpa.intro.title')"
        :body="$t('rpa.intro.body')"/>
      <page-section
        long-title
        title-id="benefits"
        :title="$t('rpa.benefits.title')"
        :body="$t('rpa.benefits.body')"/>
      <page-section
        long-title
        title-id="quickstart"
        :title="$t('rpa.quickstart.title')"
        :body="$t('rpa.quickstart.body')"/>
      <page-section
        long-title
        title-id="resources"
        :title="$t('rpa.resources.title')"
        :body="$t('rpa.resources.body')">
        <div
          v-for="resource in ['tooling', 'libraries', 'tutorials']"
          :key="resource"
          class="col-sm-12 col-lg-9 col-lg-offset-3">
          <h3 class="mb-none mt-small">{{ $t(`rpa.resources.${resource}.title`) }}</h3>
          <div class="type-italic type-small mb-small">{{ $t(`rpa.resources.${resource}.description`) }}</div>
          <div
            v-for="item in $tm(`rpa.resources.${resource}.list`)"
            :key="item.name">
            <a class="block line-height-small" :href="item.href">{{ item.name }}</a>
            <div class="type-small mb-small">{{ item.description }}</div>
          </div>
        </div>
      </page-section>
    </div>
    <page-footer />
  </div>
</template>

<script>
import { NavbarSubPage, PageSection, PageFooter, TabBox } from 'Components'

export default {
  name: 'RPA',
  components: {
    NavbarSubPage,
    PageSection,
    PageFooter,
    TabBox
  },
  data: () => ({
    defaultTab: 0
  }),
  created() {
    if (window.navigator.userAgentData.platform.toLowerCase().includes('mac')) this.defaultTab = 1
    if (window.navigator.userAgentData.platform.toLowerCase().includes('linux')) this.defaultTab = 2
  },
  mounted() {
    this.$refs.tabs.addEventListener('click', ({ target }) => {
      if (!target.classList.contains('icon-copy')) return
      const blob = new Blob([target.nextElementSibling.innerText], { type: 'text/plain' })
      const content = new window.ClipboardItem({ 'text/plain': blob })
      navigator.clipboard.write([content])
        .then(() => {
          target.classList.add('copied')
        })
    })
  }
}
</script>

<style>
.icon-copy {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='1rem' height='1rem'%0Afill='white'%3E%3Cpath d='M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z' /%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: center;
  width: 1rem;
  margin-right: .25rem;
  transform: translateX(-.25rem);
}
.copied {
  filter: contrast(0) brightness(1) sepia(1) hue-rotate(120deg);
}
</style>
