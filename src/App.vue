<template>
  <router-view />
</template>

<script>

export default {
  created() {
    document.documentElement.lang = this.$i18n.locale
    this.$store.commit('SET_IS_MOBILE', window.innerWidth < 700)
    this.$store.commit('SET_IS_DESKTOP', window.innerWidth > 1399)
    window.addEventListener('resize', () => {
      this.$store.commit('SET_IS_MOBILE', window.innerWidth < 700)
      this.$store.commit('SET_IS_DESKTOP', window.innerWidth > 1399)
    })
    window.addEventListener('click', () => document.body.classList.remove('accessible'))
    window.addEventListener('keydown', ({ key }) => {
      if (key === 'Tab') document.body.classList.add('accessible')
    })
  },
  watch: {
    '$i18n.locale'() {
      document.documentElement.lang = this.$i18n.locale
    }
  }
}
</script>
