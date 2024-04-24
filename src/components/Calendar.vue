<template>
  <div
    class="inner-calendar-container card color-bg-lighter"
    :class="expanded ? 'expanded' : 'minified'"
    ref="container">
    <div class="flex between px-medium py-xsmall">
      <h2 class="type-xlarge color-text mb-none">
        Events
      </h2>
      <button class="flex middle tab color-text type-small" :class="filtersOpen ? 'active' : ''" @click="filtersOpen = !filtersOpen">
        <div>
          Filter
        </div>
        <filter-icon color='text' class="ml-2xsmall block" size="1rem" />
      </button>
    </div>
    <div v-if="filtersOpen" class="p-medium">
      <fieldset class="row mb-xsmall">
        <legend>Types</legend>
        <div class="flex middle col-sm-6">
          <input type="checkbox" id="conference" v-model="show.types.Conference" />
          <label for="conference" class="ml-2xsmall">Conference</label>
        </div>
        <div class="flex middle col-sm-6">
          <input type="checkbox" id="meetup" v-model="show.types['Meet-up']" />
          <label for="meetup" class="ml-2xsmall">Meet-up</label>
        </div>
        <div class="flex middle col-sm-6">
          <input type="checkbox" id="tutorial" v-model="show.types.Tutorial" />
          <label for="tutorial" class="ml-2xsmall">Tutorial</label>
        </div>
        <div class="flex middle col-sm-6">
          <input type="checkbox" id="workshop" v-model="show.types.Workshop" />
          <label for="workshop" class="ml-2xsmall">Workshop</label>
        </div>
      </fieldset>
      <div class="flex middle col-sm-12">
        <input type="checkbox" id="past" v-model="show.past" />
        <label for="past" class="ml-2xsmall">Show past events</label>
      </div>
      <div class="flex middle col-sm-12">
        <input type="checkbox" id="official" v-model="show.officialOnly" />
        <label for="official" class="ml-2xsmall">Show only official events</label>
      </div>
    </div>
    <!-- <div class="px-medium pb-small border-bottom-bg">
      <input placeholder="Search by name, date, location..." class="search" />
    </div> -->
    <h3 v-if="loading" class="type-medium px-small">
      loading events...
    </h3>
    <template v-else>
      <article
        v-for="(event, i) in filteredEvents"
        :key="event.id"
        :ref="`article-${i}`"
        class="px-medium py-small border-bottom-bg">
        <div class="badge">
          {{ event.eventType }}
        </div>
        <a :href="event.link" target="_blank" rel="noreferrer nofollow" class="title weight-bold mt-2xsmall">
          <new-tab-icon color="theme" class="mr-2xsmall" style="transform: translateY(2px)" />
          <span>
            {{ event.eventName }}
          </span>
        </a>
        <div class="flex middle">
          <calendar-icon size="1rem" color="white" class="mr-2xsmall" style="transform: translateY(-2px)" />
          {{ getDateString(new Date(event.date), new Date(event.dateEnd)) }}
        </div>
        <div v-if="event.location.trim() !== ''" class="flex">
          <marker-icon class="mr-2xsmall" size="1rem" style="transform: translateY(3px)" />
          {{ event.location }}
        </div>
        <div v-if="event.online" class="flex middle">
          <globe-icon class="mr-2xsmall" size="0.85rem" style="transform: translateY(-1px)" />
          Available Online
        </div>
        <div v-if="event.hostedByFoundation" class="flex middle">
          <robot-icon size="1rem" class="mr-2xsmall" style="transform: translateY(-2px)" />
          Hosted by Foundation
        </div>
        <details v-if="event.description && event.description.trim() !== ''">
          <summary class="color-theme cursor-pointer flex middle" @click="showInfo($event.target.parentElement)">
            <chevron-icon color="theme" direction="right" class="chevron" size="1.25rem" />
          </summary>
          <div v-html="parseDescription(event.description || '')" class="description" />
        </details>
      </article>
    </template>
    <button v-if="!expanded" class="expand color-text" @click="expand()">
      Expand
    </button>
  </div>
</template>

<script>
import { getEvents, monthNames } from '../js/contentfulClient'
import { getDate, getMonth, getYear, isPast, isSameDay } from 'date-fns'
import { CalendarIcon, NewTabIcon, FilterIcon, RobotIcon, MarkerIcon, GlobeIcon, ChevronIcon } from './icons'
import { marked } from 'marked'

