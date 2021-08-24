<template>
  <div class="bg-grey-dark color-white">
    <div class="row p-medium">
      <button
        v-for="{ name, contentKey } in $tm('resources.tabs')"
        :key="name"
        class="type-uppercase mr-medium theme-button"
        :class="activeTab === contentKey ? 'active' : ''"
        @click="activeTab = contentKey">
        {{ name }}
      </button>
    </div>
    <transition name="opacity" mode="out-in">
      <div :key="activeTab">
        <div class="row mb-medium">
          <div class="col-sm-9 pl-medium">
            {{ selectedTab.description }}
          </div>
          <div class="col-sm-3 pr-medium flex bottom end">
            <div class="relative">
              <div class="flex middle filter-input-container">
                <input
                  v-model="filterInput"
                  id="tags-filter-input"
                  :placeholder="'Filter by tag'"
                  class="p-2xsmall bg-grey-dark font-body"
                  :style="`color: ${tagFilterExactMatch ? getTagColor(filterInput) : '#f5f5f5'}`"
                  @focus="filterInputFocused = true"
                  @blur="filterInputFocused = false">
                  <button
                    class="p-3xsmall pr-2xsmall color-white"
                    :style="filterInput === '' ? 'visibility: hidden' : ''"
                    @click="filterInput = ''">
                    X
                  </button>
              </div>
              <transition name="opacity">
                <div
                  v-if="filterInputFocused && tabTags
                      .filter((tag) => tag.includes(filterInput.toLowerCase()) && tag !== filterInput.toLowerCase()).length"
                  class="input-suggestions bg-grey-dark p-2xsmall">
                  <div
                    v-for="tag in tabTags
                      .filter((tag) => tag.includes(filterInput.toLowerCase()) && tag !== filterInput.toLowerCase())"
                    :key="tag">
                    <button
                      :style="`color: ${getTagColor(tag)}`"
                      class="type-uppercase"
                      @click="filterInput = tag.toUpperCase()">
                      {{ tag }}
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
        <div class="table-container-gradient">
          <div class="table-container pb-large">
            <table>
              <tr>
                <th
                  v-for="header in tableHeaders"
                  :key="header">
                  <button
                    class="flex color-white"
                    @click="sortBy === header ? switchSortDirection() : (sortBy = header, direction = 'descending')">
                    <div>
                      {{ header }}
                    </div>
                    <chevron-icon
                      key="1"
                      color="white"
                      class="mr-small"
                      :size="22"
                      :direction="direction === 'descending' ? 'down' : 'up'"
                      :style="sortBy === header ? '' : 'visibility: hidden;'" />
                  </button>
                </th>
              </tr>
              <tr
                v-for="item in visibleItems"
                :key="item.name"
                class="item-row">
                <td>
                  <a
                    :href="item.href"
                    target="_blank">
                    {{ item.name }}
                  </a>
                </td>
                <td class="pr-small">
                  <div v-html="item.description" />
                </td>
                <td v-if="activeTab !== 'Learning'">
                  {{ item.stars || 'N/A' }}
                </td>
                <td class="pr-small">
                  <span
                    v-for="(tag, i) in item.tags"
                    :key="tag"
                    :style="`color: ${getTagColor(tag)}`"
                    class="type-nowrap type-uppercase type-small">
                    {{ `${tag}${i !== item.tags.length - 1 ? ', ' : ''}` }}
                  </span>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div class="pb-medium bg-grey-dark" />
      </div>
    </transition>
  </div>
</template>

<script>
import ChevronIcon from './icons/ChevronIcon.vue'

