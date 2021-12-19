import { createStore } from 'vuex'
import milestones from '../../public/livedata/milestones.js'
import stars from '../../public/livedata/stars.js'

export default createStore({
  state: {
    isMobile: null,
    isDesktop: null,
    milestones: milestones(),
    stars: stars()
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
