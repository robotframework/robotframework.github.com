<template>
  <div
    class="inner-news-container card bg-secondary"
    :class="expanded ? 'expanded' : ''"
    :style="{opacity: news.length === 0 ? 0.5 : 1}"
    ref="container">
    <div class="flex between p-medium">
      <h2 class="type-large color-text mb-none">
        News
      </h2>
      <a href="https://seu2.cleverreach.com/f/362604-365504/" class="newsletter">
        Subscribe to newsletter
      </a>
    </div>
    <h3 v-if="loading" class="type-medium px-small">
      loading news...
    </h3>
    <template v-else>
      <article
        v-for="entry in news"
        :key="entry.id"
        class="flex border-bottom-bg p-medium">
        <div class="col-sm-3 pr-xsmall">
          <img v-if="entry.image" :src="`${entry.image.file.url}${imgUrlParams}`" class="main block" />
        </div>
        <div class="col-sm-9 pl-xsmall">
          <a v-if="entry.link" :href="entry.link" target="blank" class="mb-none line-height-1">
            <h3 class="mb-xsmall line-height-1 font-body">{{ entry.title }}</h3>
          </a>
          <h3 v-else class="mb-none line-height-1 font-body">{{ entry.title }}</h3>
          <div v-if="entry.body" class="mb-none font-small" style="line-height: 1.25;" v-html="parseBody(entry.body)" />
          <div class="type-small line-height-1">{{ entry.date }}</div>
        </div>
      </article>
    </template>
    <button v-if="!expanded" class="expand color-text" @click="expand($event.target.parentElement)">
      Expand
    </button>
  </div>
</template>

<script>
import { getNews } from '../js/contentfulClient'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
export default {
  data: () => ({
    expanded: false,
    news: [],
    imgUrlParams: '?w=300&h=300&fit=fill'
  }),
  computed: {
    loading() {
      return this.news.length === 0
    }
  },
  async mounted() {
    this.news = (await getNews()).sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return -1
      return 1
    })
  },
  methods: {
    parseBody(body) {
      return documentToHtmlString(body, {
        renderNode: {
          paragraph: (node, next) => `<p class="mb-2xsmall">${next(node.content)}</p>`,
          blockquote: (node, next) => `<blockquote class="mb-2xsmall border-left-white border-thin pl-2xsmall">${next(node.content)}</blockquote>`
        }
      })
    },
    expand(target) {
      this.expanded = true
      setTimeout(() => {
        const bottomVisible = (window.innerHeight - target?.getBoundingClientRect()?.bottom) > 30
        if (!bottomVisible) this.$refs.container.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }, 1)
    }
  }
}
</script>

<style scoped>
  .inner-news-container {
    position: relative;
    overflow: hidden;
    transition: opacity 0.3s background-color 0.2s;
    height: min(40rem, 70vh);

    &.expanded {
      overflow: auto;
      height: 80vh;
    }
  }
  .inner-news-container:not(.expanded)::after {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    content: '';
    pointer-events: none;
    background: linear-gradient(transparent 80%, #ccc 100%);
    @media (prefers-color-scheme: dark) {
      background: linear-gradient(transparent 80%, #1a1a1a 100%);
    }
  }
  img.main {
    width: 100%;
    border-radius: 0.25rem;
  }
  .expand {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding-block: 0.75rem;
    font-size: 1.25rem;
    backdrop-filter: blur(2px);
    z-index: 2;
  }
</style>
