<template>
  <div class="container mb-xlarge p-small">
    <div class="row mb-large mt-large">
      <button v-if="cameFromHome" @click="$router.go(-1)" class="color-theme type-underline">
        Back
      </button>
      <router-link v-else :to="{ name: 'Home' }">
        Back
      </router-link>
    </div>
    <h2>
      {{ $t('usersPage.title') }}
    </h2>
    <p v-html="$t('usersPage.body')" />
    <div class="row">
      <div
        v-for="(column, i) in columns"
        :key="i"
        class="p-small"
        :class="`
          col-sm-${12 / columns.length}
          ${i === 0 && columnAmount !== 1 ? 'pl-none pr-medium' : 'pl-small'}
          ${i === columns.length - 1 && columnAmount !== 1 ? 'pr-none pl-medium' : 'pr-small'}`">
          <div
            v-for="(user, j) in column"
            :key="user.name">
            <transition appear name="opacity-slow">
              <div
                class="card p-small mb-large bg-white user-card"
                :style="`transition-delay: ${(j / 10 + i / columns.length / 10) * columns.length + 0.1}s;`">
                <div
                  class="img-container mb-small"
                  :style="`background-image: url(${publicPath}img/users/${user.imgName})`" />
                <h3>
                  <a :href="user.href" target="_blank">
                    {{ user.title }}
                  </a>
                </h3>
                <p v-html="user.text" />
              </div>
            </transition>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Users',
  data: () => ({
    publicPath: process.env.BASE_URL,
    columnAmount: 4,
    cameFromHome: false
  }),
  computed: {
    columns() {
      if (this.columnAmount === 4) {
        return [
          this.$tm('resourcesList.users').filter((_, i) => i % 4 === 0),
          this.$tm('resourcesList.users').filter((_, i) => i % 4 === 1),
          this.$tm('resourcesList.users').filter((_, i) => i % 4 === 2),
          this.$tm('resourcesList.users').filter((_, i) => i % 4 === 3)
        ]
      } else if (this.columnAmount === 3) {
        return [
          this.$tm('resourcesList.users').filter((_, i) => i % 3 === 0),
          this.$tm('resourcesList.users').filter((_, i) => i % 3 === 1),
          this.$tm('resourcesList.users').filter((_, i) => i % 3 === 2)
        ]
      } else if (this.columnAmount === 2) {
        return [
          this.$tm('resourcesList.users').filter((_, i) => i % 2 === 0),
          this.$tm('resourcesList.users').filter((_, i) => i % 2 === 1)
        ]
      } else {
        return [this.$tm('resourcesList.users')]
      }
    }
  },
  created() {
    window.addEventListener('resize', this.calculateColumnAmount)
    this.calculateColumnAmount()
    window.history.replaceState(null, null, null)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateColumnAmount)
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      // for using browser's back functionality when 'back' link is clicked
      // to retain scroll position
      vm.cameFromHome = from.name === 'Home'
    })
  },
  methods: {
    calculateColumnAmount() {
      if (window.innerWidth < 450) this.columnAmount = 1
      else if (window.innerWidth < 900) this.columnAmount = 2
      else if (window.innerWidth < 1300) this.columnAmount = 3
      else this.columnAmount = 4
    }
  }
}
</script>

<style scoped>
  .img-container {
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    height: 5rem;
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
  }
  .user-card {
    background-color: #fff;
  }
  @media (prefers-color-scheme: dark) {
    .user-card {
      background-color: var(--color-grey-dark);
    }
    .img-container {
      background-color: #fff;
      background-origin: content-box;
      padding: 0.5rem;
      border-radius: var(--border-radius-rounded);
    }
  }
</style>
