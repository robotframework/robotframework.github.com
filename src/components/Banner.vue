<template>
  <div class="row bg-theme center p-medium">
    <!-- <div class="logo">
      <img :src="`${publicPath}img/RF.svg`" />
    </div> -->
    <div>
      <h1 class="title">
        ROBOT<br>
        FRAME<br>
        WORK/
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  data: () => ({
    publicPath: process.env.BASE_URL
  })
}
</script>

<style scoped>

  .title::first-line {
    color: var(--color-white);
  }

</style>