export default {
  name: 'ResourceBox',
  components: {
    ChevronIcon
  },
  data: () => ({
    activeTab: '',
    sortBy: 'default',
    direction: 'descending',
    filterInputFocused: false,
    filterInput: ''
  }),
  computed: {
    tableHeaders() {
      return [
        'Name',
        'Description',
        ...(this.activeTab !== 'Learning' ? ['Stars'] : []),
        'Tags'
      ]
    },
    selectedTab() {
      return this.$tm(`resourcesList.${this.activeTab}`)
    },
    visibleItems() {
      const filtered = this.selectedTab
        .filter((item) => !this.tagFilterExactMatch || (item.tags && item.tags.some((tag) => tag.toLowerCase() === this.filterInput.toLowerCase())))
      if (this.sortBy === 'default') {
        return [
          ...filtered
            .filter(({ tags }) => tags && tags.includes('built-in'))
            .sort((a, b) => a.name > b.name ? 1 : -1),
          ...filtered
            .filter(({ tags }) => !tags || !tags.includes('built-in'))
            .sort((a, b) => a.name > b.name ? 1 : -1)]
      }
      return filtered
        .sort(this.listSortFn)
    },
    tagFilterExactMatch() {
      if (this.filterInput === '') return false
      return this.tabTags.some((tag) => tag.toLowerCase() === this.filterInput.toLowerCase())
    },
    tabTags() {
      return [...new Set(this.selectedTab.items
        .flatMap((item) => item.tags)
        .filter((tag) => tag)
        .sort((a, b) => a > b ? 1 : -1))]
    }
  },
  created() {
    this.activeTab = this.$tm('resources.tabs')[0].contentKey
  },
  watch: {
    activeTab() {
      this.filterInput = ''
    }
  },
  methods: {
    getTagColor(tagName) {
      if (tagName === 'built-in') return '#00c0b5'
      const charCodesSum = [...tagName.toLowerCase()]
        .flatMap((char) => char.charCodeAt(0) * 100)
        .reduce((int, acc) => acc + int, 0)
      const hue = charCodesSum % 360
      const saturation = charCodesSum % 49 + 51
      return `hsl(${hue}, ${saturation}%, 70%)`
    },
    listSortFn(a, b) {
      const compareA = a[this.sortBy.toLowerCase()]
      const compareB = b[this.sortBy.toLowerCase()]
      const areNumbers = typeof compareA === 'number' || typeof compareB === 'number'
      if (areNumbers) {
        if (compareA > compareB) return this.direction === 'descending' ? -1 : 1
        return this.direction === 'descending' ? 1 : -1
      } else {
        if (compareA > compareB) return this.direction === 'descending' ? 1 : -1
        return this.direction === 'descending' ? -1 : 1
      }
    },
    switchSortDirection() {
      if (this.direction === 'descending') this.direction = 'ascending'
      else this.direction = 'descending'
    }
  }
}
</script>

<style scoped>
table {
  border-collapse: separate;
  border-spacing: 0;
  width: 100%;
}
.table-container-gradient {
  position: relative;
}
.table-container-gradient::before, .table-container-gradient::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 1rem;
}
.table-container-gradient::before {
  top: 0;
  background: linear-gradient(var(--color-grey-dark), rgba(255, 255, 255, 0.001));
}
.table-container-gradient::after {
  bottom: 0;
  background: linear-gradient(rgba(255, 255, 255, 0.001), var(--color-grey-dark));
}
.table-container {
  height: 50vh;
  overflow-y: scroll;
}
th {
  border-bottom: var(--color-white) dashed 0.15rem;
}
tr:first-child {
  border-top: solid transparent 1rem;
}
th, td {
  text-align: left;
  padding: 0.5rem;
}
th:first-child, td:first-child {
  padding-left: 1.5rem;
}
th:last-child, td:last-child {
  padding-right: 1.5rem;
}
tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.1);
}
.filter-input-container, .input-suggestions {
  border: solid 1px var(--color-white);
}
.filter-input-container {
  width: fit-content;
}
.input-suggestions {
  position: absolute;
  z-index: 2;
  max-height: 20rem;
  overflow-y: scroll;
  border-top: none;
}
</style>
