<template>
  <div
    class="newsbanner container type-center pl-small pr-small"
    v-html="$t('newsBanner')" />
</template>

<style>
  .newsbanner {
      margin-top: 0 !important;
      border-top: 0.2rem solid #3F7BCF;
      border-bottom: 0.2rem solid #3F7BCF;
      background-color: #0d0f14;
      color: #3F7BCF !important;
      max-width: None !important;
  }
  .newsbanner * {
    color: #3F7BCF !important;
    text-decoration: none !important;
  }
</style>
