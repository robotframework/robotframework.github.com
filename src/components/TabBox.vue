<template>
  <div class="bg-grey-dark p-small">
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
    <div class="row mt-small">
      <transition name="opacity" mode="out-in">
        <div
          v-if="activeTab"
          :key="activeTab.name"
          v-html="activeTab.description"
          class="color-white" />
      </transition>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TabBox',
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
    }
  },
  mounted() {
    this.activeTabName = this.tabs[0].name
  }
}
</script>
