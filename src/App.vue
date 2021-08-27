<template>
  <div class="bg-white">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    document.documentElement.lang = this.$i18n.locale
  },
  watch: {
    '$i18n.locale'() {
      document.documentElement.lang = this.$i18n.locale
    }
  }
}
</script>
