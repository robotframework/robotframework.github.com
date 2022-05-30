<template>
  <router-view />
</template>

<script>

export default {
  methods: {
    setDeviceSize(width) {
      this.$nextTick(() => {
        this.$store.commit('SET_IS_MOBILE', width < 700)
        this.$store.commit('SET_IS_TABLET', width > 699 && width < 1024)
        this.$store.commit('SET_IS_DESKTOP', width > 1023)
      })
    }
  },
  created() {
    document.documentElement.lang = this.$i18n.locale
    this.setDeviceSize(window.innerWidth)

    window.addEventListener('resize', () => {
      this.setDeviceSize(window.innerWidth)
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
