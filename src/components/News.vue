<template>
  <transition appear name="opacity">
    <div v-if="height" class="news-container card" :style="{height: `${height}px`}">
      <h2 style="letter-spacing: 0.125rem; position: sticky; top: 0;" class="type-center type-large mb-none color-black bg-theme">
        NEWS
      </h2>
      <div class="bg-grey-dark pt-small">
        <div v-if="news.length === 0">
          loading...
        </div>
        <template v-else>
          <article
            v-for="entry in news"
            :key="entry.id"
            class="pb-small px-small">
            <template v-if="entry.link">
              <a :href="entry.link" target="blank" class="mb-none line-height-1">
                <h3 class="mb-none line-height-1 font-body">{{ entry.title }}</h3>
              </a>
            </template>
            <h3 v-else class="mb-none line-height-1 font-body">{{ entry.title }}</h3>
            <div class="type-small">{{ entry.date }}</div>
            <template v-if="entry.image">
              <img :src="`${entry.image.file.url}${imgUrlParams}`" class="main" />
            </template>
            <div v-if="entry.body" class="mb-none" style="line-height: 1.25;" v-html="parseBody(entry.body)" />
          </article>
        </template>
      </div>
    </div>
  </transition>
</template>

<script>
import { getNews } from '../js/contentfulClient'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
export default {
  data: () => ({
    news: [],
    imgUrlParams: '?w=500&h=500',
    height: 0
  }),
  async mounted() {
    const introEl = document.getElementById('intro-text')
    setTimeout(() => {
      this.height = introEl.offsetHeight - 16
    }, 500)
    this.news = (await getNews()).sort((a, b) => {
      if (new Date(a.date) > new Date(b.date)) return -1
      return 1
    })
  },
  methods: {
    parseBody(body) {
      return documentToHtmlString(body, {
        renderNode: {
          paragraph: (node, next) => `<p class="mb-2xsmall ">${next(node.content)}</p>`,
          blockquote: (node, next) => `<blockquote class="mb-2xsmall border-left-white border-thin pl-2xsmall">${next(node.content)}</blockquote>`
        }
      })
    }
  }
}
</script>

<style scoped>
  img.main {
    width: 100%;
    border-radius: 0.25rem;
  }
  .news-container {
    overflow: auto;
    border-radius: 0.25rem;
    background-color: var(--color-bg-alt);
    color: var(--color-white);
  }
</style>
