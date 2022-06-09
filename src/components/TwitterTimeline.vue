<template>
  <div class="card bg-grey-dark p-small">
    <accessibility-link label="Skip twitter timeline" go-to="getting-started" />
    <!-- eslint-disable -->
    <div class="flex center middle">
      <twitter-icon />
    </div>
    <div v-if="timelineTweets && referenceTweets">
      <div
        v-for="{created_at, id, quotedTweet, text, retweet } in timelineTweets"
        :key="id"
        class="tweet mb-small pb-small border-bottom-white border-thin">
        <div class="type-small">
          <div class="flex middle">
            <a class="flex font-title type-xsmall mb-2xsmall" :href="`https://twitter.com/robotframework/status/${id}`" target="_blank" rel="noopener noreferrer">
              <robot-icon color="white" class="mr-2xsmall" />{{ format(new Date(created_at), 'dd-MM-yyyy') }}
            </a>
            <template v-if="retweet">
              <retweet-icon size="0.8rem" class="mx-2xsmall" />
              <div v-html="`${retweet}:`" />
            </template>
          </div>
          <div v-html="text" class="tweet-text-container" />
          <div v-if="quotedTweet" class="border-left-white border-thin ml-2xsmall pl-2xsmall">
            <div v-html="quotedTweet.text" class="tweet-text-container" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { format } from 'date-fns'
import DOMPurify from 'dompurify'
import { TwitterIcon, RetweetIcon, RobotIcon } from 'Icons'
import AccessibilityLink from './AccessibilityLink.vue'

export default {
  components: {
    TwitterIcon,
    RetweetIcon,
    AccessibilityLink,
    RobotIcon
  },
  data: () => ({
    twitterHeight: 500,
    timelineTweets: null,
    referenceTweets: null,
    mentionedUsers: null
  }),
  created() {
    fetch('https://j88yg1e6zj.execute-api.eu-central-1.amazonaws.com/timeline')
      .then(res => res.json())
      .then(({ data, includes }) => {
        console.log(data, includes)
        this.referenceTweets = includes.tweets || []
        this.mentionedUsers = includes.users || []
        return data
      })
      .then((tweets) => Promise.all(tweets.map((tweet) => this.parseTweet(tweet))))
      .then((parsed) => {
        console.log(parsed)
        this.timelineTweets = parsed
      })
  },
  mounted() {
    setTimeout(() => {
      this.twitterHeight = this.$refs.body.offsetHeight - 32
    }, 200)
    window.addEventListener('resize', () => {
      this.twitterHeight = this.$refs.body.offsetHeight - 32
    })
  },
  methods: {
    format,
    DOMPurify,
    async parseTweet(tweet) {
      const text = await this.parseTweetText(tweet)
      const quotedTweet = await this.getQuotedTweet(tweet)
      return {
        ...tweet,
        text,
        quotedTweet,
        retweet: tweet.text.slice(0, 3) === 'RT ' ? this.getProfileLinkByHandle(tweet.text.split(':')[0].slice(3)) : null
      }
    },
    async parseTweetText(tweet) {
      const { referenced_tweets = [] } = tweet // eslint-disable-line
      let { text = '' } = tweet

      // remove RT from text if exists
      if (text.slice(0, 3) === 'RT ') text = text.slice(text.indexOf(':') + 2)

      // HTML to ASCII
      const replaceThese = [['&amp;', '&'], ['&lt;', '<'], ['&gt;', '>'], ['&quot;', '"'], ['&#39;', '\''], ['\n', ' <br> ']]
      replaceThese.forEach(([html, char]) => {
        text = text.replaceAll(html, char)
      })

      // links with full names to mentions
      const handles = text.replace('!', ' ').split(' ').filter((word) => word[0] === '@' && word.length > 1)
      handles.forEach((handle) => {
        text = text.replaceAll(handle, this.getProfileLinkByHandle(handle))
      })

      // links to hashtags
      const splitByHashTags = text.split(/(#[a-zA-Z0-9_]+)/)
      text = splitByHashTags.map((part) => {
        if (part[0] === '#') return `<a href="https://twitter.com/hashtag/${part.slice(1)}" target="_blank" rel="noopener noreferrer">${part}</a>`
        return part
      }).join('')

      // exorcise evil links
      const evilLinks = text.match(/(https:\/\/t.co\/[^\s]+)/g) || []
      const stringToQuoteLink = (str) => `<div class="pl-small mt-2xsmall"><a href="${str}" target="_blank" rel="noopener noreferrer" class="type-no-underline color-white font-title type-xsmall">${str.match(/(?<=com\/)[\s\S]+(?=\/status)/g)[0]} <span class="type-underline color-theme">${format(new Date(this.referenceTweets.find(({ id }) => str.includes(id)).created_at), 'dd-MM-yyyy')}</span></a></div>`
      const stringToLink = (str) => `<a href="${str}" target="_blank" rel="noopener noreferrer">${str}</a>`
      text = await Promise.all(evilLinks.map((evilLink) => this.getHonestLink(evilLink)))
        .then((links) => {
          links.forEach(({ honest, evil }, i, self) => {
            // visually reformat last link from tweets with quotes (its a link to the quoted tweet)
            const isQuoteLink = referenced_tweets[0]?.type === 'quoted' && i + 1 === self.length
            text = text.replace(evil, isQuoteLink ? stringToQuoteLink(honest) : stringToLink(honest))
          })
        })
        .then(() => DOMPurify.sanitize(text, { ADD_ATTR: ['target'] }))

      return text
    },
    async getQuotedTweet(tweet) {
      if (!tweet.referenced_tweets) return null
      const referenceTweet = this.referenceTweets
        .find(({ id }) => tweet.referenced_tweets
          .find((listItem) => listItem.id === id && listItem.type === 'quoted'))
      if (referenceTweet) return this.parseTweet(referenceTweet)
      return null
    },
    getHonestLink(evilLink) {
      return new Promise((resolve, reject) => {
        fetch(evilLink)
          .then((res) => res.text())
          .then((text) => resolve({ honest: text.match(/(?<=URL=)(.*)(?=">)/)[0], evil: evilLink }))
          .catch((err) => reject(err))
      })
    },
    getNameByHandle(handle) {
      return this.mentionedUsers.find(({ username }) => username === (handle[0] === '@' ? handle.slice(1) : handle)).name
    },
    getProfileLinkByHandle(handle) {
      return `<a href="https://twitter.com/${handle[0] === '@' ? handle.slice(1) : handle}" target="_blank">${this.getNameByHandle(handle)}</a>`
    }
  }
}
</script>

<style>
  .tweet br {
    display: block;
    margin-top: 0.5rem;
    content: ' ';
  }
  .tweet-text-container {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
