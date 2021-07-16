<template>
  <div class="bg-grey-dark color-white">
    <div class="row mb-medium p-medium">
      <button
        v-for="{ name } in $tm('resources.content')"
        :key="name"
        class="type-uppercase mr-small type-large"
        :class="activeTab === name ? 'color-theme type-underline' : 'color-white'"
        @click="activeTab = name">
        {{ name }}
      </button>
    </div>
    <transition name="opacity" mode="out-in">
      <div :key="activeTab">
        <div class="row mb-medium">
          <div class="col-sm-3 pl-medium">
            <div class="relative">
              <div class="flex middle filter-input-container">
                <input
                  v-model="filterInput"
                  id="keywords-filter-input"
                  :placeholder="'Filter by keyword'"
                  class="p-2xsmall bg-grey-dark font-body"
                  :style="`color: ${getKeywordColor(filterInput)}`"
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
                  v-if="filterInputFocused && activeContentKeywords
                      .filter((keyword) => keyword.includes(filterInput.toLowerCase()) && keyword !== filterInput.toLowerCase()).length"
                  class="input-suggestions bg-grey-dark p-2xsmall">
                  <div
                    v-for="keyword in activeContentKeywords
                      .filter((keyword) => keyword.includes(filterInput.toLowerCase()) && keyword !== filterInput.toLowerCase())"
                    :key="keyword">
                    <button
                      :style="`color: ${getKeywordColor(keyword)}`"
                      class="type-uppercase"
                      @click="filterInput = keyword.toUpperCase()">
                      {{ keyword }}
                    </button>
                  </div>
                </div>
              </transition>
            </div>
          </div>
          <div class="col-sm-9 pr-medium">
            {{ activeContent.description }}
          </div>
        </div>
        <div class="p-medium pt-none table-container">
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
                    :size="22"
                    :direction="direction === 'descending' ? 'down' : 'up'"
                    :style="sortBy === header ? '' : 'visibility: hidden;'" />
                </button>
              </th>
            </tr>
            <tr class="dotted-divider mb-small" />
            <tr
              v-for="item in activeContent.items"
              :key="item.name">
              <td class="pr-small pt-3xsmall pb-3xsmall">
                {{ item.name }}
              </td>
              <td class="pr-small">
                {{ item.description }}
              </td>
              <td>
                {{ item.stars || 'N/A' }}
              </td>
              <td class="pr-small">
                <span
                  v-for="(keyword, i) in item.keywords"
                  :key="keyword"
                  :style="`color: ${getKeywordColor(keyword)}`"
                  class="type-nowrap type-uppercase type-small">
                  {{ `${keyword}${i !== item.keywords.length - 1 ? ', ' : ''}` }}
                </span>
              </td>
            </tr>
          </table>
        </div>
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
    sortBy: '',
    direction: 'descending',
    filterInputFocused: false,
    filterInput: ''
  }),
  computed: {
    tableHeaders() {
      return [
        'Name',
        'Description',
        'Stars',
        'Keywords'
      ]
    },
    activeContent() {
      const content = this.$tm('resources.content')
        .find(({ name }) => name === this.activeTab)
      const itemsSortedAndFiltered = content.items
        .filter((item) => !item.keywords || item.keywords.some((keyword) => keyword.includes(this.filterInput.toLowerCase())))
        .sort(this.listSortFn)
      return {
        ...content,
        items: itemsSortedAndFiltered
      }
    },
    activeContentKeywords() {
      return [...new Set(this.activeContent.items
        .flatMap((item) => item.keywords)
        .sort((a, b) => a > b ? 1 : -1))]
    }
  },
  created() {
    this.activeTab = this.$tm('resources.content')[0].name
    this.sortBy = this.tableHeaders[0]
  },
  methods: {
    getKeywordColor(keywordName) {
      const charCodesSum = [...keywordName.toLowerCase()]
        .flatMap((char) => char.charCodeAt(0) * 100)
        .reduce((int, acc) => acc + int, 0)
      const hue = charCodesSum % 360
      const saturation = charCodesSum % 49 + 51
      return `hsl(${hue}, ${saturation}%, 60%)`
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
.dotted-divider {
  border-top: var(--color-white) dashed 0.15rem;
  border-bottom: transparent solid 1.5rem;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
}
.table-container {
  max-height: 50vh;
  overflow-y: scroll;
}
th, td {
  text-align: left;
  padding-left: 0;
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
  max-height: 20rem;
  overflow-y: scroll;
  border-top: none;
}
</style>
