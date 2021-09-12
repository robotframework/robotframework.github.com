<template>
  <div>
    <div class="bg-grey-dark color-white p-small">
      <!-- desktop tab buttons -->
      <div
        v-if="!$store.state.isMobile"
        class="row">
        <button
          v-for="({ name, key }, i) in $tm('resources.tabs')"
          :key="name"
          class="type-uppercase theme-button type-small mb-small"
          :class="[
            activeTab === key ? 'active' : '',
            i === 3 ? 'mr-none' : 'mr-medium'
          ]"
          @click="activeTab = key; showAll = false">
          {{ name }}
        </button>
      </div>
      <!-- mobile tab buttons -->
      <div
        v-else
        class="row">
        <div class="col-sm-12">
          {{ $tm('resources.mobileTitles')[0] }}
        </div>
        <button
          v-for="({ nameMobile, key }) in $tm('resources.tabs').slice(0, 2)"
          :key="nameMobile"
          class="type-uppercase theme-button type-small mr-medium"
          :class="activeTab === key ? 'active' : ''"
          @click="activeTab = key; showAll = false">
          {{ nameMobile }}
        </button>
        <div class="col-sm-12 mt-small">
          {{ $tm('resources.mobileTitles')[1] }}
        </div>
        <button
          v-for="({ nameMobile, key }) in $tm('resources.tabs').slice(2, 4)"
          :key="nameMobile"
          class="type-uppercase theme-button type-small mr-medium"
          :class="activeTab === key ? 'active' : ''"
          @click="activeTab = key; showAll = false">
          {{ nameMobile }}
        </button>
      </div>
      <transition name="opacity" mode="out-in">
        <div :key="activeTab">
          <div class="row mb-medium">
            <div
              class="col-sm-12 pt-medium"
              :class="showFiltering ? 'col-md-9' : 'col-md-12'">
              {{ selectedDescription }}
            </div>
            <div
              v-if="showFiltering"
              class="col-sm-6 col-md-3 flex bottom"
              :class="$store.state.isMobile ? '' : 'end'">
              <div class="relative mt-small">
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
          <table v-if="!$store.state.isMobile">
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
              <td v-if="showFiltering">
                {{ item.stars || 'N/A' }}
              </td>
              <td v-if="showFiltering" class="pr-small">
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
          <div
            v-else
            class="mt-small">
            <div
              v-for="(item, i) in visibleItems"
              :key="item.name"
              class="pb-xsmall pt-xsmall"
              :style="i % 2 ? 'background-color: rgba(255, 255, 255, 0.1)' : ''">
              <div class="flex between">
                <div>
                  <a
                    :href="item.href"
                    target="_blank">
                    {{ item.name }}
                  </a>
                </div>
                <div
                  v-if="item.stars"
                  class="flex middle type-small pl-2xsmall pr-2xsmall">
                  <div>
                    ⭐
                  </div>
                  <div>
                    {{ item.stars }}
                  </div>
                </div>
              </div>
              <div
                v-html="item.description"
                class="type-small" />
            </div>
          </div>
          <button
            v-if="!showAll && itemsFilteredByTag.length > 7"
            class="color-white border-white border-thin p-xsmall pb-2xsmall pt-2xsmall mt-small"
            @click="showAll = true">
            Show more
          </button>
        </div>
      </transition>
    </div>
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
    tabs: ['builtinLibraries', 'builtinTools', 'libraries', 'tools'],
    activeTab: 'builtinLibraries',
    sortBy: 'Name',
    direction: 'descending',
    filterInputFocused: false,
    filterInput: '',
    showAll: false
  }),
  computed: {
    tableHeaders() {
      return [
        'Name',
        'Description',
        ...(this.showFiltering ? ['Stars'] : []),
        ...(this.showFiltering ? ['Tags'] : [])
      ]
    },
    selectedDescription() {
      const tab = this.$tm('resources.tabs').find(({ key }) => key === this.activeTab)
      if (tab) return tab.description
      return ''
    },
    selectedList() {
      return this.$tm(`resourcesList.${this.activeTab}`)
    },
    itemsFilteredByTag() {
      return this.selectedList
        .filter((item) => !this.tagFilterExactMatch || (item.tags && item.tags.some((tag) => tag.toLowerCase() === this.filterInput.toLowerCase())))
    },
    visibleItems() {
      if (this.showAll) {
        return this.itemsFilteredByTag
          .concat()
          .sort(this.listSortFn)
      }
      return this.itemsFilteredByTag
        .concat()
        .sort(this.listSortFn)
        .slice(0, 7)
    },
    tagFilterExactMatch() {
      if (this.filterInput === '') return false
      return this.tabTags.some((tag) => tag.toLowerCase() === this.filterInput.toLowerCase())
    },
    tabTags() {
      return [...new Set(this.selectedList
        .flatMap((item) => item.tags)
        .filter((tag) => tag)
        .sort((a, b) => a > b ? 1 : -1))]
    },
    showFiltering() {
      return this.activeTab !== 'builtinLibraries' && this.activeTab !== 'builtinTools'
    }
  },
  watch: {
    activeTab() {
      this.filterInput = ''
      if (this.activeTab !== 'builtinLibraries') this.sortBy = 'Stars'
      else this.sortBy = 'Name'
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
