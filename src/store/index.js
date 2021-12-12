import { createStore } from 'vuex'
import { milestones } from '../content'

export default createStore({
  state: {
    isMobile: null,
    isDesktop: null,
    milestones: milestones()
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