export default {
  data: () => ({
    expanded: false,
    filtersOpen: false,
    show: {
      types: {
        Conference: true,
        Workshop: true,
        'Meet-up': true,
        Tutorial: true
      },
      past: false,
      officialOnly: false
    },
    events: [],
    imgUrlParams: '?w=500&h=500',
    selectedDate: new Date()
  }),
  components: {
    CalendarIcon,
    FilterIcon,
    RobotIcon,
    NewTabIcon,
    MarkerIcon,
    GlobeIcon,
    ChevronIcon
  },
  computed: {
    loading() {
      return this.events.length === 0
    },
    selectedMonthName() {
      const index = getMonth(this.selectedDate)
      return monthNames[index]
    },
    filteredEvents() {
      const filtered = this.events
        .filter(({ eventType, date }) => {
          if (!this.show.types.Conference && eventType === 'Conference') return false
          if (!this.show.types['Meet-up'] && eventType === 'Meet-up') return false
          if (!this.show.types.Workshop && eventType === 'Workshop') return false
          if (!this.show.types.Tutorial && eventType === 'Tutorial') return false
          if (!this.show.past && isPast(new Date(date))) return false
          return true
        })
      return filtered
    }
  },
  async mounted() {
    this.events = (await getEvents()).sort((a, b) => {
      if (new Date(a.date) < new Date(b.date)) return -1
      return 1
    })
  },
  methods: {
    parseDescription: (t) => marked.parse(t),
    getDateString(date, dateEnd) {
      const monthIndex = getMonth(date)
      const day = getDate(date)
      // 25 May 2024
      if (isNaN(dateEnd) || isSameDay(date, dateEnd)) return `${day} ${monthNames[monthIndex]} ${getYear(date)}`
      const monthIndexEnd = getMonth(dateEnd)
      const dayEnd = getDate(dateEnd)
      // 25-27 May 2024
      if (monthIndex === monthIndexEnd) return `${day}-${dayEnd} ${monthNames[monthIndex]} ${getYear(date)}`
      // 25 May - 02 Jun 2024
      return `${day} ${monthNames[monthIndex]} - ${dayEnd} ${monthNames[monthIndexEnd]} ${getYear(date)}`
    },
    isOverflown(ref) {
      this.$nextTick(() => {
        const el = this.$refs[ref]
        if (!el) return undefined
        const { clientWidth, clientHeight, scrollWidth, scrollHeight } = el
        return scrollHeight > clientHeight || scrollWidth > clientWidth
      })
    },
    expand() {
      if (!this.expanded) {
        setTimeout(() => {
          this.$refs.container.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }, 1)
      }
      this.expanded = true
    },
    showInfo(detailsElement) {
      this.expand()
      setTimeout(() => {
        detailsElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 1)
    }
  }
}
</script>

<style scoped>
  .tab {
    transition: color 0.2s;
  }
  .tab:hover {
    color: var(--color-theme);
  }
  .search {
    width: 100%;
    padding: 0.25rem;
    background-color: var(--color-bg);
    color: var(--color-text);
  }
  .inner-calendar-container {
    position: relative;
    overflow: hidden;
    transition: opacity 0.3s;
    height: min(40rem, 70vh);

    &.expanded {
      overflow: auto;
      height: 80vh;
    }
  }

  .title {
    display: block;
    text-wrap: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--type-large);
    line-height: 1.5;
  }

  .description {
    margin-top: 0.25rem;
    font-size: 1rem;
  }
  .description:deep p {
    margin-bottom: 0.5rem;
  }
  .description:deep p:last-of-type {
    margin-bottom: 0;
  }
  .description:deep h2 {
    font-size: var(--type-large);
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  img.main {
    width: 100%;
    border-radius: 0.25rem;
  }
  .badge {
    width: fit-content;
    height: fit-content;
    padding: 0.25rem 0.5rem;
    line-height: 1;
    font-size: var(--type-small);
    border-radius: 0.5rem;
    border: 1px solid var(--color-theme);
    background-color: var(--color-bg-lighter);
  }
  .expand {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding-block: 0.75rem;
    background-color: color-mix(in srgb, var(--color-bg) 70%, transparent);
    font-size: 1.25rem;
    backdrop-filter: blur(2px);
  }
  summary {
    display: block;
  }
  summary::after {
    content: 'More info';
    padding-left: 0.25rem;
    font-size: 1rem;
    line-height: 1;
  }
  .chevron {
    transform: translateY(4px) rotate(180deg) !important;
  }
  details[open] {
    summary::after {
      content: 'Hide info'
    }
    .chevron {
      transform: translateY(4px) rotate(270deg) !important;
    }
  }
</style>
