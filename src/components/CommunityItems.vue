<template>
  <div class="flex gap-2xsmall" style="width: calc(100% - 1rem)">
    <div class="col-sm-4 card bg-white bg-grey-dark-darkmode" :class="$store.state.isMobile ? 'p-small type-small' : 'p-medium'">
      <a :href="items[0].href" class="flex middle">
        <img
          v-if="!$store.state.isMobile"
          class="mr-xsmall"
          :src="`${publicPath}img/${items[0].imgName}.svg`"
          style="width: 3rem; height: 3rem;" />
        <h3 class="type-large mb-none">
          {{ items[0].title }}
        </h3>
      </a>
      <div class="mt-small" v-html="items[0].description" />
    </div>
    <div class="col-sm-4 card bg-white bg-grey-dark-darkmode" :class="$store.state.isMobile ? 'p-small type-small' : 'p-medium'">
      <a :href="items[1].href" class="flex middle">
        <img
          v-if="!$store.state.isMobile"
          class="mr-xsmall"
          :src="`${publicPath}img/${items[1].imgName}.svg`"
          style="width: 3rem; height: 3rem;" />
        <h3 class="type-large mb-none">
          {{ items[1].title }}
        </h3>
      </a>
      <div class="mt-small" v-html="items[1].description" />
    </div>
    <div class="col-sm-4 card bg-white bg-grey-dark-darkmode" :class="$store.state.isMobile ? 'p-small type-small' : 'p-medium'">
      <h3 class="type-large mb-small">
        Others
      </h3>
      <div
        v-for="link in items.slice(3)"
        :key="link.href"
        class="mb-3xsmall">
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
          href: 'https://rf-invite.herokuapp.com/',
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
