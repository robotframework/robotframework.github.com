<template>
  <section :id="page.title.toLowerCase()">
    <examples v-if="Object.keys(page.data).length === 0 && page.data.constructor === Object"/>
    <feature-box v-if="page.feature_box == true" :data="page.data.text"/>
    <text-block v-if="page.text_block == true" :data="page.data.text"/>
    <tab-box v-if="page.tab_box == true" :data="page.data.tabs"/>
    <user-box v-if="page.user_box == true" :data="page.data.users"/>

</section>
</template>

<script>
import FeatureBox from "@/components/FeatureBox.vue";
import TabBox from "@/components/TabBox.vue";
import TextBlock from "@/components/TextBlock.vue";
import UserBox from "@/components/UserBox.vue";

import Examples from "@/components/pages/Examples";

export default {
  components: {
    FeatureBox,
    TextBlock,
    TabBox,
    UserBox,
    Examples
  },
  props: ["page"]
};
</script>
