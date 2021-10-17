<template>
  <div class="container">
    <div class="row center type-center" style="margin-top: calc(100vh / 2 - 7rem)">
      <div class="col-sm-12">
        <h3>404 - Not found</h3>
      </div>
      <img v-if="isDarkMode" :src="`${publicPath}img/RF-white.svg`" />
      <img v-else :src="`${publicPath}img/RF.svg`" class="mt-small" />
      <div class="col-sm-12 mt-medium">
        <router-link :to="{ name: 'Home' }">
          Back to home
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  data: () => ({
    publicPath: process.env.BASE_URL,
    isDarkMode: false
  }),
  created() {
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  }
}
</script>
