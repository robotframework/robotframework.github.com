import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile: null
  },
  mutations: {
    SET_IS_MOBILE(state, truthiness) {
      state.isMobile = truthiness
    }
  },
  actions: {
  },
  modules: {
  }
})
