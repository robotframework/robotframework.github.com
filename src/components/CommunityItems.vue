<template>
  <div
    class="bg-white bg-grey-dark-darkmode row card"
    :class="$store.state.isMobile ? 'pt-medium pb-medium' : 'p-large'">
    <div class="row col-md-5 pr-medium">
      <div
        v-for="link in [items[0]]"
        :key="link.imgName"
        class="flex col-sm-12"
        :class="$store.state.isMobile ? 'pl-small pr-small mb-medium' : ''">
        <a :href="link.href" aria-hidden="true" tabindex="-1">
          <img
            :src="`${publicPath}img/${link.imgName}.svg`"
            style="width: 3rem; height: 3rem; transform: translateY(0.25rem);" />
        </a>
        <div class="ml-xsmall">
          <a :href="link.href" :name="`${link.title}`" target="_blank">
            <h3>
              {{ link.title }}
            </h3>
          </a>
          <div class="mt-2xsmall" v-html="link.description" />
        </div>
      </div>
    </div>
    <div class="col-md-5 pr-medium">
      <div
        class="flex col-sm-12"
        :class="$store.state.isMobile ? 'pl-small pr-small' : ''">
        <a :href="items[1].href" aria-hidden="true" tabindex="-1">
          <img :src="`${publicPath}img/${items[1].imgName}.svg`" style="width: 3rem; height: 3rem; transform: translateY(0.25rem);" />
        </a>
        <div class="ml-xsmall">
          <a :href="items[1].href" :name="`${items[1].title}`" target="_blank">
            <h3>
              {{ items[1].title }}
            </h3>
          </a>
          <div class="mt-2xsmall" v-html="items[1].description" />
        </div>
      </div>
    </div>
    <div
      class="col-md-2 pl-medium"
      :style="$store.state.isMobile ? 'padding-left: 4.7rem; margin-top: 1rem;' : ''">
      <h3 class="color-grey-dark color-white-darkmode mb-2xsmall">
        Other
      </h3>
      <div
        v-for="link in items.slice(3)"
        :key="link.href"
        class="mb-2xsmall">
        <a :href="link.href" :name="`${link.title}`" target="_blank">
          {{ link.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommunityLinks',
  data: () => ({
    publicPath: process.env.BASE_URL
  }),
  computed: {
    items() {
      return [
        {
          imgName: 'RF',
          href: 'http://forum.robotframework.org/',
          title: this.$t('community.links.forum.title'),
          description: this.$t('community.links.forum.description')
        }, {
          imgName: 'Slack',
          href: 'https://slack.robotframework.org',
          title: this.$t('community.links.slack.title'),
          description: this.$t('community.links.slack.description')
        }, {
          href: 'http://twitter.com/robotframework',
          title: 'Twitter'
        }, {
          href: 'https://www.linkedin.com/groups/3710899/',
          title: 'LinkedIn'
        }, {
          href: 'https://www.facebook.com/robotframeworkofficial',
          title: 'Facebook'
        }, {
          href: 'http://groups.google.com/group/robotframework-users',
          title: 'Mailing list'
        }
      ]
    }
  }
}
</script>
