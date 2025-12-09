<template>
  <div style="background-color: black;">
    <div
      v-if="$t('newsBanner')"
      class="banner font-code type-center p-2xsmall border-bottom-white border-thin"
      v-html="$t('newsBanner')" />
  </div>
</template>

<style scoped>
  .banner {
    background: linear-gradient(180deg, #5f660055 0%, #00615c55 30%, #0e00a955 60%, #620050 100%);
    box-shadow: inset 0 0 3rem 1rem #000000;
    color: #ffffff;
  }
</style>
