<template>
  <div class="bg-grey-dark p-small rounded">
    <div class="row">
      <button
        v-for="(tab, i) in tabs"
        :key="tab.name"
        class="type-uppercase theme-button type-small"
        :class="[
          activeTabName === tab.name ? 'active' : '',
          i === 2 ? 'mr-none' : 'mr-medium'
        ]"
        @click="activeTabName = tab.name">
        {{ tab.name }}
      </button>
    </div>
    <div v-if="activeTab" class="row mt-small color-white">
      <transition name="opacity" mode="out-in">
        <div
          v-if="!includesRobotCode"
          :key="activeTab.name"
          v-html="activeTab.description" />
        <div v-else>
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
    activeTabName: null
  }),
  computed: {
    activeTab() {
      return this.tabs.find(({ name }) => name === this.activeTabName)
    },
    includesRobotCode() {
      return this.activeTab.description.includes('<robot>')
    },
    splitDescription() {
      // used to render robot code with custom element
      if (!this.includesRobotCode) return null
      const el = document.createElement('template')
      el.innerHTML = this.activeTab.description
      return Array.from(el.content.children).map((child) => child.outerHTML)
    }
  },
  mounted() {
    this.activeTabName = this.tabs[0].name
  }
}
</script>
