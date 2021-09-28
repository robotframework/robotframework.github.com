<template>
  <div class="bg-grey-light rounded row p-medium">
    <div class="row col-md-4">
      <div
        v-for="link in [items[0], items[1]]"
        :key="link.imgName"
        class="flex col-sm-12"
        :class="$store.state.isMobile ? 'pl-small pr-small' : ''">
        <a :href="link.href" aria-hidden="true" tabindex="-1">
          <img
            :src="`${publicPath}img/${link.imgName}.svg`"
            style="width: 3rem; height: 3rem; transform: translateY(0.25rem);" />
        </a>
        <div class="ml-xsmall">
          <a :href="link.href" :name="`${link.title}`">
            <h3>
              {{ link.title }}
            </h3>
          </a>
          <div class="mt-2xsmall">
            {{ link.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div
        class="flex col-sm-12"
        :class="$store.state.isMobile ? 'pl-small pr-small' : ''">
        <a :href="items[2].href" aria-hidden="true" tabindex="-1">
          <img :src="`${publicPath}img/${items[2].imgName}.svg`" style="width: 3rem; height: 3rem; transform: translateY(0.25rem);" />
        </a>
        <div class="ml-xsmall">
          <a :href="items[2].href" :name="`${items[2].title}`">
            <h3>
              {{ items[2].title }}
            </h3>
          </a>
          <div class="mt-2xsmall">
            {{ items[2].description }}
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-4 pl-medium">
      <h3 class="color-grey-dark mb-2xsmall">
        Other
      </h3>
      <div
        v-for="link in items.slice(3)"
        :key="link.href"
        class="mb-2xsmall">
        <a :href="link.href" :name="`${link.title}`">
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
          imgName: 'Calendar',
          href: 'https://calendar.google.com/event?action=TEMPLATE&tmeid=am83cGl0dDN2dG1rNTJ0YWZnaHU0aGJwaWVfMjAyMTA4MjdUMTMwMDAwWiBjX2N2bzZrcTNzOTcybzc2MzN1Mm5mNnUxdjdvQGc&tmsrc=c_cvo6kq3s972o7633u2nf6u1v7o%40group.calendar.google.com&scp=ALL',
          title: this.$t('community.links.openSpace.title'),
          description: this.$t('community.links.openSpace.description')
        }, {
          href: 'https://www.facebook.com/robotframeworkofficial',
          title: 'Facebook'
        }, {
          href: 'http://twitter.com/robotframework',
          title: 'Twitter'
        }, {
          href: 'https://www.linkedin.com/groups/3710899/',
          title: 'LinkedIn'
        }, {
          href: 'http://groups.google.com/group/robotframework-users',
          title: 'Community mailing list'
        }, {
          href: 'http://groups.google.com/group/robotframework-announce',
          title: 'Releases mailing list'
        }
      ]
    }
  }
}
</script>
