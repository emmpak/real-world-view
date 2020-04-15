import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: { id: '123', name: 'Callan' },
    categories: [
      'sustainability',
      'nature',
      'animal welfare',
      'housing',
      'education',
      'food',
      'community'
    ]
  },
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    // You can pass one getter to another such as `catLenth: (state, getters) => { return getters.otherFunction }`
    catLength: state => {
      return state.categories.length
    }
  }
})
