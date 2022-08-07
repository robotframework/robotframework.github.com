<template>
  <div>
    <navbar-sub-page title="TestAutomation" />
    <div class="container mb-3xlarge">
      <div
        class="col-sm-12 col-lg-9 col-lg-offset-3"
        v-html="$t('testautomation.lead')">
      </div>
      <VideoComponent videoId="0q4-AjqpO9M"/>
      <VideoComponent videoId="SypNjILTRl0"/>
      <VideoComponent videoId="mSR-HPCBeEQ"/>
      <VideoComponent videoId="PFqmZ5GwXgg"/>
      <VideoComponent videoId="g98m3XpE8gw"/>
      <VideoComponent videoId="Ju90-ewW_gM"/>
    </div>
    <page-footer />
  </div>
</template>

<script>
import { NavbarSubPage, PageFooter, VideoComponent } from 'Components'

export default {
  name: 'TestAutomation',
  components: {
    VideoComponent,
    NavbarSubPage,
    PageFooter
  }
}
</script>
