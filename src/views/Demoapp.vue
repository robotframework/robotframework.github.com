<template>
  <div class="login-form-container">
    <form class="login-form" v-if="!invalid && !valid">
      <img v-if="isDarkMode" :src="`${publicPath}img/RF-white.svg`" class="small-robot"/>
      <img v-else :src="`${publicPath}img/RF.svg`" class="small-robot" />
      <label>Username<input type="text" v-model="username" /></label>
      <label>Password<input type="password" v-model="password" /></label>
      <input type="submit" value="Login" v-on:click="checkUsernameAndPassword"/>
    </form>
    <span v-if="invalid">No humans allowed!</span>
    <span v-if="valid">I salute you, Robot overloard!</span>
  </div>
</template>

<script>
export default {
  name: 'Demoapp',
  data: () => ({
    publicPath: process.env.BASE_URL,
    isDarkMode: false,
    username: '',
    password: '',
    invalid: false,
    valid: false
  }),
  created() {
    this.isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  },
  methods: {
    checkUsernameAndPassword(e) {
      this.username === 'robot' && this.password === 'overloard' ? this.valid = true : this.invalid = true
      document.title = 'Robots rule'
      e.preventDefault()
    }
  }
}
</script>

<style scoped>
  .login-form-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
  }

  .small-robot {
    height: 120px;
    width: 120px;
    align-self: center;
    margin-bottom: 10px;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    max-width: 200px;
  }

  .login-form label {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .login-form input {
    margin-bottom: 10px;
    border-radius: 6px;
    padding: 0.5rem
  }

  .login-form input[type=submit] {
    margin-top: 12px;
    cursor: pointer;
    border: 1px solid;
  }
</style>
