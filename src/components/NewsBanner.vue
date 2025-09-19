<template>
  <div
    class="banner font-code type-italic type-small type-center p-2xsmall border-bottom-white border-thin"
    v-html="$t('newsBanner')" />
</template>

<style>
  .banner {
    background-color: #000000;
    color: #ffffff;

    a {
      color: #3385ff;
    }
  }
</style>
