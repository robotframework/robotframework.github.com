import { createStore } from 'vuex'

export default createStore({
  state: {
    isMobile: null,
    isDesktop: null
  },
  mutations: {
    SET_IS_MOBILE(state, truthiness) {
      state.isMobile = truthiness
    },
    SET_IS_DESKTOP(state, truthiness) {
      state.isDesktop = truthiness
    }
  },
  actions: {
  },
  modules: {
  }
})
