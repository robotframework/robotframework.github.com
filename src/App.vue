<template>
  <div class="bg-white">
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    document.documentElement.lang = this.$i18n.locale
    this.$store.commit('SET_IS_MOBILE', window.innerWidth < 769)
    window.addEventListener('resize', () => this.$store.commit('SET_IS_MOBILE', window.innerWidth < 769))
  },
  watch: {
    '$i18n.locale'() {
      document.documentElement.lang = this.$i18n.locale
    }
  }
}
</script>
