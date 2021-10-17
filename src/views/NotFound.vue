<template>
  <div class="container">
    <div class="row center type-center" style="margin-top: calc(100vh / 2 - 7rem)">
      <div class="col-sm-12">
        <h3>404 - Not found</h3>
      </div>
      <img :src="`${publicPath}img/RF-white.svg`" />
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
    publicPath: process.env.BASE_URL
  })
}
</script>
