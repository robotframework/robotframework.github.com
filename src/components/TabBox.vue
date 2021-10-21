<template>
  <div
    class="bg-grey bg-grey-dark-darkmode card"
    :class="$store.state.isMobile ? 'p-small pt-medium sharp' : 'p-large'">
    <!-- tab buttons -->
    <div class="row">
      <button
        v-for="(tab, i) in tabs"
        :key="tab.name"
        class="type-uppercase theme type-small mb-xsmall"
        :class="[
          activeTabIndex === i ? 'active' : '',
          i === 2 ? 'mr-none' : 'mr-small'
        ]"
        @click="activeTabIndex = i">
        {{ tab.name }}
      </button>
    </div>
    <div v-if="activeTab" class="row mt-small">
      <transition name="opacity" mode="out-in">
        <!-- regular text content -->
        <div
          v-if="!includesRobotCode && !$slots[`tab-${activeTabIndex + 1}`]"
          :key="activeTab.name"
          v-html="activeTab.description" />
        <!-- highlights rf syntax that has tags <robot></robot> -->
        <div v-else-if="includesRobotCode">
          <template
            v-for="tag in splitDescription"
            :key="tag">
            <robot-code
              v-if="tag.slice(0, 7) === '<robot>'"
              :code="tag.replace('<robot>', '').replace('</robot>', '')" />
            <div
              v-else
              v-html="tag" />
          </template>
        </div>
        <!-- custom slot content -->
        <div v-else>
          <slot :name="`tab-${activeTabIndex + 1}`" />
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import RobotCode from './RobotCode.vue'

export default {
  name: 'TabBox',
  components: {
    RobotCode
  },
  props: {
    tabs: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    activeTabIndex: 0,
    eventSent: false
  }),
  computed: {
    activeTab() {
      return this.tabs[this.activeTabIndex]
    },
    includesRobotCode() {
      return this.activeTab.description && this.activeTab.description.includes('<robot>')
    },
    splitDescription() {
      // used to render robot code with custom element
      if (!this.includesRobotCode) return null
      const el = document.createElement('template')
      el.innerHTML = this.activeTab.description
      return Array.from(el.content.children).map((child) => child.outerHTML)
    }
  },
  created() {
    // if url contains searchParam, open specific tab
    if (window.location.hash !== '#getting-started') return
    const param = new URLSearchParams(window.location.search)
    const tab = param.get('tab')
    if (!tab) return
    this.activeTabIndex = Number(tab)
  },
  watch: {
    activeTab() {
      if (!this.eventSent) {
        window.plausible('Interact', { props: { element: 'Learning' } })
        this.eventSent = true
      }
      const newUrl = `${window.location.href.split('?')[0].split('#')[0]}?tab=${this.activeTabIndex}#getting-started`
      history.replaceState(null, null, newUrl)
    }
  }
}
</script>
