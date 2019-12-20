<template>
  <div>
    <div v-if="data" class="row justify-content-between no-gutters">
      <div class="col-md-5 col-lg-4 order-1 textblock-left p-3">
        <h1 v-html="data.header"/>
      </div>
      <div v-if="data.header != 'Examples'" class="col order-2 textblock-right ml-1 p-3">
        <div v-html="data.text"/>
      </div>
      <div v-else v-html="data.text" class="col order-2 block-text textblock-right ml-1 p-3"/>

      <div v-if="data.twitter == true" class="col-md-12 col-lg-3 order-3 textblock-right ml-1 p-3" style="max-height: 600px; overflow: scroll">
        <twitter-timeline class="p-xs-5 p-lg-0" id="robotframework" widget-class="twitterprofile" sourceType="profile" :options="options"/>
      </div>
    </div>
    <div v-if="members.length" class="row">
        <div class="col-sm-12 p-5 row">
          <div class="col-sm-12" v-html="data.membersText" />
          <div v-for="(member, index) in members" :key="index" class="col-lg-2 col-md-3 col-4 mb-0 pr-lg-1 pl-lg-3 pl-md-5 pl-sm-3">
            <div class="text-center p-1 p-md-3 mb-0" style="height:100px;background-color:#fff; display: flex; flex-direction: column; justify-content: center;">
              <div>
                <a :href="member.href"><img class="img-fluid pb-2 user-image" :src="member.img"/></a>
              </div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { Timeline } from "vue-tweet-embed"
export default {
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    members: {
      type: Array,
      default: () => []
    }
  },
  components: {
    "twitter-timeline": Timeline
  },
  data() {
    return {
      options: {
        theme: "light",
        tweetLimit: "3",
        chrome: ["nofooter", "noscrollbar"]
      }
    };
  }
};
</script>
