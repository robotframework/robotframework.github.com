<template>
  <div>
    <div
      class="bg-grey-dark color-white card"
      :class="$store.state.isMobile ? 'p-small pt-medium sharp' : 'p-large'">
      <div class="row">
        <button
          v-for="({ name, key }, i) in $tm('resources.tabs')"
          :key="name"
          class="type-uppercase theme type-small mb-small"
          :class="[
            activeTab === key ? 'active' : '',
            i === 3 ? 'mr-none' : 'mr-small'
          ]"
          @click="activeTab = key; showAll = false">
          {{ name }}
        </button>
      </div>
      <transition name="opacity" mode="out-in">
        <div :key="activeTab">
          <div class="row mb-medium">
            <div
              class="col-sm-12 col-md-9 pt-medium"
              :class="$store.state.isMobile ? '' : 'pr-large'"
              v-html="selectedDescription" />
            <div
              class="col-sm-12 col-md-3 flex bottom"
              :class="$store.state.isMobile ? '' : 'end'">
              <div class="relative" style="width: 100%;">
                <div class="flex middle card border-white border-thin mt-medium" style="width: 100%;">
                  <input
                    v-model="filterInput"
                    ref="tagInput"
                    id="tags-filter-input"
                    :placeholder="'Filter by tag'"
                    class="p-2xsmall bg-grey-dark font-body"
                    :style="`color: ${tagFilterExactMatch ? getTagColor(filterInput) : '#f5f5f5'};`"
                    style="width: 100%;"
                    @focus="tagsDropdownShown = true" />
                    <button
                      class="p-3xsmall pr-2xsmall color-white"
                      :style="filterInput === '' ? 'visibility: hidden' : ''"
                      @click="filterInput = ''">
                      X
                    </button>
                </div>
                <transition name="opacity">
                  <div
                    v-if="tagsDropdownShown && tabTags
                        .filter((tag) => tag.includes(filterInput.toLowerCase()) && tag !== filterInput.toLowerCase()).length"
                    class="input-suggestions mt-2xsmall p-2xsmall bg-grey-dark border-white border-thin card">
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
                  :href="item.href">
                  {{ item.name }}
                </a>
              </td>
              <td class="pr-small">
                <div v-html="item.description" />
              </td>
              <td v-if="activeTab !== 'builtin'">
                {{ item.stars !== null ? item.stars : 'N/A' }}
              </td>
              <td class="pr-small">
                <span
                  v-for="(tag, i) in item.tags"
                  :key="tag"
                  :style="`color: ${getTagColor(tag)}`"
                  class="type-nowrap type-uppercase type-small cursor-pointer"
                  @click="filterInput = tag.toUpperCase()">
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
              class="p-xsmall"
              style="margin-left: -1rem; margin-right: -1rem;"
              :style="i % 2 ? 'background-color: rgba(255, 255, 255, 0.1)' : ''">
              <div class="flex between">
                <div>
                  <a
                    :href="item.href">
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
                class="type-small mt-2xsmall" />
            </div>
          </div>
          <div class="flex" :class="$store.state.isMobile ? 'center' : ''">
            <button
              v-if="!showAll && itemsFilteredByTag.length > 7"
              class="stroke type-uppercase mt-small type-small mb-xsmall"
              @click="showAll = true">
              Show more
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import ChevronIcon from './icons/ChevronIcon.vue'
import { stars } from '../content'

export default {
  name: 'ResourceBox',
  components: {
    ChevronIcon
  },
  data: () => ({
    tabs: ['libraries', 'builtin', 'tools'],
    activeTab: 'libraries',
    sortBy: 'Stars',
    direction: 'descending',
    tagsDropdownShown: false,
    filterInput: '',
    showAll: false,
    stars: [],
    eventSent: false
  }),
  computed: {
    tableHeaders() {
      return [
        'Name',
        'Description',
        ...(this.activeTab !== 'builtin' ? ['Stars'] : []),
        'Tags'
      ]
    },
    selectedDescription() {
      const tab = this.$tm('resources.tabs').find(({ key }) => key === this.activeTab)
      if (tab) return tab.description
      return ''
    },
    selectedList() {
      return this.$tm(`resourcesList.${this.activeTab}`)
        .map((item) => ({
          ...item,
          stars: this.getStarCount(item.href)
        }))
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
      return this.activeTab !== 'builtin'
    }
  },
  watch: {
    activeTab() {
      this.filterInput = ''
      if (this.activeTab !== 'builtin') this.sortBy = 'Stars'
      else this.sortBy = 'Name'
      if (!this.eventSent) {
        window.plausible('Interact', { props: { element: 'Resources' } })
        this.eventSent = true
      }
      const newUrl = `${window.location.href.split('?')[0].split('#')[0]}?tab=${this.activeTab}#resources`
      history.replaceState(null, null, newUrl)
    },
    showAll() {
      if (!this.eventSent) {
        window.plausible('Interact', { props: { element: 'Resources' } })
        this.eventSent = true
      }
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
    },
    getStarCount(href) {
      const key = this.stars.find(({ name }) => href.toLowerCase().includes(name.toLowerCase()))
      if (key) return key.stars
      return null
    },
    onClick({ target }) {
      if (this.$refs.tagInput && !this.$refs.tagInput.contains(target)) this.tagsDropdownShown = false
    }
  },
  created() {
    // if url contains searchParam, open specific tab
    if (window.location.hash !== '#resources') return
    const param = new URLSearchParams(window.location.search)
    const tab = param.get('tab')
    if (!tab) return
    this.activeTab = tab
  },
  mounted() {
    this.stars = stars()
    document.addEventListener('click', this.onClick)
  },
  beforeUnmount() {
    document.removeEventListener('click', this.onClick)
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
  padding-left: 0.5rem;
}
th:last-child, td:last-child {
  padding-right: 1.5rem;
}
tr:nth-child(even) {
  background-color: rgba(255, 255, 255, 0.05);
}
.filter-input-container {
  width: fit-content;
}
.input-suggestions {
  position: absolute;
  z-index: 2;
  max-height: 13.5rem;
  overflow-y: scroll;
}
</style>
